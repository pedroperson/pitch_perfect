#!/usr/bin/env node

import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Starting Football Manager Backend Server...");
console.log(`Working directory: ${__dirname}`);

// Start the server
const server = spawn("node", ["index.js"], {
  cwd: __dirname,
  stdio: "inherit",
  shell: true,
});

server.on("error", (error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});

server.on("close", (code) => {
  console.log(`Server process exited with code ${code}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on("SIGINT", () => {
  console.log("\nShutting down server...");
  server.kill("SIGINT");
});

process.on("SIGTERM", () => {
  console.log("\nShutting down server...");
  server.kill("SIGTERM");
});
