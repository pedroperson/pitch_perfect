import SessionManager from "./session.js";

class SessionMiddleware {
  constructor(sessionManager) {
    this.sessionManager = sessionManager;
  }

  async init() {
    await this.sessionManager.init();
  }

  /**
   * Middleware to check session and attach user to req.user
   */
  sessionMiddleware() {
    return (req, res, next) => {
      console.log("Session middleware - cookies:", req.cookies);
      const sessionId = req.cookies?.sessionId;
      console.log("Session middleware - sessionId:", sessionId);

      if (!sessionId) {
        console.log("Session middleware - no sessionId found");
        req.user = null;
        return next();
      }

      const session = this.sessionManager.getSession(sessionId);
      console.log("Session middleware - session found:", !!session);

      if (!session) {
        console.log("Session middleware - invalid session, clearing cookie");
        // Clear invalid cookie
        res.clearCookie("sessionId");
        req.user = null;
        return next();
      }

      // Attach user data to request
      req.user = {
        id: session.userId,
        email: session.email,
        name: session.name,
      };
      console.log("Session middleware - user attached:", req.user.email);

      next();
    };
  }

  /**
   * Middleware to require authentication
   */
  requireAuth() {
    return (req, res, next) => {
      if (!req.user) {
        return res.status(401).json({
          error: "Authentication required",
        });
      }
      next();
    };
  }

  /**
   * Get session manager instance
   */
  getSessionManager() {
    return this.sessionManager;
  }
}

export default SessionMiddleware;
