import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class UserRepository {
  constructor() {
    this.db = null;
    // Do not call this.init() here
  }

  async init() {
    const dbPath = path.join(__dirname, "../../data/users.json");
    const adapter = new JSONFile(dbPath);
    this.db = new Low(adapter, { users: [] });

    await this.db.read();
    await this.db.write();
  }

  /**
   * Hash a password using SHA-256
   * @param {string} password - Plain text password
   * @returns {string} Hashed password
   */
  hashPassword(password) {
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  /**
   * Generate a unique ID
   * @returns {string} Unique ID
   */
  generateId() {
    return crypto.randomBytes(16).toString("hex");
  }

  /**
   * Find user by email
   * @param {string} email - User's email
   * @returns {Object|null} User object or null if not found
   */
  async findByEmail(email) {
    await this.db.read();
    return this.db.data.users.find((user) => user.email === email) || null;
  }

  /**
   * Find user by ID
   * @param {string} id - User's ID
   * @returns {Object|null} User object or null if not found
   */
  async findById(id) {
    await this.db.read();
    return this.db.data.users.find((user) => user.id === id) || null;
  }

  /**
   * Create a new user
   * @param {Object} userData - User data with name, email, and password
   * @returns {Object} Created user object
   */
  async create(userData) {
    await this.db.read();

    const existingUser = await this.findByEmail(userData.email);
    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const now = new Date();
    const user = {
      id: this.generateId(),
      name: userData.name,
      email: userData.email,
      password: this.hashPassword(userData.password),
      createdAt: now,
      updatedAt: now,
    };

    this.db.data.users.push(user);
    await this.db.write();

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  /**
   * Update user's name
   * @param {string} id - User's ID
   * @param {string} name - New name
   * @returns {Object|null} Updated user object or null if not found
   */
  async updateName(id, name) {
    await this.db.read();

    const userIndex = this.db.data.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return null;
    }

    this.db.data.users[userIndex].name = name;
    this.db.data.users[userIndex].updatedAt = new Date();

    await this.db.write();

    // Return user without password
    const { password, ...userWithoutPassword } = this.db.data.users[userIndex];
    return userWithoutPassword;
  }

  /**
   * Verify user credentials
   * @param {string} email - User's email
   * @param {string} password - Plain text password
   * @returns {Object|null} User object or null if credentials are invalid
   */
  async verifyCredentials(email, password) {
    const user = await this.findByEmail(email);
    if (!user) {
      return null;
    }

    const hashedPassword = this.hashPassword(password);
    if (user.password !== hashedPassword) {
      return null;
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export default UserRepository;
