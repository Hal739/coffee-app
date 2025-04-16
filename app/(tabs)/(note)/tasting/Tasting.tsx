import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, SafeAreaView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';
import ItemList from '@/components/ui/ItemList';
import { handleDeleteConfirmation } from '@/utils/deleteUtils';
import AddButton from '@/components/ui/AddButton';
import { useLoadData } from '@/hooks/useLoadData';


export default function TastingNote() {
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
      'このレシピを削除しますか？',
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
  textArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: '65%',
    flexWrap: 'wrap',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
  },
  detailButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginLeft: 'auto',
  },
  detailButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    marginLeft: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 16,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 16,
  },
});