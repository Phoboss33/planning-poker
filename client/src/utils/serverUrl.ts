const envUrl = process.env.VUE_APP_SERVER?.trim();
const runtimeOrigin = typeof window !== "undefined" ? window.location.origin : undefined;

// Если в .env прописан реальный адрес (не localhost) — используем его.
// Если .env пустой или там localhost, но открываемся не с localhost, подставляем хост страницы и порт 3000.
// В остальных случаях — дефолт localhost:3000.
let resolvedUrl: string | undefined;

if (envUrl && !envUrl.includes("localhost")) {
  resolvedUrl = envUrl;
} else if (runtimeOrigin) {
  try {
    const url = new URL(runtimeOrigin);
    resolvedUrl = `${url.protocol}//${url.hostname}:3000`;
  } catch (e) {
    resolvedUrl = undefined;
  }
}

const SERVER_URL = resolvedUrl || envUrl || "http://localhost:3000";

export default SERVER_URL;
