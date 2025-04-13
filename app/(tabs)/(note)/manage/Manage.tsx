import { StyleSheet, View, Text, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Manage = () => {
    const [beans, setBeans] = useState<{ id: string; name: string; origin: string }[]>([]);
    const router = useRouter();

    useEffect(() => {
        const loadBeans = async () => {
            try {
                const storedBeans = await AsyncStorage.getItem('beans');
                console.log('保存されているJSON:', storedBeans); // JSONデータをコンソールに出力

                if (storedBeans) {
                    const parsedBeans = JSON.parse(storedBeans);
                    const formattedBeans = parsedBeans.map((bean: any, index: number) => ({
                        id: index.toString(),
                        name: bean.name,
                        origin: bean.origin,
                    }));
                    setBeans(formattedBeans);
                }
            } catch (error) {
                Alert.alert('エラー', '豆の読み込み中にエラーが発生しました。');
                console.error('読み込みエラー:', error);
            }
        };

        loadBeans();
    }, []);

    const handleDelete = async (id: string) => {
        Alert.alert(
            '確認',
            'この豆を削除しますか？',
            [
                {
                    text: 'キャンセル',
                    style: 'cancel',
                },
                {
                    text: '削除',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            // ローカル状態を更新
                            const updatedBeans = beans.filter((bean) => bean.id !== id);

                            // idを再割り当て
                            const reindexedBeans = updatedBeans.map((bean, index) => ({
                                ...bean,
                                id: index.toString(),
                            }));
                            setBeans(reindexedBeans);

                            // AsyncStorageを更新
                            const storedBeans = await AsyncStorage.getItem('beans');
                            if (storedBeans) {
                                const parsedBeans = JSON.parse(storedBeans);
                                const filteredBeans = parsedBeans.filter(
                                    (_: any, index: number) => index.toString() !== id
                                );

                                // idを再割り当てして保存
                                const reindexedStoredBeans = filteredBeans.map((bean: any, index: number) => ({
                                    ...bean,
                                    id: index.toString(),
                                }));
                                await AsyncStorage.setItem('beans', JSON.stringify(reindexedStoredBeans));
                                console.log('更新後のJSON:', JSON.stringify(reindexedStoredBeans)); // 更新後のJSONを確認
                            }
                        } catch (error) {
                            Alert.alert('エラー', '豆の削除中にエラーが発生しました。');
                            console.error('削除エラー:', error);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={beans}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <View style={styles.textArea}>
                            <Text style={styles.cardText}>{item.name}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.detailButton}
                            onPress={() => router.push({
                                pathname: "/manage/detailManage/DetailManage",
                                params: {
                                  id: item.id,
                                },
                              })
                            }
                        >
                            <Text style={styles.detailButtonText}>詳細</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleDelete(item.id)}
                        >
                            <Text style={styles.deleteButtonText}>削除</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
            <Link href="/(tabs)/(note)/manage/add/NewBean" style={styles.button}>
                <Text style={styles.buttonText}>豆の追加</Text>
            </Link>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    textArea:{
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-start",
        maxWidth: "65%", // 最大幅を設定
        flexWrap: "wrap", // テキストが折り返すようにする
      },
    card: {
        backgroundColor: '#fff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        
    },
    cardText: {
        fontSize: 18,
        // 必要に応じて maxWidth や flexWrap を外す・変更
      },
    detailButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginLeft: 'auto', // ボタンを右端に寄せる
    },
    detailButtonText: {
        color: '#fff',
        fontSize: 14,
    },
    deleteButton: {
        backgroundColor: '#FF3B30',
        padding: 10,
        borderRadius: 5,
        marginLeft: 8, // 「詳細」ボタンとの間にスペースを追加
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 14,
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

export default Manage;