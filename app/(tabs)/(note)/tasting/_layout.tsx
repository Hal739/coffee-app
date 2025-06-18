import { useRouter, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLoadData } from '@/hooks/useLoadData';
import { handleDeleteConfirmation } from '@/utils/deleteUtils';

export default function tastingLayout() {
  const router = useRouter();
  const { data: notes, setData: setNotes } = useLoadData({
    storageKey: 'tastingNotes',
    formatData: (item: any, i: number) => ({ id: i.toString(), name: item.title }),
  });

  const handleDelete = async (id: string) => {
    await handleDeleteConfirmation(
      id,
      notes,
      'このテイスティングノートを削除しますか？',
      'tastingNotes',
      setNotes as any,
      () => router.back()
    );
  };

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f8f8f8' },
        headerTintColor: '#333',
        headerTitleStyle: { fontSize: 16 },
      }}
    >
      <Stack.Screen name="Tasting" options={{ headerShown: false }} />
      <Stack.Screen
        name="add/NewTasting"
        options={{ title: 'テイスティングノートの追加', presentation: 'modal' }}
      />
      <Stack.Screen
        name="detailTasting/DetailTasting"
        options={({ route }) => {
          const { id } = (route.params as { id: string }) || {};
          return {
            title: 'テイスティングノートの詳細',
            presentation: 'modal',
            headerRight: () => (
              <View style={styles.headerRight}>
                <TouchableOpacity
                  onPressIn={() =>
                    router.push({ pathname: '../detailTasting/EditorDetailTasting', params: { id } })
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
        name="detailTasting/EditorDetailTasting"
        options={{ title: 'テイスティングノートの編集', presentation: 'modal' }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  headerRight: { flexDirection: 'row', alignItems: 'center' },
  headerIcon: { marginRight: 10, padding: 5 },
});