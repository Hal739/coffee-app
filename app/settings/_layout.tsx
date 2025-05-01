import { Stack } from 'expo-router';
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
      <Stack.Screen
        name="privacyPolicy/PrivacyPolicy"
        options={{
            title: 'プライバシーポリシー',
            presentation: 'modal',
        }}
      />
    </Stack>
  );
}
