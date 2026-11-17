
import { createApp } from "../server/app.js";

let appPromise;

async function getApp() {
  if (!appPromise) {
    appPromise = createApp()
      .then(({ app }) => app)
      .catch((error) => {
        appPromise = null;
        throw error;
      });
  }

  return appPromise;
}

export default async function handler(req, res) {
  try {
    const app = await getApp();
    return app(req, res);
  } catch (error) {
console.error("API initialization failed:", {
  code: error.code,
  message: error.message,
  errno: error.errno,
  syscall: error.syscall,
});
    if (!res.headersSent) {
      return res.status(500).json({
        error: "Không thể kết nối cơ sở dữ liệu.",
      });
    }
  }
}
