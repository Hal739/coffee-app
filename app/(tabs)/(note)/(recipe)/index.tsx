import { StyleSheet, SafeAreaView, View, Text } from "react-native";
import React from "react";
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
        detailPath="(recipe)/detail/DetailRecipe"
      />
      <AddButton
        title="レシピの追加"
        onPress={() => {
          router.push('/(tabs)/(note)/(recipe)/editor/EditorDetail');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

export default Recipe;
