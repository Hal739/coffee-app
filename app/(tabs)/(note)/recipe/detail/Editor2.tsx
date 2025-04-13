import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StepModal from '@/components/ui/StepModal'; // 手順追加用のモーダルコンポーネント

type Step = {
    step: string;
    time: string;
    waterAmount: string;
};

const Editor2 = () => {
    const { id } = useLocalSearchParams(); // URLパラメータからidを取得
    const router = useRouter();
    const [recipe, setRecipe] = useState<any>(null); // レシピデータ
    const [steps, setSteps] = useState<Step[]>([]); // 手順データ
    const [modalVisible, setModalVisible] = useState(false);
    const [step, setStep] = useState('');
    const [customStep, setCustomStep] = useState('');
    const [time, setTime] = useState('');
    const [waterAmount, setWaterAmount] = useState('');

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const storedRecipes = await AsyncStorage.getItem('recipes');
                if (storedRecipes) {
                    const parsedRecipes = JSON.parse(storedRecipes);
                    const selectedRecipe = parsedRecipes[parseInt(id as string, 10)];
                    setRecipe(selectedRecipe);
                    setSteps(selectedRecipe.steps || []); // 手順データを設定
                }
            } catch (error) {
                console.error('読み込みエラー:', error);
            }
        };

        if (id) {
            loadRecipe();
        }
    }, [id]);

    const handleAddStep = () => {
        setModalVisible(true);
    };

    const handleSaveStep = () => {
        const finalStep = step === 'その他' ? customStep : step;
        if (finalStep.trim() && time.trim() && waterAmount.trim()) {
            setSteps([...steps, { step: finalStep, time, waterAmount }]);
        }
        setModalVisible(false);
        setStep('');
        setCustomStep('');
        setTime('');
        setWaterAmount('');
    };

    const handleDeleteStep = (index: number) => {
        const updatedSteps = steps.filter((_, i) => i !== index);
        setSteps(updatedSteps);
    };

    const handleSaveAll = async () => {
        try {
            const storedRecipes = await AsyncStorage.getItem('recipes');
            if (storedRecipes) {
                const parsedRecipes = JSON.parse(storedRecipes);
                parsedRecipes[parseInt(id as string, 10)] = {
                    ...recipe,
                    steps,
                };
                await AsyncStorage.setItem('recipes', JSON.stringify(parsedRecipes));
                Alert.alert('保存完了', 'レシピが更新されました！');
                router.push("../Recipe"); // 前の画面に戻る
            }
        } catch (error) {
            Alert.alert('エラー', 'レシピの保存中にエラーが発生しました。');
            console.error('保存エラー:', error);
        }
    };

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddStep}>
                <Text style={styles.addButtonText}>手順を追加</Text>
            </TouchableOpacity>

            <ScrollView style={styles.stepList}>
                {steps.map((item, index) => (
                    <View key={index} style={styles.stepItem}>
                        <View style={styles.stepDetails}>
                            <Text style={styles.stepText}>{`${index + 1}. ${item.step}`}</Text>
                            <Text style={styles.detailText}>時間: {item.time}秒</Text>
                            <Text style={styles.detailText}>湯量: {item.waterAmount}ml</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDeleteStep(index)}
                        >
                            <Text style={styles.deleteButtonText}>削除</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity style={styles.saveButton} onPress={handleSaveAll}>
                <Text style={styles.saveButtonText}>保存</Text>
            </TouchableOpacity>

            <StepModal
                visible={modalVisible}
                step={step}
                customStep={customStep}
                time={time}
                waterAmount={waterAmount}
                onChangeStep={setStep}
                onChangeCustomStep={setCustomStep}
                onChangeTime={setTime}
                onChangeWaterAmount={setWaterAmount}
                onSave={handleSaveStep}
                onCancel={() => setModalVisible(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    addButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 16,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    stepList: {
        flex: 1,
    },
    stepItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ddd',
    },
    stepDetails: {
        flex: 1,
    },
    stepText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailText: {
        fontSize: 14,
        color: '#555',
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        padding: 8,
        borderRadius: 5,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    saveButton: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Editor2;