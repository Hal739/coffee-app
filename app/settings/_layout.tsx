import { useRouter, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#f8f8f8' },
        headerTintColor: '#333',
        headerTitleStyle: {
          fontSize: 18,
         },
      }}>
      <Stack.Screen
        name="Settings"
        options={{
            title: '設定',
            presentation: 'modal',
        }}
      />
      <Stack.Screen
        name="licenses/Licenses"
        options={{
            title: 'ライセンス',
            presentation: 'modal',
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
      fontSize: 18,
      backgroundColor: '#f8f8f8',
    },
    headerIcon: {
      marginRight: 10,
    },
    headerIconText: {
      color: '#007BFF',
      fontSize: 18,
    },
});