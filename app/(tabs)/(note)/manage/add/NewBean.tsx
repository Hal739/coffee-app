import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import CalendarModal from '@/components/ui/CalendarModal';
import RNPickerSelect from 'react-native-picker-select'; // Pickerをインポート

const AddBean = () => {
    const [beanName, setBeanName] = useState('');
    const [origin, setOrigin] = useState('');
    const [roastDate, setRoastDate] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [roastLevel, setRoastLevel] = useState(''); // 焙煎度合い
    const [variety, setVariety] = useState(''); // 品種
    const [processing, setProcessing] = useState(''); // 生成方法
    const [notes, setNotes] = useState(''); // 任意のメモ
    const [showRoastCalendar, setShowRoastCalendar] = useState(false);
    const [showPurchaseCalendar, setShowPurchaseCalendar] = useState(false);
    const router = useRouter();

    const handleSave = async () => {

        try {
            const storedBeans = await AsyncStorage.getItem('beans');
            const beans = storedBeans ? JSON.parse(storedBeans) : [];

            // 新しいIDを現在のデータの長さから計算
            const newId = beans.length;

            const newBean = {
                id: newId.toString(), // IDを0から順番に付ける
                name: beanName,
                origin,
                roastDate,
                purchaseDate,
                roastLevel,
                variety,
                processing,
                notes,
            };

            beans.push(newBean);
            await AsyncStorage.setItem('beans', JSON.stringify(beans));
            Alert.alert('保存完了', '記録が保存されました！');
            router.push('/(tabs)/(note)/manage/Manage'); // 管理画面に戻る
        } catch (error) {
            console.error('保存エラー:', error);
            Alert.alert('エラー', '豆の保存中にエラーが発生しました。');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>豆/商品の名前</Text>
            <TextInput
                style={styles.input}
                value={beanName}
                onChangeText={setBeanName}
            />

            <Text style={styles.label}>産地</Text>
            <TextInput
                style={styles.input}
                value={origin}
                onChangeText={setOrigin}
            />

            
            <Text style={styles.label}>品種</Text>
            <TextInput
                style={styles.input}
                value={variety}
                onChangeText={setVariety}
            />

           

            <Text style={styles.label}>購入日</Text>
            <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowPurchaseCalendar(true)}
            >
                <Text style={styles.dateText}>
                    {purchaseDate || '購入日を選択'}
                </Text>
            </TouchableOpacity>

            <Text style={styles.label}>焙煎日</Text>
            <TouchableOpacity
                style={styles.dateInput}
                onPress={() => setShowRoastCalendar(true)}
            >
                <Text style={styles.dateText}>
                    {roastDate || '焙煎日を選択'}
                </Text>
            </TouchableOpacity>

            <Text style={styles.label}>焙煎度合い</Text>
            <RNPickerSelect
                onValueChange={(value) => setRoastLevel(value)}
                items={[
                    {label: "生豆", value: "生豆"},
                    {label: "ライトロースト", value: "ライトロースト"},
                    {label: "シナモンロースト", value: "シナモンロースト"},
                    {label: "ミディアムロースト", value: "ミディアムロースト"},
                    {label: "ハイロースト", value: "ハイロースト"},
                    {label: "シティロースト", value: "シティロースト"},
                    {label: "フルシティロースト", value: "フルシティロースト"},
                    {label: "フレンチロースト", value: "フレンチロースト"},
                    {label: "イタリアンロースト", value: "イタリアンロースト"},
                    
                ]}
                placeholder={{ label: '選択してください', value: '' }}
                style={{
                    inputIOS: pickerSelectStyles.inputIOS,
                    inputAndroid: pickerSelectStyles.inputAndroid,
                  }}
            />

            <Text style={styles.label}>精製方法</Text>
            <TextInput
                style={styles.input}
                value={processing}
                onChangeText={setProcessing}
            />

            <Text style={styles.label}>メモ</Text>
            <TextInput
                style={[styles.input, styles.textArea]}
                value={notes}
                onChangeText={setNotes}
                placeholder="任意のメモ"
                multiline
            />

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>保存</Text>
            </TouchableOpacity>

            {/* 焙煎日カレンダー */}
            <CalendarModal
                visible={showRoastCalendar}
                onClose={() => setShowRoastCalendar(false)}
                onSelectDate={(date: string) => setRoastDate(date)}
                markedDate={roastDate}
            />

            {/* 購入日カレンダー */}
            <CalendarModal
                visible={showPurchaseCalendar}
                onClose={() => setShowPurchaseCalendar(false)}
                onSelectDate={(date: string) => setPurchaseDate(date)}
                markedDate={purchaseDate}
            />
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
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    dateInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 16,
        justifyContent: 'center',
    },
    dateText: {
        fontSize: 16,
        color: '#333',
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: '#333',
        marginBottom: 16,
    },
    inputAndroid: {
        fontSize: 16,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: '#333',
        marginBottom: 16,
    },
});

export default AddBean;