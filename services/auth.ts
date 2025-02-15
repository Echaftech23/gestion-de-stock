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

export const getCurrentUser = async () => {
  const userId = await AsyncStorage.getItem('authToken');
  if (!userId) return null;

  const user = db.warehousemans.find((user) => user.id === parseInt(userId));
  return user || null;
};

// Log out the user
export const logoutUser = async () => {
  await AsyncStorage.removeItem('authToken');
};