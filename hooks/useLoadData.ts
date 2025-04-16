import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

type LoadDataOptions<T> = {
  storageKey: string;
  formatData: (data: any[], index: number) => T;
};

export function useLoadData<T>({ storageKey, formatData }: LoadDataOptions<T>) {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem(storageKey);
        if (storedData) {
          const parsedData = JSON.parse(storedData);
          const formattedData = parsedData.map(formatData);
          setData(formattedData);
        }
      } catch (error) {
        Alert.alert('エラー', `${storageKey}の読み込み中にエラーが発生しました。`);
        console.error('読み込みエラー:', error);
      }
    };

    loadData();
  }, [storageKey, formatData]);

  return { data, setData };
}