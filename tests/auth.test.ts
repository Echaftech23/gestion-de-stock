import AsyncStorage from '@react-native-async-storage/async-storage';
import { authenticateUser, isLoggedIn, getCurrentUser, logoutUser } from '@/services/auth';


// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

// Mock db.json
jest.mock('../data/db.json', () => ({
  warehousemans: [
    { id: 1, secretKey: 'valid-key', name: 'Test User' },
    { id: 2, secretKey: 'another-key', name: 'Another User' },
  ],
}));

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('authenticateUser', () => {
    it('should authenticate user with valid secret key', async () => {
      const user = await authenticateUser('valid-key');
      expect(user).toBeDefined();
      expect(user.id).toBe(1);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('authToken', '1');
    });

    it('should throw error with invalid secret key', async () => {
      await expect(authenticateUser('invalid-key')).rejects.toThrow('Invalid secret key');
    });
  });

  describe('isLoggedIn', () => {
    it('should return true when auth token exists', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('1');
      const result = await isLoggedIn();
      expect(result).toBe(true);
    });

    it('should return false when no auth token exists', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      const result = await isLoggedIn();
      expect(result).toBe(false);
    });
  });

  describe('getCurrentUser', () => {
    it('should return user when logged in and user exists', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('1');
      const user = await getCurrentUser();
      expect(user).toBeDefined();
      expect(user?.id).toBe(1);
    });

    it('should return null when not logged in', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      const user = await getCurrentUser();
      expect(user).toBeNull();
    });

    it('should return null when user not found in db', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue('999');
      const user = await getCurrentUser();
      expect(user).toBeNull();
    });
  });

  describe('logoutUser', () => {
    it('should remove auth token', async () => {
      await logoutUser();
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith('authToken');
    });
  });
});