import { View, Text, Image, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
        />
        <Image 
          source={require('../assets/images/profile-placeholder.png')}
          style={styles.profilePic}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth:0.5,
    borderColor: '#DDDDDD',
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 16,
  },
  logo: {
    width: 72,
    height: 22.02,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 32,
    backgroundColor: '#DDD',
  }
});