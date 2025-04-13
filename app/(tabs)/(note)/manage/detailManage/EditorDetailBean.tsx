import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';
import CalendarModal from '@/components/ui/CalendarModal';
import RNPickerSelect from 'react-native-picker-select';

const EditorDetailBean = () => {
    const { id } = useLocalSearchParams(); // URLパラメータからidを取得
    const [beanName, setBeanName] = useState('');
    const [origin, setOrigin] = useState('');
    const [roastDate, setRoastDate] = useState('');
    const [purchaseDate, setPurchaseDate] = useState('');
    const [roastLevel, setRoastLevel] = useState('');
    const [variety, setVariety] = useState('');
    const [processing, setProcessing] = useState('');
    const [notes, setNotes] = useState('');
    const [showRoastCalendar, setShowRoastCalendar] = useState(false);
    const [showPurchaseCalendar, setShowPurchaseCalendar] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const loadBean = async () => {
            try {
                const storedBeans = await AsyncStorage.getItem('beans');
                if (storedBeans) {
                    const beans = JSON.parse(storedBeans);
                    const selectedBean = beans.find((b: any) => b.id === id);
                    if (selectedBean) {
                        setBeanName(selectedBean.name);
                        setOrigin(selectedBean.origin);
                        setRoastDate(selectedBean.roastDate);
                        setPurchaseDate(selectedBean.purchaseDate);
                        setRoastLevel(selectedBean.roastLevel);
                        setVariety(selectedBean.variety);
                        setProcessing(selectedBean.processing);
                        setNotes(selectedBean.notes);
                    } else {
                        Alert.alert('エラー', '指定された豆が見つかりません。');
                        router.push('/(tabs)/(note)/manage/Manage');
                    }
                }
            } catch (error) {
                console.error('データ読み込みエラー:', error);
                Alert.alert('エラー', 'データの読み込み中にエラーが発生しました。');
            }
        };

        if (id) {
            loadBean();
        }
    }, [id]);

    const handleSave = async () => {
        try {
            const storedBeans = await AsyncStorage.getItem('beans');
            const beans = storedBeans ? JSON.parse(storedBeans) : [];

            const updatedBeans = beans.map((bean: any) =>
                bean.id === id
                    ? {
                          ...bean,
                          name: beanName,
                          origin,
                          roastDate,
                          purchaseDate,
                          roastLevel,
                          variety,
                          processing,
                          notes,
                      }
                    : bean
            );

            await AsyncStorage.setItem('beans', JSON.stringify(updatedBeans));
            Alert.alert('保存完了', '記録が更新されました！');
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
                    { label: '生豆', value: '生豆' },
                    { label: 'ライトロースト', value: 'ライトロースト' },
                    { label: 'シナモンロースト', value: 'シナモンロースト' },
                    { label: 'ミディアムロースト', value: 'ミディアムロースト' },
                    { label: 'ハイロースト', value: 'ハイロースト' },
                    { label: 'シティロースト', value: 'シティロースト' },
                    { label: 'フルシティロースト', value: 'フルシティロースト' },
                    { label: 'フレンチロースト', value: 'フレンチロースト' },
                    { label: 'イタリアンロースト', value: 'イタリアンロースト' },
                ]}
                placeholder={{ label: '選択してください', value: '' }}
                style={pickerSelectStyles}
                value={roastLevel}
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

export default EditorDetailBean;