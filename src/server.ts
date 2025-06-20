import app from "./app";

async function startServer() {
    try {
        app.listen(4000, () => {
            console.log("Server is running on port 4000");
        });        
    } catch (error) {
        console.log("Error starting server:", error);
    }
}

startServer();