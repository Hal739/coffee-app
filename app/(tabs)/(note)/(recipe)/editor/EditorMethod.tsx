import React, { useState } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StepModal from '@/components/ui/StepModal';

type Step = {
    step: string;
    time: string;
    waterAmount: string;
};

const EditorMethod = () => {
    const router = useRouter();
    const { recipeName, grindSize, dripper, coffeeAmount, waterTotal, waterTemp } = useLocalSearchParams();
    const [modalVisible, setModalVisible] = useState(false);
    const [step, setStep] = useState('');
    const [customStep, setCustomStep] = useState('');
    const [time, setTime] = useState('');
    const [waterAmount, setWaterAmount] = useState('');
    const [steps, setSteps] = useState<Step[]>([]);

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
        const newRecipe = {
            recipeName,
            grindSize,
            dripper,
            coffeeAmount,
            waterTotal,
            waterTemp,
            steps,
        };

        try {
            const storedRecipes = await AsyncStorage.getItem('recipes');
            const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];
            const updatedRecipes = [...recipes, newRecipe];
            await AsyncStorage.setItem('recipes', JSON.stringify(updatedRecipes));
            Alert.alert('保存完了', 'レシピが保存されました！', [
                {
                    text: 'OK',
                    onPress: () => router.push('../../'),
                },
            ]);
        } catch (error) {
            Alert.alert('エラー', 'レシピの保存中にエラーが発生しました。');
            console.error('保存エラー:', error);
        }
    };

    const calculateTotalTime = (index: number) => {
        return steps
            .slice(0, index + 1)
            .reduce((total, step) => total + parseInt(step.time || '0', 10), 0);
    };

    const calculateTotalWaterAmount = (index: number) => {
        return steps
            .slice(0, index + 1)
            .reduce((total, step) => total + parseInt(step.waterAmount || '0', 10), 0);
    };

    return (
        <View style={styles.container}>
            <Button title="手順を追加" onPress={handleAddStep} />

            <ScrollView style={styles.stepList}>
                {steps.map((item, index) => (
                    <View key={index} style={styles.stepItem}>
                        <View style={styles.stepDetails}>
                            <Text style={styles.stepText}>{`${index + 1}. ${item.step}`}</Text>
                            <Text style={styles.detailText}>時間: {item.time}秒</Text>
                            <Text style={styles.detailText}>湯量: {item.waterAmount}ml</Text>
                        </View>
                        <View style={styles.totals}>
                            <Text style={styles.totalTimeText}>
                                {calculateTotalTime(index)}秒
                            </Text>
                            <Text style={styles.totalWaterText}>
                                {calculateTotalWaterAmount(index)}ml
                            </Text>
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
    stepList: {
        marginTop: 16,
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
    totals: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginRight: 10,
        marginLeft: 8,
    },
    totalTimeText: {
        fontSize: 16,
        textAlign: 'right',
        fontWeight: 'bold',
        color: '#007BFF',
    },
    totalWaterText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
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

export default EditorMethod;