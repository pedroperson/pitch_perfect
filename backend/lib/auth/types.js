/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier for the user
 * @property {string} name - User's display name
 * @property {string} email - User's email address (unique)
 * @property {string} password - Hashed password
 * @property {Date} createdAt - When the user was created
 * @property {Date} updatedAt - When the user was last updated
 */

/**
 * @typedef {Object} CreateUserData
 * @property {string} name - User's display name
 * @property {string} email - User's email address
 * @property {string} password - Plain text password (will be hashed)
 */

/**
 * @typedef {Object} UpdateUserData
 * @property {string} name - New display name
 */

/**
 * @typedef {Object} LoginData
 * @property {string} email - User's email address
 * @property {string} password - Plain text password
 */

module.exports = {};
