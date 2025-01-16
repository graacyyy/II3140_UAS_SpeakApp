import { View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Log In</Text>
        <Image
          source={require('@/assets/images/favicon.png')}
          style={{ width: 50, height: 50 }}
        />
      </View>

      <View style={styles.formContainer}>
        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email address</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="helloworld@gmail.com"
              placeholderTextColor="#94A3B8"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.checkIcon}>
              <Ionicons name="checkmark-circle" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Enter your password"
              placeholderTextColor="#94A3B8"
            />
            <TouchableOpacity style={styles.eyeIcon}>
              <Ionicons name="eye-off" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password Link */}
        <TouchableOpacity style={styles.forgotContainer}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} onPress={() => {
          router.dismissAll();
          router.push('/(tabs)');
        }}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
    
        {/* Sign Up Link */}
        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don't have an account? </Text>
          <Link href="/signup" style={styles.signUpLink}>
            Sign in
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 36,
    marginTop: 44,
  },
  formContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#1E293B',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
  },
  checkIcon: {
    padding: 16,
  },
  eyeIcon: {
    padding: 16,
  },
  forgotContainer: {
    alignItems: 'flex-end',
    marginBottom: 32,
  },
  forgotText: {
    color: '#1E293B',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#000',
    borderRadius: 100,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signUpText: {
    fontSize: 16,
    color: '#64748B',
  },
  signUpLink: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '600',
  },
});