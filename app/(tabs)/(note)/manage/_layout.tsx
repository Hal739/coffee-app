import { useRouter, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function manageLayout() {
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
        name="Manage"
        options={{
          headerShown: false, // ヘッダーを非表示にする
        }}
      />
      <Stack.Screen
        name="add/NewBean"
        options={{
            title: '管理情報の追加',
            presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="detailManage/DetailManage"
        options={({ route }) => {
          const { id }  = (route.params as { id: string }) || {};
          return {
            title: '管理情報の詳細',
            presentation: 'modal',
            headerRight: () => (
              <TouchableOpacity
                onPressIn={() => {
                  console
                  router.push({
                    pathname: '../detailManage/EditorDetailBean',
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
        name="detailManage/EditorDetailBean"
        options={{
          title: '豆の編集',
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
      marginRight: 5,
      padding: 5,
    },
    headerIconText: {
      color: '#007BFF',
      fontSize: 18,
    },
});