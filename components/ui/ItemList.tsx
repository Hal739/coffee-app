import React from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type ItemListProps = {
  data: { id: string; name: string }[];
  onDelete: (id: string) => void;
  detailPath: string;
};

const ItemList: React.FC<ItemListProps> = ({ data, onDelete, detailPath }) => {
  const router = useRouter();

  return (
    <FlatList
      data={data}
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
                pathname: detailPath as any,
                params: { id: item.id },
              })
            }
          >
            <Text style={styles.detailButtonText}>詳細</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(item.id)}
          >
            <Text style={styles.deleteButtonText}>削除</Text>
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
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
  textArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: '65%',
    flexWrap: 'wrap',
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
});

export default ItemList;