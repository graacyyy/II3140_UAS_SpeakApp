import { ScrollView, View, Image, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SignUp() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sign Up</Text>
        <Image
          source={require('@/assets/images/favicon.png')}
          style={{ width: 50, height: 50 }}
        />
      </View>

      <View style={styles.formContainer}>
        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
          />
        </View>

        {/* Email Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@gmail.com"
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Create a password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="must be 8 characters"
              placeholderTextColor="#94A3B8"
              secureTextEntry
            />
            <TouchableOpacity style={styles.eyeIcon}>
              <Ionicons name="eye" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="re-enter your password"
              placeholderTextColor="#94A3B8"
              secureTextEntry
            />
            <TouchableOpacity style={styles.eyeIcon}>
              <Ionicons name="eye" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButton} onPress={() => {
          router.dismissAll();
          router.push('/(tabs)');
        }}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <Link href="/login" style={styles.loginLink}>
            Log in
          </Link>
        </View>
      </View>
    </ScrollView>
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
  input: {
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
    backgroundColor: '#fff',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    backgroundColor: '#fff',
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#1E293B',
  },
  eyeIcon: {
    padding: 16,
  },
  signUpButton: {
    backgroundColor: '#000',
    borderRadius: 100,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  loginText: {
    fontSize: 16,
    color: '#64748B',
  },
  loginLink: {
    fontSize: 16,
    color: '#8B5CF6',
    fontWeight: '600',
  },
});