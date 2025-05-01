import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useLocalSearchParams } from 'expo-router';
import TastingSlider from '@/components/ui/TastingSlider';

const EditorDetailTasting = () => {
    const { id } = useLocalSearchParams(); // URLパラメータからidを取得
    const [name, setName] = useState('');
    const [aroma, setAroma] = useState(3);
    const [acidity, setAcidity] = useState(3);
    const [sweetness, setSweetness] = useState(3);
    const [bitterness, setBitterness] = useState(3);
    const [body, setBody] = useState(3);
    const [favorite, setFavorite] = useState(3);
    const [notes, setNotes] = useState('');
    const router = useRouter();

    useEffect(() => {
        const loadTasting = async () => {
            try {
                const storedTastings = await AsyncStorage.getItem('tastingNotes');
                if (storedTastings) {
                    const tastings = JSON.parse(storedTastings);
                    const selectedTasting = tastings.find((t: any) => t.id === id);
                    if (selectedTasting) {
                        setName(selectedTasting.name);
                        setAroma(selectedTasting.aroma);
                        setAcidity(selectedTasting.acidity);
                        setSweetness(selectedTasting.sweetness);
                        setBitterness(selectedTasting.bitterness);
                        setBody(selectedTasting.body);
                        setFavorite(selectedTasting.favorite);
                        setNotes(selectedTasting.notes);
                    } else {
                        Alert.alert('エラー', '指定されたテイスティングノートが見つかりません。');
                        router.push('/(tabs)/(note)/tasting/Tasting');
                    }
                }
            } catch (error) {
                console.error('データ読み込みエラー:', error);
                Alert.alert('エラー', 'データの読み込み中にエラーが発生しました。');
            }
        };

        if (id) {
            loadTasting();
        }
    }, [id]);

    const handleSave = async () => {
        try {
            const storedTastings = await AsyncStorage.getItem('tastingNotes');
            const tastings = storedTastings ? JSON.parse(storedTastings) : [];

            const updatedTastings = tastings.map((t: any) =>
                t.id === id
                    ? {
                          ...t,
                          name,
                          aroma,
                          acidity,
                          sweetness,
                          bitterness,
                          body,
                          favorite,
                          notes,
                      }
                    : t
            );

            await AsyncStorage.setItem('tastingNotes', JSON.stringify(updatedTastings));
            Alert.alert('保存完了', 'テイスティングノートが更新されました！');
            router.push('/(tabs)/(note)/tasting/Tasting'); // 一覧画面に戻る
        } catch (error) {
            console.error('保存エラー:', error);
            Alert.alert('エラー', 'テイスティングノートの保存中にエラーが発生しました。');
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.label}>名前</Text>
            <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
            />

            <TastingSlider label="アロマ" value={aroma} onSlidingComplete={setAroma} />
            <TastingSlider label="酸味" value={acidity} onSlidingComplete={setAcidity} />
            <TastingSlider label="甘味" value={sweetness} onSlidingComplete={setSweetness} />
            <TastingSlider label="苦味" value={bitterness} onSlidingComplete={setBitterness} />
            <TastingSlider label="ボディ" value={body} onSlidingComplete={setBody} />
            <TastingSlider label="お気に入り度" value={favorite} onSlidingComplete={setFavorite} />

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

export default EditorDetailTasting;