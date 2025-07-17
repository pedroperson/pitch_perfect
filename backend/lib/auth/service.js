import UserRepository from "./repo.js";
import SessionManager from "./session.js";

class AuthService {
  constructor(sessionManager) {
    this.userRepo = new UserRepository();
    this.sessionManager = sessionManager;
  }

  async init() {
    await this.userRepo.init();
    await this.sessionManager.init();
  }

  /**
   * Create a new user account
   * @param {Object} userData - User data with name, email, and password
   * @returns {Object} Created user object (without password)
   */
  async createAccount(userData) {
    // Validate input
    if (!userData.name || !userData.email || !userData.password) {
      throw new Error("Name, email, and password are required");
    }

    if (userData.password.length < 6) {
      throw new Error("Password must be at least 6 characters long");
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error("Invalid email format");
    }

    try {
      const user = await this.userRepo.create(userData);
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Login user with email and password
   * @param {Object} loginData - Login data with email and password
   * @returns {Object} Session object if login successful
   */
  async login(loginData) {
    // Validate input
    if (!loginData.email || !loginData.password) {
      throw new Error("Email and password are required");
    }

    const user = await this.userRepo.verifyCredentials(
      loginData.email,
      loginData.password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Create session
    const session = await this.sessionManager.createSession(user);
    return session;
  }

  /**
   * Edit user's name
   * @param {string} userId - User's ID
   * @param {string} newName - New name for the user
   * @returns {Object} Updated user object (without password)
   */
  async editName(userId, newName) {
    // Validate input
    if (!userId) {
      throw new Error("User ID is required");
    }

    if (!newName || newName.trim().length === 0) {
      throw new Error("Name cannot be empty");
    }

    if (newName.trim().length < 2) {
      throw new Error("Name must be at least 2 characters long");
    }

    const updatedUser = await this.userRepo.updateName(userId, newName.trim());

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  }

  /**
   * Get user by ID
   * @param {string} userId - User's ID
   * @returns {Object|null} User object (without password) or null if not found
   */
  async getUserById(userId) {
    if (!userId) {
      throw new Error("User ID is required");
    }

    const user = await this.userRepo.findById(userId);

    if (!user) {
      return null;
    }

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Logout user by removing their session
   * @param {string} sessionId - Session ID to remove
   */
  async logout(sessionId) {
    if (!sessionId) {
      throw new Error("Session ID is required");
    }

    await this.sessionManager.removeSession(sessionId);
  }

  /**
   * Get session manager instance
   */
  getSessionManager() {
    return this.sessionManager;
  }
}

export default AuthService;
