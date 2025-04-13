import { useRouter, Stack } from 'expo-router';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

export default function Layout() {
    const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerShown:false,
      }}>
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