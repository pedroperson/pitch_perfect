import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import AuthService from "./lib/auth/service.js";
import SessionMiddleware from "./lib/auth/middleware.js";
import SessionManager from "./lib/auth/session.js";

const app = express();
const PORT = process.env.PORT || 3000;

// CORS middleware - must be first
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Other middleware
app.use(express.json());
app.use(cookieParser());

// Create a single session manager instance
const sessionManager = new SessionManager();

// Initialize auth service and session middleware with the same session manager
const authService = new AuthService(sessionManager);
const sessionMiddleware = new SessionMiddleware(sessionManager);

// Async setup function
async function startServer() {
  // Initialize the shared session manager first
  await sessionManager.init();

  // Then initialize the services
  await authService.init();
  await sessionMiddleware.init();

  // Apply session middleware to all routes
  app.use(sessionMiddleware.sessionMiddleware());

  // Home endpoint
  app.get("/", (req, res) => {
    console.log("hello world");
    res.json({
      message: "Hello World!",
      user: req.user || null,
    });
  });

  // Auth endpoints
  app.post("/auth/register", async (req, res) => {
    try {
      const user = await authService.createAccount(req.body);
      res.status(201).json({
        message: "Account created successfully",
        user,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/auth/login", async (req, res) => {
    try {
      const session = await authService.login(req.body);
      console.log("Login - session created:", session.sessionId);

      // Set session cookie
      res.cookie("sessionId", session.sessionId, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        sameSite: "lax",
      });
      console.log("Login - cookie set");

      res.json({
        message: "Login successful",
        user: {
          id: session.userId,
          email: session.email,
          name: session.name,
        },
      });
    } catch (error) {
      console.log("Login - error:", error.message);
      res.status(401).json({ error: error.message });
    }
  });

  app.post("/auth/logout", async (req, res) => {
    try {
      const sessionId = req.cookies?.sessionId;

      if (sessionId) {
        await authService.logout(sessionId);
      }

      // Clear session cookie
      res.clearCookie("sessionId");

      res.json({ message: "Logout successful" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

  // Protected endpoint example
  app.get("/auth/me", sessionMiddleware.requireAuth(), (req, res) => {
    res.json({ user: req.user });
  });

  // Edit name endpoint (protected)
  app.put(
    "/auth/edit-name",
    sessionMiddleware.requireAuth(),
    async (req, res) => {
      try {
        const { name } = req.body;

        if (!name) {
          return res.status(400).json({ error: "Name is required" });
        }

        const updatedUser = await authService.editName(req.user.id, name);

        // Update session with new name
        const sessionManager = authService.getSessionManager();
        const sessionId = req.cookies?.sessionId;
        if (sessionId) {
          const session = sessionManager.getSession(sessionId);
          if (session) {
            session.name = name;
            await sessionManager.saveSessionToFile(session);
          }
        }

        res.json({
          message: "Name updated successfully",
          user: updatedUser,
        });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  );

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();
