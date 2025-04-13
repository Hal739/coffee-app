import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from "react-native";
import { FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Recipe = () => {
  const [recipes, setRecipes] = useState<{ id: string; name: string }[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const storedRecipes = await AsyncStorage.getItem("recipes");
        console.log("保存されているJSON:", storedRecipes); // JSONデータをコンソールに出力

        if (storedRecipes) {
          const parsedRecipes = JSON.parse(storedRecipes);
          const formattedRecipes = parsedRecipes.map(
            (recipe: any, index: number) => ({
              id: index.toString(),
              name: recipe.recipeName,
            })
          );
          setRecipes(formattedRecipes);
        }
      } catch (error) {
        Alert.alert("エラー", "レシピの読み込み中にエラーが発生しました。");
        console.error("読み込みエラー:", error);
      }
    };

    loadRecipes();
  }, []);

  const handleDelete = async (id: string) => {
    Alert.alert(
      "確認",
      "このレシピを削除しますか？",
      [
        {
          text: "キャンセル",
          style: "cancel",
        },
        {
          text: "削除",
          style: "destructive",
          onPress: async () => {
            try {
              // ローカル状態を更新
              const updatedRecipes = recipes.filter(
                (recipe) => recipe.id !== id
              );

              // idを再割り当て
              const reindexedRecipes = updatedRecipes.map((recipe, index) => ({
                ...recipe,
                id: index.toString(),
              }));
              setRecipes(reindexedRecipes);

              // AsyncStorageを更新
              const storedRecipes = await AsyncStorage.getItem("recipes");
              if (storedRecipes) {
                const parsedRecipes = JSON.parse(storedRecipes);
                const filteredRecipes = parsedRecipes.filter(
                  (_: any, index: number) => index.toString() !== id
                );

                // idを再割り当てして保存
                const reindexedStoredRecipes = filteredRecipes.map(
                  (recipe: any, index: number) => ({
                    ...recipe,
                    id: index.toString(),
                  })
                );
                await AsyncStorage.setItem(
                  "recipes",
                  JSON.stringify(reindexedStoredRecipes)
                );
                console.log(
                  "更新後のJSON:",
                  JSON.stringify(reindexedStoredRecipes)
                ); // 更新後のJSONを確認
              }
            } catch (error) {
              Alert.alert("エラー", "レシピの削除中にエラーが発生しました。");
              console.error("削除エラー:", error);
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
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View
              style={styles.textArea}
            >
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() =>
                router.push({
                  pathname: "/recipe/detail/Detail",
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
      <Link
        href="/(tabs)/(note)/recipe/editor/EditorDetail"
        style={styles.button}
      >
        <Text style={styles.buttonText}>レシピの追加</Text>
      </Link>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textArea:{
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    maxWidth: "65%", // 最大幅を設定
    flexWrap: "wrap", // テキストが折り返すようにする
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
  },
  detailButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginLeft: "auto", // ボタンを右端に寄せる
  },
  detailButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
    marginLeft: 8, // 「詳細」ボタンとの間にスペースを追加
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    margin: 16,
  },
  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Recipe;
