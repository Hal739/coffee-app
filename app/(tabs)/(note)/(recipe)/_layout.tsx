import { Stack } from "expo-router";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import { useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLoadData } from "@/hooks/useLoadData";
import { handleDeleteConfirmation } from "@/utils/deleteUtils";

export default function recipeLayout() {
  const router = useRouter();

  const { data: recipes, setData: setRecipes } = useLoadData({
    storageKey: "recipes",
    formatData: (recipe: any, index: number) => ({
      id: index.toString(),
      name: recipe.recipeName,
    }),
  });

  const handleDelete = async (id: string) => {
    await handleDeleteConfirmation(
      id,
      recipes,
      "このレシピを削除しますか？",
      "recipes",
      setRecipes as any,
      () => {
        router.back();
      }
    );
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#f8f8f8" },
        headerTintColor: "#333",
        headerTitleStyle: {
          fontSize: 18,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // ヘッダーを非表示にする
        }}
      />
      <Stack.Screen
        name="editor/EditorDetail"
        options={{
          title: "レシピの追加",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="editor/EditorMethod"
        options={{
          title: "手順の設定",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="detail/DetailRecipe"
        options={({ route }) => {
          const { id } = (route.params as { id: string }) || {};
          return {
            title: "レシピの詳細",
            presentation: "modal",
            headerRight: () => (
              <View style={styles.headerRight}>
                <TouchableOpacity
                  onPressIn={() =>
                    router.push({
                      pathname: "../detail/Editor",
                      params: {
                        id: id,
                      },
                    })
                  }
                  style={styles.headerIcon}
                >
                  <FontAwesome5 name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => handleDelete(id)}
                  style={styles.headerIcon}
                >
                  <AntDesign
                    name="delete"
                    size={26}
                    color="black"
                    style={{ marginTop: 3 }}
                  />
                </TouchableOpacity>
              </View>
            ),
          };
        }}
      />
      <Stack.Screen
        name="detail/Editor"
        options={() => ({
          title: "レシピの編集",
          presentation: "modal",
        })}
      />
      <Stack.Screen
        name="detail/Editor2"
        options={() => ({
          title: "手順の編集",
          presentation: "modal",
        })}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 18,
    backgroundColor: "#f8f8f8",
  },
  headerIcon: {
    marginRight: 5,
    padding: 5, // タップ領域を広げる
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerIconText: {
    color: "#007BFF",
    fontSize: 18,
  },
});
