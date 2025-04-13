import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
  } from "@react-navigation/material-top-tabs";
  import { withLayoutContext } from "expo-router";
  import { ParamListBase, TabNavigationState } from "@react-navigation/native";
  
  const { Navigator } = createMaterialTopTabNavigator();
  
  export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
  >(Navigator);
  
  export default function TabLayout() {
    return (
      <MaterialTopTabs>
        <MaterialTopTabs.Screen name="recipe" options={{ title: "抽出レシピ" }} />
        <MaterialTopTabs.Screen name="manage" options={{ title: "豆の管理" }} />
        <MaterialTopTabs.Screen name="tasting" options={{
          title: "テイスティングノート",
          tabBarLabelStyle: { fontSize: 11}, // タブのラベルのフォントサイズを変更
          } } />
      </MaterialTopTabs>
    );
  }