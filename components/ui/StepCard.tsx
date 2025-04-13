import React from "react";
import { View, Text, StyleSheet } from "react-native";

type StepCardProps = {
  label: string;
  time: number; // 時間 (秒)
  waterAmount: number; // 湯量 (ml)
  index: number;
  currentStepIndex: number;
};

const StepCard: React.FC<StepCardProps> = ({
  label,
  time,
  waterAmount,
  index,
  currentStepIndex,
}) => {
  const isCurrentStep = index === currentStepIndex;

  return (
    <View
      style={[
        styles.card,
        isCurrentStep ? styles.currentStepCard : styles.nextStepCard, // 実行中の手順を強調
      ]}
    >
      <View style={styles.row}>
        <Text
          style={[
            styles.cardText,
            isCurrentStep ? styles.currentStepText : styles.nextStepText, // テキストのスタイルを変更
          ]}
        >
          {`${label}`}
        </Text>
        <View style={styles.detailContainer}>
          <Text style={styles.detailText}>{`${time}秒`}</Text>
          <Text style={styles.detailText}>{`${waterAmount}ml`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentStepCard: {
    borderColor: "#007BFF", // 実行中の手順を青枠で強調
    borderWidth: 2,
  },
  nextStepCard: {
    opacity: 1, // 他の手順は通常表示
  },
  row: {
    flexDirection: "row", // 横並びに配置
    justifyContent: "space-between", // 左右にスペースを確保
    alignItems: "center",
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  currentStepText: {
    color: "#007BFF", // 実行中の手順のテキストを青色に
  },
  nextStepText: {
    color: "#000", // 他の手順のテキストは黒色
  },
  detailContainer: {
    alignItems: "flex-end", // 右揃え
  },
  detailText: {
    fontSize: 14,
    color: "#555",
  },
});

export default StepCard;