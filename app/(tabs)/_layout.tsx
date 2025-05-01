import { Tabs, useRouter } from "expo-router";
import { StyleSheet, TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function appLayout() {
    const router = useRouter();
    return (

        <Tabs
            screenOptions={{
                headerTitleAlign: "center", 
                headerStyle: {
                    backgroundColor: "#f8f8f8", 
                },
                headerTitleStyle: {
                    fontSize: 16, 
                    fontWeight: "bold", 
                },
                headerRight: () => (
                    <TouchableOpacity
                    onPressIn={() => 
                        router.push({
                        pathname:  "/settings/Settings",
                        })
                    }
                    style={styles.headerIcon}
                    >
                    <Entypo name="dots-three-vertical" size={18} color="black" />
                    </TouchableOpacity>
                ),
            }}
        >
            <Tabs.Screen name="(note)" options={{ 
                title: "メモ",
                tabBarIcon(){
                    return (
                        <SimpleLineIcons name="notebook" size={24} color="black" />
                    )}
                }}
            />
            <Tabs.Screen name="timer" options={{
                title: "タイマー" ,
                tabBarIcon(){
                    return (
                        <Ionicons name="timer-outline" size={24} color="black" />
                    )}
            }} />
        </Tabs>
    );
};

const styles = StyleSheet.create({
    headerIcon: {
        padding: 10,
        borderRadius: 5,
    },
    headerIconText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

