import { Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 汎用的な削除処理
 * @param id 削除対象のID
 * @param items 現在のデータリスト
 * @param confirmationMessage 確認ダイアログのメッセージ
 * @param storageKey AsyncStorageのキー
 * @param setItems 状態を更新するための関数
 * @param onCancel キャンセル時に呼ばれるコールバック（省略可）
 */
export const handleDeleteConfirmation = async (
  id: string,
  items: { id: string }[],
  confirmationMessage: string,
  storageKey: string,
  setItems: React.Dispatch<React.SetStateAction<{ id: string }[]>>,
  onDelete?: () => void
) => {
  return new Promise<void>((resolve) => {
    if (Platform.OS === 'web') {
      // Web環境ではwindow.confirmを使用
      const confirmed = window.confirm(confirmationMessage);
      if (!confirmed) {
        resolve();
        return;
      }
    } else {
      // モバイル環境ではAlertを使用
      Alert.alert(
        '確認',
        confirmationMessage,
        [
          {
            text: 'キャンセル',
            style: 'cancel',
            onPress: () => {
              resolve();
            },
          },
          {
            text: '削除',
            style: 'destructive',
            onPress: async () => {
              await performDelete(id, items, storageKey, setItems);
              onDelete?.();
              resolve();
            },
          },
        ],
        { cancelable: true }
      );
      return;
    }

    // Web環境で削除を実行
    performDelete(id, items, storageKey, setItems).then(() => resolve());
  });
};

const performDelete = async (
  id: string,
  items: { id: string }[],
  storageKey: string,
  setItems: React.Dispatch<React.SetStateAction<{ id: string }[]>>
) => {
  try {
    
    const updatedItems = items.filter((item) => item.id !== id);
    const reindexedItems = updatedItems.map((item, index) => ({
      ...item,
      id: index.toString(),
    }));
    setItems(reindexedItems);

    
    const storedData = await AsyncStorage.getItem(storageKey);
    if (storedData) {
      const parsedData = JSON.parse(storedData).filter(
        (_: any, index: number) => index.toString() !== id
      );
      const reindexedStoredData = parsedData.map((item: any, index: number) => ({
        ...item,
        id: index.toString(),
      }));
      await AsyncStorage.setItem(storageKey, JSON.stringify(reindexedStoredData));
    }
  } catch (error) {
    if (Platform.OS !== 'web') {
      Alert.alert('エラー', '削除中にエラーが発生しました。');
    } else {
      console.error('削除エラー:', error);
    }
  }
};