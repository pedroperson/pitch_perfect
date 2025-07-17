import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import crypto from "crypto";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class SessionManager {
  constructor() {
    this.sessions = new Map(); // In-memory sessions
    this.db = null;
    // Do not call this.init() here
  }

  async init() {
    const dbPath = path.join(__dirname, "../../data/sessions.json");
    const adapter = new JSONFile(dbPath);
    this.db = new Low(adapter, { sessions: [] });

    await this.db.read();
    await this.db.write();

    // Load existing sessions from file to memory
    await this.loadSessionsFromFile();
  }

  /**
   * Load sessions from file to memory
   */
  async loadSessionsFromFile() {
    await this.db.read();

    for (const sessionData of this.db.data.sessions) {
      // Check if session is still valid (not expired)
      if (new Date(sessionData.expiresAt) > new Date()) {
        this.sessions.set(sessionData.sessionId, sessionData);
      }
    }
  }

  /**
   * Generate a unique session ID
   * @returns {string} Unique session ID
   */
  generateSessionId() {
    return crypto.randomBytes(32).toString("hex");
  }

  /**
   * Create a new session for a user
   * @param {Object} user - User object with id, name, email
   * @returns {Object} Session object
   */
  async createSession(user) {
    // Remove any existing session for this user
    await this.removeSessionByUserId(user.id);

    const sessionId = this.generateSessionId();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

    const session = {
      sessionId,
      userId: user.id,
      email: user.email,
      name: user.name,
      createdAt: new Date(),
      expiresAt,
    };

    // Store in memory
    this.sessions.set(sessionId, session);

    // Store in file
    await this.saveSessionToFile(session);

    return session;
  }

  /**
   * Save session to file
   * @param {Object} session - Session object
   */
  async saveSessionToFile(session) {
    await this.db.read();

    // Remove any existing session for this user
    this.db.data.sessions = this.db.data.sessions.filter(
      (s) => s.userId !== session.userId
    );

    // Add new session
    this.db.data.sessions.push(session);
    await this.db.write();
  }

  /**
   * Get session by session ID
   * @param {string} sessionId - Session ID
   * @returns {Object|null} Session object or null if not found/expired
   */
  getSession(sessionId) {
    const session = this.sessions.get(sessionId);

    if (!session) {
      return null;
    }

    // Check if session is expired
    if (new Date(session.expiresAt) <= new Date()) {
      this.sessions.delete(sessionId);
      this.removeSessionFromFile(sessionId);
      return null;
    }

    return session;
  }

  /**
   * Remove session by session ID
   * @param {string} sessionId - Session ID
   */
  async removeSession(sessionId) {
    this.sessions.delete(sessionId);
    await this.removeSessionFromFile(sessionId);
  }

  /**
   * Remove session by user ID
   * @param {string} userId - User ID
   */
  async removeSessionByUserId(userId) {
    // Find session in memory
    for (const [sessionId, session] of this.sessions.entries()) {
      if (session.userId === userId) {
        this.sessions.delete(sessionId);
        break;
      }
    }

    // Remove from file
    await this.db.read();
    this.db.data.sessions = this.db.data.sessions.filter(
      (s) => s.userId !== userId
    );
    await this.db.write();
  }

  /**
   * Remove session from file
   * @param {string} sessionId - Session ID
   */
  async removeSessionFromFile(sessionId) {
    await this.db.read();
    this.db.data.sessions = this.db.data.sessions.filter(
      (s) => s.sessionId !== sessionId
    );
    await this.db.write();
  }

  /**
   * Clean up expired sessions
   */
  async cleanupExpiredSessions() {
    const now = new Date();

    // Clean memory
    for (const [sessionId, session] of this.sessions.entries()) {
      if (new Date(session.expiresAt) <= now) {
        this.sessions.delete(sessionId);
      }
    }

    // Clean file
    await this.db.read();
    this.db.data.sessions = this.db.data.sessions.filter(
      (session) => new Date(session.expiresAt) > now
    );
    await this.db.write();
  }
}

export default SessionManager;
