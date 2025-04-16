import React from 'react';
import { StyleSheet, View, Text, ScrollView, Alert, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import InfoText from '@/components/ui/InfoText';
import RadarChart from '@/components/ui/RadarChart'; // RadarChartコンポーネントをインポート
import { useLoadData } from '@/hooks/useLoadData';

const DetailTasting = () => {
    const { id } = useLocalSearchParams(); // URLパラメータからidを取得

    // useLoadDataを使用してデータをロード
    const { data: tastings } = useLoadData({
        storageKey: 'tastingNotes',
        formatData: (item: any, index: number) => ({
            id: index.toString(),
            name: item.name,
            aroma: item.aroma,
            acidity: item.acidity,
            sweetness: item.sweetness,
            bitterness: item.bitterness,
            body: item.body,
            favorite: item.favorite,
            notes: item.notes,
        }),
    });

    // 指定されたIDのテイスティングノートを取得
    const tasting = tastings.find((t: any) => t.id === id);

    if (!tasting) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>読み込み中...</Text>
            </View>
        );
    }

    const chartData = {
        labels: ['アロマ', '酸味', '甘味', '苦味', 'ボディ'],
        datasets: [
            {
                data: [
                    tasting.aroma || 0,
                    tasting.acidity || 0,
                    tasting.sweetness || 0,
                    tasting.bitterness || 0,
                    tasting.body || 0,
                ],
                color: 'rgba(77, 163, 255, 0.7)', // チャートの色
            },
        ],
    };

    return (
        <SafeAreaView>
            <View style={styles.header}>
                <Text style={styles.detailTextTitle}>{tasting.name}</Text>
            </View>
            <ScrollView>
                <View style={styles.infoSection}>
                    <InfoText title="アロマ" value={tasting.aroma} />
                    <InfoText title="酸味" value={tasting.acidity} />
                    <InfoText title="甘味" value={tasting.sweetness} />
                    <InfoText title="苦味" value={tasting.bitterness} />
                    <InfoText title="ボディ" value={tasting.body} />
                    <InfoText title="お気に入り" value={tasting.favorite} />
                    <InfoText title="メモ" value={tasting.notes} />
                </View>
                <View style={styles.infoSection}>
                    <Text style={styles.chartTitle}>レーダーチャート</Text>
                    <RadarChart data={chartData} />
                </View>
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
    chartContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    chartTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default DetailTasting;