import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TabLayout() {

  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        paddingTop: 6,
        paddingBottom : 10,
        minHeight: 60
      }, 
      tabBarActiveTintColor: '#8B5CF6',
      tabBarInactiveTintColor: '#838E9E'
      }}>
      <Tabs.Screen name="index" options={{
        title: 'Home',
        tabBarIcon: ({color}) => (
          <Icon name="home" size={24} color={color} />
        )
      }}/>
      <Tabs.Screen name="learn" options={{
        title: 'Learn',
        tabBarIcon: ({color}) => (
          <Icon name="book"  size={24} color={color} />
        )
      }}/>
      <Tabs.Screen name="history" options={{
        title: 'History',
        tabBarIcon: ({color}) => (
          <Icon name="history" size={24} color={color} />
        )
      }}/>
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({color}) => (
          <Icon name="user" size={24} color={color} />
        )
      }}/>
    </Tabs>
  )
}