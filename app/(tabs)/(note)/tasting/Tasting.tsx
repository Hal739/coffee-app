import React from 'react';
import { StyleSheet, SafeAreaView} from 'react-native';
import { useRouter } from 'expo-router';
import ItemList from '@/components/ui/ItemList';
import { handleDeleteConfirmation } from '@/utils/deleteUtils';
import AddButton from '@/components/ui/AddButton';
import { useLoadData } from '@/hooks/useLoadData';


export default function Tasting() {
  const router = useRouter();
  const { data: tastings, setData: setTastings } = useLoadData({
    storageKey: 'tastingNotes',
    formatData: (item: any, index: number) => ({
      id: index.toString(),
      name: item.name,
    }),
  });

const handleDelete = async (id: string) => {
    await handleDeleteConfirmation(
      id,
      tastings,
      'このノートを削除しますか？',
      'tastingNotes',
      setTastings as any
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      <ItemList
        data={tastings}
        onDelete={handleDelete}
        detailPath="/tasting/detailTasting/DetailTasting"
      />
      <AddButton
        title="ノートの追加"
        onPress={() => {
          router.push('/(tabs)/(note)/tasting/add/NewTasting');
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});