import { useRouter, Stack } from 'expo-router';

export default function Layout() {
  const router = useRouter();
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
        name="Timer"
        options={{
          headerShown: false, // ヘッダーを非表示にする
          presentation: 'modal',
        }}
      />
    </Stack>
  );
}