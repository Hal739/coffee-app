import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import InfoText from '@/components/ui/InfoText';
import { useLoadData } from '@/hooks/useLoadData';

const RecipeDetail = () => {
    const { id } = useLocalSearchParams(); // URLパラメータからidを取得

    // useLoadDataを使用してデータをロード
    const { data: recipes } = useLoadData({
        storageKey: 'recipes',
        formatData: (recipe: any, index: number) => ({
            id: index.toString(),
            recipeName: recipe.recipeName,
            grindSize: recipe.grindSize,
            dripper: recipe.dripper,
            coffeeAmount: recipe.coffeeAmount,
            waterTotal: recipe.waterTotal,
            waterTemp: recipe.waterTemp,
            steps: recipe.steps,
        }),
    });

    // 指定されたIDのレシピを取得
    const recipe = recipes.find((r: any) => r.id === id);

    if (!recipe) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>読み込み中...</Text>
            </View>
        );
    }

    const calculateTotalTime = (index: number) => {
        return recipe.steps
            .slice(0, index + 1)
            .reduce((total: number, step: any) => total + parseInt(step.time || '0', 10), 0);
    };

    const calculateTotalWaterAmount = (index: number) => {
        return recipe.steps
            .slice(0, index + 1)
            .reduce((total: number, step: any) => total + parseInt(step.waterAmount || '0', 10), 0);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.detailTextTitle}>{recipe.recipeName}</Text>
            </View>
            <View style={styles.infoSection}>
                <InfoText title="挽き目" value={recipe.grindSize} />
                <InfoText title="ドリッパー" value={recipe.dripper} />
                <InfoText title="コーヒー豆の量" value={`${recipe.coffeeAmount}g`} />
                <InfoText title="抽出量" value={`${recipe.waterTotal}ml`} />
                <InfoText title="抽出温度" value={`${recipe.waterTemp}℃`} />
            </View>
            <View style={styles.stepsSection}>
                <Text style={styles.stepsTitle}>手順</Text>
                {recipe.steps && recipe.steps.map((step: any, index: number) => (
                    <View key={index} style={styles.stepCard}>
                        <View style={styles.stepDetails}>
                            <Text style={styles.stepTitle}>
                                {index + 1}. {step.step}
                            </Text>
                            <Text style={styles.stepDetail}>
                                時間: {step.time}秒
                            </Text>
                            <Text style={styles.stepDetail}>
                                湯量: {step.waterAmount}ml
                            </Text>
                        </View>
                        <View style={styles.totals}>
                            <Text style={styles.totalTimeText}>
                                合計時間: {calculateTotalTime(index)}秒
                            </Text>
                            <Text style={styles.totalWaterText}>
                                合計湯量: {calculateTotalWaterAmount(index)}ml
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9f9f9',
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
    stepsSection: {
        paddingHorizontal: 16,
    },
    stepsTitle: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    stepCard: {
        backgroundColor: '#fff',
        padding: 16,
        marginBottom: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    stepDetails: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#007BFF',
    },
    stepDetail: {
        fontSize: 16,
        color: '#555',
    },
    totals: {
        flexDirection: 'column',
        alignItems: 'flex-end',
    },
    totalTimeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
        marginBottom: 4,
    },
    totalWaterText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#007BFF',
    },
    loadingText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default RecipeDetail;