import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import { Home, BookOpen, History, User } from 'lucide-react-native';

export default function TabLayout() {

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        paddingTop: 6,
      }, 
      tabBarActiveTintColor: '#8B5CF6',
      tabBarInactiveTintColor: '#838E9E'
      }}>
      <Tabs.Screen name="index" options={{
        title: 'Home',
        tabBarIcon: ({color}) => (
          <Home size={24} color={color} />
        )
      }}/>
      <Tabs.Screen name="learn" options={{
        title: 'Learn',
        tabBarIcon: ({color}) => (
          <BookOpen size={24} color={color} />
        )
      }}/>
      <Tabs.Screen name="history" options={{
        title: 'History',
        tabBarIcon: ({color}) => (
          <History size={24} color={color} />
        )
      }}/>
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({color}) => (
          <User size={24} color={color} />
        )
      }}/>
    </Tabs>
  )
}