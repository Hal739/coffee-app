import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Link, useRouter } from 'expo-router';

type TastingData = {
  id: string;
  name: string;
};

export default function TastingNote() {
  const [tastings, setTastings] = useState<TastingData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadTastingData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('tastingNotes');
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const formattedData = parsedData.map((item: any, index: number) => ({
            id: index.toString(),
            name: item.name,
            aroma: item.aroma,
          }));
          setTastings(formattedData);
        }
      } catch (error) {
        Alert.alert('エラー', 'テイスティングノートの読込中にエラーが発生しました。');
        console.error(error);
      }
    };
    loadTastingData();
  }, []);

  const handleDelete = (id: string) => {
    Alert.alert('確認', 'このノートを削除しますか？', [
      { text: 'キャンセル', style: 'cancel' },
      {
        text: '削除',
        style: 'destructive',
        onPress: async () => {
          try {
            const updated = tastings.filter((note) => note.id !== id);
            const reindexed = updated.map((note, index) => ({
              ...note,
              id: index.toString(),
            }));
            setTastings(reindexed);

            const storedData = await AsyncStorage.getItem('tastingNotes');
            if (storedData) {
              const parsedData = JSON.parse(storedData).filter(
                (_: any, index: number) => index.toString() !== id
              );
              const reindexedStored = parsedData.map((note: any, index: number) => ({
                ...note,
                id: index.toString(),
              }));
              await AsyncStorage.setItem('tastingNotes', JSON.stringify(reindexedStored));
            }
          } catch (error) {
            Alert.alert('エラー', '削除中にエラーが発生しました。');
            console.error(error);
          }
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={tastings}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.textArea}>
              <Text style={styles.cardText}>{item.name}</Text>
            </View>
            <TouchableOpacity
              style={styles.detailButton}
              onPress={() =>
                router.push({
                  pathname: '/tasting/detailTasting/DetailTasting',
                  params: { id: item.id },
                })
              }
            >
              <Text style={styles.detailButtonText}>詳細</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.deleteButtonText}>削除</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Link href="/(tabs)/(note)/tasting/add/NewTasting" style={styles.button}>
        <Text style={styles.buttonText}>ノートの追加</Text>
      </Link>
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