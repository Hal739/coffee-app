import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import Slider from '@react-native-community/slider'; // スライダーをインポート
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Editor = () => {
    const { id } = useLocalSearchParams(); // URLパラメータからidを取得
    const router = useRouter();
    const [recipe, setRecipe] = useState<any>(null); // レシピデータ
    const [recipeName, setRecipeName] = useState('');
    const [grindSize, setGrindSize] = useState('');
    const [dripper, setDripper] = useState('');
    const [coffeeAmount, setCoffeeAmount] = useState('');
    const [waterAmount, setWaterAmount] = useState('');
    const [waterTemp, setWaterTemp] = useState<number>(90); // 抽出温度
    const [tempDisplay, setTempDisplay] = useState<number>(90); // 表示用の温度

    useEffect(() => {
        const loadRecipe = async () => {
            try {
                const storedRecipes = await AsyncStorage.getItem('recipes');
                if (storedRecipes) {
                    const parsedRecipes = JSON.parse(storedRecipes);
                    const selectedRecipe = parsedRecipes[parseInt(id as string, 10)];
                    setRecipe(selectedRecipe);

                    // 初期値を設定
                    setRecipeName(selectedRecipe.recipeName || '');
                    setGrindSize(selectedRecipe.grindSize || '');
                    setDripper(selectedRecipe.dripper || '');
                    setCoffeeAmount(String(selectedRecipe.coffeeAmount || ''));
                    setWaterAmount(String(selectedRecipe.waterTotal || ''));
                    setWaterTemp(parseFloat(selectedRecipe.waterTemp) || 90);
                    setTempDisplay(parseFloat(selectedRecipe.waterTemp) || 90);
                }
            } catch (error) {
                console.error('読み込みエラー:', error);
            }
        };

        if (id) {
            loadRecipe();
        }
    }, [id]);

    const handleSlidingComplete = (value: number) => {
        setWaterTemp(value); // スライダー操作完了時に値を確定
    };

    const handleSave = async () => {
        try {
            const storedRecipes = await AsyncStorage.getItem('recipes');
            if (storedRecipes) {
                const parsedRecipes = JSON.parse(storedRecipes);
                parsedRecipes[parseInt(id as string, 10)] = {
                    ...recipe,
                    recipeName,
                    grindSize,
                    dripper,
                    coffeeAmount: parseFloat(coffeeAmount), // 数値型に変換して保存
                    waterTotal: parseFloat(waterAmount), // 数値型に変換して保存
                    waterTemp, // すでに数値型
                };
                await AsyncStorage.setItem('recipes', JSON.stringify(parsedRecipes));
                router.push({
                    pathname: "./Editor2",
                    params: { id }, // 編集後のレシピIDを渡す
                });
            }
        } catch (error) {
            console.error('保存エラー:', error);
            Alert.alert('エラー', 'レシピの保存中にエラーが発生しました。');
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
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>レシピ名</Text>
            <TextInput
                style={styles.input}
                value={recipeName}
                onChangeText={setRecipeName}
            />

            <Text style={styles.label}>挽き目</Text>
            <TextInput
                style={styles.input}
                value={grindSize}
                onChangeText={setGrindSize}
            />

            <Text style={styles.label}>ドリッパー</Text>
            <TextInput
                style={styles.input}
                value={dripper}
                onChangeText={setDripper}
            />

            <Text style={styles.label}>コーヒー豆量</Text>
            <TextInput
                style={styles.input}
                value={coffeeAmount}
                onChangeText={setCoffeeAmount}
                keyboardType="numeric"
            />

            <Text style={styles.label}>抽出量</Text>
            <TextInput
                style={styles.input}
                value={waterAmount}
                onChangeText={setWaterAmount}
                keyboardType="numeric"
            />

            <Text style={styles.label}>抽出温度: {tempDisplay}℃</Text>
            <Slider
                style={styles.slider}
                minimumValue={80}
                maximumValue={100}
                step={1}
                value={waterTemp}
                onValueChange={(value: number) => setTempDisplay(value)} // ドラッグ中の値を表示
                onSlidingComplete={handleSlidingComplete} // ドラッグ完了時に値を確定
                minimumTrackTintColor="#007BFF"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#007BFF"
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>保存</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    label: {
        fontSize: 17,
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
        fontSize: 16,
    },
    slider: {
        width: '100%',
        height: 40,
        marginBottom: 16,
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 16,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default Editor;