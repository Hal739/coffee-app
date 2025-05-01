import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import ItemList from '@/components/ui/ItemList'; 
import { handleDeleteConfirmation } from '@/utils/deleteUtils';
import AddButton from '@/components/ui/AddButton';
import { useLoadData } from '@/hooks/useLoadData';

const Manage = () => {
  const router = useRouter();
  const { data: beans, setData: setBeans } = useLoadData({
    storageKey: 'beans',
    formatData: (bean: any, index: number) => ({
      id: index.toString(),
      name: bean.name
    }),
  });

  const handleDelete = async (id: string) => {
    await handleDeleteConfirmation(
      id,
      beans,
      'この豆の管理情報を削除しますか？',
      'beans',
      setBeans as any
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ItemList
        data={beans}
        onDelete={handleDelete}
        detailPath="/manage/detailManage/DetailManage"
      />
      <AddButton
        title="管理情報の追加"
        onPress={() => {
          router.push('/(tabs)/(note)/manage/add/NewBean');
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Manage;