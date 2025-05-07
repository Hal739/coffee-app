import { useRouter, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLoadData } from '@/hooks/useLoadData';
import { handleDeleteConfirmation } from '@/utils/deleteUtils';

export default function manageLayout() {
  const router = useRouter();
  const { data: beans, setData: setBeans } = useLoadData({
    storageKey: 'beans',
    formatData: (item: any, i: number) => ({ id: i.toString(), name: item.name }),
  });

  const handleDelete = async (id: string) => {
    await handleDeleteConfirmation(
      id,
      beans,
      'この豆の管理情報を削除しますか？',
      'beans',
      setBeans as any,
      () => router.back()
    );
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f8f8f8' },
        headerTintColor: '#333',
        headerTitleStyle: { fontSize: 18 },
      }}
    >
      <Stack.Screen name="Manage" options={{ headerShown: false }} />
      <Stack.Screen
        name="add/NewBean"
        options={{ title: '管理情報の追加', presentation: 'modal' }}
      />
      <Stack.Screen
        name="detailManage/DetailManage"
        options={({ route }) => {
          const { id } = (route.params as { id: string }) || {};
          return {
            title: '管理情報の詳細',
            presentation: 'modal',
            headerRight: () => (
              <View style={styles.headerRight}>
                <TouchableOpacity
                  onPressIn={() =>
                    router.push({ pathname: '../detailManage/EditorDetailBean', params: { id } })
                  }
                  style={styles.headerIcon}
                >
                <FontAwesome5 name="edit" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPressIn={() => handleDelete(id)}
                  style={styles.headerIcon}
                >
                <AntDesign name="delete" size={26} color="black" style={{ marginTop: 3 }}/>
                </TouchableOpacity>
              </View>
            ),
          };
        }}
      />
      <Stack.Screen
        name="detailManage/EditorDetailBean"
        options={{ title: '豆の編集', presentation: 'modal' }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  headerIcon: { marginRight: 10, padding: 5 },
});