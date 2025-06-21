import "dotenv/config";
import app from "./app";
import connectDB from "./app/config/db";

async function startServer() {
    try {
        app.listen(4000, () => {
            console.log("Server is running on port 4000");
        });
        await connectDB();       
    } catch (error) {
        console.log("Error starting server:", error);
    }
}

startServer();