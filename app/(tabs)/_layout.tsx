//TODO: make it prettier
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";

export default function TabsLayout() {
    return <Tabs>
        <Tabs.Screen name="basics" options={{
            tabBarLabel: "Basics",
            tabBarIcon: () => (
                <MaterialIcons name="abc" size={24} color="black" />
            ),
            title: "Basics"
        }} />

        <Tabs.Screen name="grammer" options={{
            tabBarLabel: "Grammer",
            tabBarIcon: () => (
                <MaterialIcons name="spellcheck" size={24} color="black" />
            ),
            title: "Grammer"
        }}/>

        <Tabs.Screen name="practice" options={{
            tabBarLabel: "Practice",
            tabBarIcon: () => (
                <FontAwesome6 name="users-gear" size={24} color="black" />
            ),
            title: "Practice"
        }}/>

        <Tabs.Screen name="tipsAndTricks" options={{
            tabBarLabel: "Tips and Tricks",
            tabBarIcon: () => (
                <MaterialIcons name="lightbulb" size={24} color="black" />
            ),
            title: "Tips and Tricks"
        }}/>

    </Tabs>;
}