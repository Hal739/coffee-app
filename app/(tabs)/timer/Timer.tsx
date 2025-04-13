import React, { useState, useEffect } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {View,Text,TouchableOpacity,StyleSheet,Alert,FlatList,} from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNPickerSelect from "react-native-picker-select";
import StepCard from "@/components/ui/StepCard";

type RecipeStep = {
  label: string;
  duration: number;
  waterAmount?: number; // 湯量をオプションとして追加
};

export default function Timer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [steps, setSteps] = useState<RecipeStep[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [key, setKey] = useState(0);
  const [recipes, setRecipes] = useState<{ label: string; value: string }[]>(
    []
  );
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);

  useEffect(() => {
    // 初期表示時にレシピを読み込む
    loadRecipes();
  }, []);

  // レシピデータを取得する関数
  const loadRecipes = async () => {
    try {
      const storedRecipes = await AsyncStorage.getItem("recipes");
      if (storedRecipes) {
        const parsedRecipes = JSON.parse(storedRecipes);
        const formattedRecipes = parsedRecipes.map(
          (recipe: any, index: number) => ({
            label: recipe.recipeName,
            value: index.toString(),
          })
        );
        setRecipes(formattedRecipes);
      }
    } catch (error) {
      Alert.alert("エラー", "レシピの読み込み中にエラーが発生しました。");
      console.error("読み込みエラー:", error);
    }
  };

  // 手順データを取得する関数
  const loadSteps = async (recipeIndex: number) => {
    try {
      const storedRecipes = await AsyncStorage.getItem("recipes");
      if (storedRecipes) {
        const parsedRecipes = JSON.parse(storedRecipes);
        const selectedRecipe = parsedRecipes[recipeIndex];
        const recipeSteps: RecipeStep[] = selectedRecipe.steps.map(
          (step: any) => ({
            label: step.step,
            duration: parseInt(step.time, 10),
            waterAmount: parseInt(step.waterAmount, 10), // 湯量を読み込む
          })
        );
        setSteps(recipeSteps);
        setCurrentStepIndex(0);
        setKey((prevKey) => prevKey + 1);
      }
    } catch (error) {
      Alert.alert("エラー", "手順の読み込み中にエラーが発生しました。");
      console.error("読み込みエラー:", error);
    }
  };

  const handleRecipeSelect = (value: string | null) => {
    setSelectedRecipe(value);
    if (value !== null) {
      loadSteps(parseInt(value, 10));
    } else {
      setSteps([]);
      setCurrentStepIndex(0);
      setKey((prevKey) => prevKey + 1);
    }
  };

  const handleStartPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      setKey((prevKey) => prevKey + 1);
    } else {
      Alert.alert("完了", "すべての手順が終了しました！");
      setIsPlaying(false);
      resetTimer(); // タイマーをリセット
    }
  };

  const resetTimer = () => {
    setCurrentStepIndex(0); // 最初のステップに戻す
    setKey((prevKey) => prevKey + 1); // タイマーをリセット
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.pickerContainer}>
        <RNPickerSelect
          onValueChange={(value) => {
            handleRecipeSelect(value);
          }}
          items={[...recipes]}
          placeholder={{ label: "レシピを選択してください", value: null }}
          style={{
            inputAndroid: styles.picker,
            inputIOS: styles.picker,
            placeholder: styles.placeholder,
          }}
          value={selectedRecipe}
        />
      </View>

        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying && steps.length > 0}
          duration={steps.length > 0 ? steps[currentStepIndex].duration : 0}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[1, 0.5, 0.25, 0]}
          onComplete={() => {
            if (steps.length > 0 && currentStepIndex < steps.length - 1) {
              handleNextStep();
              return { shouldRepeat: false };
            }
            Alert.alert("完了", "すべての手順が終了しました！");
            setIsPlaying(false);
            resetTimer(); // タイマーをリセット
            return { shouldRepeat: false };
          }}
        >
          {({ remainingTime }) => (
            <Text style={styles.timerText}>
              {steps.length > 0 ? remainingTime : 0}
            </Text>
          )}
        </CountdownCircleTimer>

      <FlatList
        data={steps} // すべての手順を表示
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <StepCard
            label={item.label}
            time={item.duration} // 時間を渡す
            waterAmount={item.waterAmount ?? 0} // 湯量を渡す (undefinedの場合は0を使用)
            index={index}
            currentStepIndex={currentStepIndex} // 実行中の手順を強調
          />
        )}
        style={styles.stepList}
      />
      <TouchableOpacity
        style={styles.startPauseButton}
        onPress={handleStartPause}
        disabled={!steps.length}
      >
          {isPlaying ? 
             <Ionicons name="pause" size={24} color="white" /> 
            :<Ionicons name="play" size={24} color="white" />
          }
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  pickerContainer: {
    width: "90%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  picker: {
    padding: 0,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  placeholder: {
    color: "#aaa",
  },
  stepLabel: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  timerText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#333",
  },
  stepList: {
    marginTop: 20,
    width: "90%",
    marginBottom: 20,
  },
  stepItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  stepText: {
    fontSize: 16,
    color: "#333",
  },
  startPauseButton: {
    backgroundColor: "#007BFF",
    width: 56,
    height: 56,
    borderRadius: 42,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  card: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10, // 丸みを帯びた四角形
    backgroundColor: "#fff", // 背景を白に
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android用の影
  },
  currentStepCard: {
    opacity: 1, // 実行中のステップは不透明
  },
  nextStepCard: {
    opacity: 0.5, // 次のステップは半透明
  },
  cardText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000", // 黒字
  },
  currentStepText: {
    color: "#000", // 実行中のステップのテキストも黒字
  },
  nextStepText: {
    color: "#000", // 次のステップのテキストも黒字
  },
  timerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  timerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 10,
  },
});
