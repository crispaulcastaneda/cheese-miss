import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

// Load environment variables first
dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// Middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: process.env.NODE_ENV === "production"
        ? ["https://your-frontend-domain.onrender.com"] // Replace with your actual frontend URL
        : "http://localhost:5173",
    credentials: true,
}));

// Add error handling wrapper for routes
const safeRouteImport = async (routePath, mountPath) => {
    try {
        console.log(`Loading route: ${routePath}`);
        const route = await import(routePath);
        app.use(mountPath, route.default);
        console.log(`Successfully loaded route: ${mountPath}`);
    } catch (error) {
        console.error(`Error loading route ${routePath}:`, error);
        process.exit(1);
    }
};

// Load routes with error handling
await safeRouteImport("./routes/auth.route.js", "/api/auth");
await safeRouteImport("./routes/message.route.js", "/api/messages");

// Serve static files in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
}

// Start server
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV}`);
    connectDB();
});