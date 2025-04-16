import { Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function Layout() {
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f8f8f8' },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontSize: 18,
         },
      }}>
      <Stack.Screen
        name="Recipe"
        options={{
          headerShown: false, // ヘッダーを非表示にする
        }}
      />
      <Stack.Screen
        name="editor/EditorDetail"
        options={{
          title: 'レシピの追加',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="editor/EditorMethod"
        options={{
          title: '手順の設定',
          presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="detail/DetailRecipe"
        options={({ route }) => {
          const { id }  = (route.params as { id: string }) || {};
          return {
            title: 'レシピの詳細',
            presentation: 'modal',
            headerRight: () => (
              <TouchableOpacity
                onPressIn={() => 
                  router.push({
                    pathname: '/recipe/detail/Editor',
                    params: {
                      id: id,
                    },
                  })
              }
                style={styles.headerIcon}
              >
                <FontAwesome5 name="edit" size={24} color="black" />
              </TouchableOpacity>
            ),
          };
        }}
      />
      <Stack.Screen
        name="detail/Editor"
        options={() => ({
          title: 'レシピの編集',
          presentation: 'modal',
        })}
      />
      <Stack.Screen
        name="detail/Editor2"
        options={() => ({
          title: '手順の編集',
          presentation: 'modal',
        })}
      />
      
    </Stack>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: 18,
      backgroundColor: '#f8f8f8',
    },
    headerIcon: {
      marginRight: 5,
      padding: 5, // タップ領域を広げる
    },
    headerIconText: {
      color: '#007BFF',
      fontSize: 18,
    },
});