const envUrl = process.env.VUE_APP_SERVER;
const runtimeOrigin = typeof window !== "undefined" ? window.location.origin : undefined;

// Порядок приоритета: значение из .env, затем origin текущей страницы, затем локальный дефолт.
const SERVER_URL = envUrl || runtimeOrigin || "http://localhost:3000";

export default SERVER_URL;
