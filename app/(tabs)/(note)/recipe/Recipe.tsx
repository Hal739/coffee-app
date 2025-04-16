import { StyleSheet, SafeAreaView, Alert} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import ItemList from "@/components/ui/ItemList";
import { handleDeleteConfirmation } from '@/utils/deleteUtils';
import AddButton from "@/components/ui/AddButton";
import { useLoadData } from "@/hooks/useLoadData";

const Recipe = () => {
  const router = useRouter();

  const { data: recipes, setData: setRecipes } = useLoadData({
    storageKey: 'recipes',
    formatData: (recipe: any, index: number) => ({
      id: index.toString(),
      name: recipe.recipeName,
    }),
  });

  const handleDelete = async (id: string) => {
    await handleDeleteConfirmation(
      id,
      recipes,
      'このレシピを削除しますか？',
      'recipes',
      setRecipes as any
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ItemList
        data={recipes}
        onDelete={handleDelete}
        detailPath="/recipe/detail/DetailRecipe"
      />
      <AddButton
        title="レシピの追加"
        onPress={() => {
          router.push('/(tabs)/(note)/recipe/editor/EditorDetail');
        }}
      />
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
