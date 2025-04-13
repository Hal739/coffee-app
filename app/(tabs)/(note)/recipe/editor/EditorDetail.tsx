import { Link } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';

const RecipeEditor = () => {
    const [recipeName, setRecipeName] = useState('');
    const [grindSize, setGrindSize] = useState('');
    const [dripper, setDripper] = useState('');
    const [coffeeAmount, setCoffeeAmount] = useState('');
    const [waterAmount, setWaterAmount] = useState('');
    const [waterTemp, setWaterTemp] = useState<number>(90); // 初期値を数値型で設定
    const [tempDisplay, setTempDisplay] = useState<number>(90); // 表示用の温度

    const handleSlidingComplete = (value: number) => {
        setWaterTemp(value); // スライダー操作完了時に値を確定
    };

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
                minimumValue={80} // 最小値
                maximumValue={100} // 最大値
                step={1} // 1℃単位で調整
                value={waterTemp}
                onValueChange={(value: number) => setTempDisplay(value)} // ドラッグ中の値を表示
                onSlidingComplete={handleSlidingComplete} // ドラッグ完了時に値を確定
                minimumTrackTintColor="#007BFF"
                maximumTrackTintColor="#ccc"
                thumbTintColor="#007BFF"
            />

            <Link
                href={{
                    pathname: './EditorMethod',
                    params: {
                        recipeName,
                        grindSize,
                        dripper,
                        coffeeAmount,
                        waterAmount,
                        waterTemp,
                    },
                }}
                style={styles.button}
            >
                <Text style={styles.buttonText}>手順の設定</Text>
            </Link>
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
        margin: 16,
    },
    buttonText: {
        color: '#ffffff',
        textAlign: 'center',
        fontSize: 16,
    },
});

export default RecipeEditor;