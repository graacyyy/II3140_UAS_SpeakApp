import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Home, BookOpen, History, User } from 'lucide-react-native';

export default function NavigationBar() {
  const currentPath = usePathname();
  const isActive = (path: string) => currentPath === path;

  return (
    <View style={styles.navbar}>
      <Link href="./home" style={styles.navItem} asChild>
        <TouchableOpacity style={{flex: 1, flexDirection:'column', alignItems: 'center'}}>
            <Home color={isActive('/home') ? 'black' : '#838E9E'} size={24} />
            <Text style={{marginTop:4, fontWeight:isActive('/home')?600:400, color:isActive('/home')?'black':'#838E9E'}}>Home</Text>
        </TouchableOpacity>
      </Link>
      <Link href="./learn" style={styles.navItem} asChild>
        <TouchableOpacity style={{flex: 1, flexDirection:'column', alignItems: 'center'}}>
            <BookOpen color={isActive('/learn') ? 'black' : '#838E9E'} size={24} />
            <Text style={{marginTop:4, fontWeight:isActive('/learn')?600:400, color:isActive('/learn')?'black':'#838E9E'}}>Learn</Text>
        </TouchableOpacity>
      </Link>
      <Link href="./history" style={styles.navItem} asChild>
        <TouchableOpacity style={{flex: 1, flexDirection:'column', alignItems: 'center'}}>
            <History color={isActive('/history') ? 'black' : '#838E9E'} size={24} />
            <Text style={{marginTop:4, fontWeight:isActive('/history')?600:400, color:isActive('/history')?'black':'#838E9E'}}>History</Text>
        </TouchableOpacity>
      </Link>
      <Link href="./profile" style={styles.navItem} asChild>
        <TouchableOpacity style={{flex: 1, flexDirection:'column', alignItems: 'center'}}>
            <User color={isActive('/profile') ? 'black' : '#838E9E'} size={24} />
            <Text style={{marginTop:4, fontWeight:isActive('/profile')?600:400, color:isActive('/profile')?'black':'#838E9E'}}>Profile</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: 10,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    zIndex: 1000,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});