import { useRouter, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
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
        name="Tasting"
        options={{
          headerShown: false, // ヘッダーを非表示にする
        }}
      />
      <Stack.Screen
        name="add/NewTasting"
        options={{
            title: '豆の追加',
            presentation: 'modal',
          
        }}
      />
      <Stack.Screen
              name="detailTasting/DetailTasting"
              options={({ route }) => {
                const { id }  = (route.params as { id: string }) || {};
                return {
                  title: 'テイスティングノートの詳細',
                  presentation: 'modal',
                  headerRight: () => (
                    <TouchableOpacity
                      onPressIn={() => {
                        console
                        router.push({
                          pathname: '/tasting/detailTasting/EditorDetailTasting',
                          params: {
                            id: id,
                          },
                        })}
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
        name="detailTasting/EditorDetailTasting"
        options={{
          title: 'テイスティングノートの編集',
          presentation: 'modal',
        }}
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
      marginRight: 10,
      padding: 5,
    },
    headerIconText: {
      color: '#007BFF',
      fontSize: 18,
    },
});