import AsyncStorage from '@react-native-async-storage/async-storage';
import db from '../data/db.json';

// Authenticate a user by secretKey
export const authenticateUser = async (secretKey: string) => {
  const auth = db.warehousemans.find(
    (user: any) => user.secretKey === secretKey
  );

  if (!auth) {
    throw new Error('Invalid secret key');
  }

  // Save the authenticated user's ID to AsyncStorage
  await AsyncStorage.setItem('authToken', auth.id.toString());
  return auth;
};

// Check if a user is logged in
export const isLoggedIn = async () => {
  const authToken = await AsyncStorage.getItem('authToken');
  return !!authToken;
};

// Get the currently logged-in user
export const getCurrentUser = async () => {
  const userId = await AsyncStorage.getItem('authToken');
  if (!userId) return null;

  return db.warehousemans.find((user: any) => user.id === parseInt(userId));
};

// Log out the user
export const logoutUser = async () => {
  await AsyncStorage.removeItem('authToken');
};