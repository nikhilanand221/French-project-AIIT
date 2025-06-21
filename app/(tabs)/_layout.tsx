import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from "expo-router";
import { Text, View } from 'react-native';
import AmityUniversitySvg from '../../assets/images/AmityUniversity.svg';

function CustomHeader() {
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            <AmityUniversitySvg width={70} height={70} />
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>French For Beginners</Text>
        </View>
    );
}


export default function TabsLayout() {
    return <Tabs>
        <Tabs.Screen name="basics" options={{
            tabBarLabel: "Basics",
            tabBarIcon: () => (
                <MaterialIcons name="abc" size={24} color="black" />
            ),
            headerTitle: () => <CustomHeader />
        }} />

        <Tabs.Screen name="grammar" options={{
            tabBarLabel: "Grammar",
            tabBarIcon: () => (
                <MaterialIcons name="spellcheck" size={24} color="black" />
            ),
            headerTitle: () => <CustomHeader />
            
        }}/>

        <Tabs.Screen name="practice" options={{
            tabBarLabel: "Practice",
            tabBarIcon: () => (
                <FontAwesome6 name="users-gear" size={24} color="black" />
            ),
            headerTitle: () => <CustomHeader />
            
        }}/>

        <Tabs.Screen name="tipsAndTricks" options={{
            tabBarLabel: "Tips and Tricks",
            tabBarIcon: () => (
                <MaterialIcons name="lightbulb" size={24} color="black" />
            ),
            headerTitle: () => <CustomHeader />
            
        }}/>

    </Tabs>;
}