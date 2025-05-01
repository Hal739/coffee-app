import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import InfoText from '@/components/ui/InfoText';
import { useLoadData } from '@/hooks/useLoadData';

const DetailBean = () => {
    const { id } = useLocalSearchParams(); // URLパラメータからidを取得

    // useLoadDataを使用してデータをロード
    const { data: beans } = useLoadData({
        storageKey: 'beans',
        formatData: (bean: any, index: number) => ({
            id: index.toString(),
            name: bean.name,
            origin: bean.origin,
            roastDate: bean.roastDate,
            purchaseDate: bean.purchaseDate,
            roastLevel: bean.roastLevel,
            variety: bean.variety,
            processing: bean.processing,
            notes: bean.notes,
        }),
    });

    // 指定されたIDの豆を取得
    const bean = beans.find((b: any) => b.id === id);

    if (!bean) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>読み込み中...</Text>
            </View>
        );
    }

    return (
        <ScrollView>
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
        </ScrollView>
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
});

export default DetailBean;