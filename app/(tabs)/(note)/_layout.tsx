import {
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
  } from "@react-navigation/material-top-tabs";
  import { withLayoutContext } from "expo-router";
  import { ParamListBase, TabNavigationState } from "@react-navigation/native";
  import { MaterialTopTabNavigationEventMap } from "@react-navigation/material-top-tabs";
  
  const { Navigator } = createMaterialTopTabNavigator();
  
  export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
  >(Navigator);
  
  export default function TabLayout() {
    return (
      <MaterialTopTabs
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: '#f8f8f8' },
        }}
      >
        <MaterialTopTabs.Screen name="(recipe)" options={{ title: '抽出レシピ' }} />
        <MaterialTopTabs.Screen name="manage" options={{ title: '豆の管理' }} />
        <MaterialTopTabs.Screen name="tasting" options={{ title: 'テイスティング' }} />
      </MaterialTopTabs>
    );
  }