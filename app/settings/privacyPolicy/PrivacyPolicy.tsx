import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const PrivacyPolicy = () => {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.text}>
            本アプリは、ユーザーの個人情報を一切収集・送信しません。
            アプリ内で入力された情報はすべて端末内に保存され、
            外部のサーバーに送信されることはありません。
            </Text>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 14,
        color: '#555',
        marginBottom: 16,
    },
});

export default PrivacyPolicy;