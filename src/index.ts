import "dotenv/config";
import { connectDB } from "./config/connection";
import app from "./app";

const PORT = process.env.PORT || 8000;

(async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
})();
