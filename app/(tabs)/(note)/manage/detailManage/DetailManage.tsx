import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, SafeAreaView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InfoText from '@/components/ui/InfoText';

const DetailBean = () => {
    const { id } = useLocalSearchParams(); // URLパラメータからidを取得
    const [bean, setBean] = useState<any>(null);

    useEffect(() => {
        const loadBean = async () => {
            try {
                const storedBeans = await AsyncStorage.getItem('beans');
                if (storedBeans) {
                    const beans = JSON.parse(storedBeans);
                    const selectedBean = beans.find((b: any) => b.id === id);
                    if (selectedBean) {
                        setBean(selectedBean);
                    } else {
                        Alert.alert('エラー', '指定された豆が見つかりません。');
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

    if (!bean) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>読み込み中...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.detailTextTitle}>{bean.name}</Text>
            </View>
            <ScrollView contentContainerStyle={styles.infoSection}>

            <InfoText title="産地" value={bean.origin} />
            <InfoText title="焙煎日" value={bean.roastDate} />
            <InfoText title="購入日" value={bean.purchaseDate} />
            <InfoText title="焙煎度合い" value={bean.roastLevel} />
            <InfoText title="品種" value={bean.variety} />
            <InfoText title="精製方法" value={bean.processing} />
            <InfoText title="メモ" value={bean.notes} />

        </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: '#007BFF',
        paddingVertical: 8,
        marginBottom: 16,
    },
    detailTextTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    infoSection: {
        backgroundColor: '#fff',
        padding: 16,
        marginHorizontal: 16,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginBottom: 16,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 0,
    },
    value: {
        fontSize: 16,
        marginBottom: 16,
        color: '#555',
    },
});

export default DetailBean;