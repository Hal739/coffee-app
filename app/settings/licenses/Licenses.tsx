import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';
import licenses from '@/licenses.json'; // licenses.jsonをインポート

const Licenses = () => {
  const [licenseData, setLicenseData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    // ライセンスデータを設定
    setLicenseData(licenses);
  }, []);

  const renderItem = ({ item }: { item: [string, any] }) => {
    const [packageName, details] = item;
    return (
      <>
        <Text style={styles.packageName}>{packageName}</Text>
        <Text style={styles.licenseText}>{details.licenseText}</Text>
      </>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={Object.entries(licenseData)}
        keyExtractor={(item) => item[0]} // パッケージ名をキーとして使用
        renderItem={renderItem}
        contentContainerStyle={styles.scrollContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
  },
  packageName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  licenseText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
});

export default Licenses;