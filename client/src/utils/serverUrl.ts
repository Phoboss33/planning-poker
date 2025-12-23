const envUrl = process.env.VUE_APP_SERVER?.trim();
const runtimeOrigin = typeof window !== "undefined" ? window.location.origin : undefined;

// Если в .env прописан реальный адрес (не localhost) — используем его.
// Если .env пустой или там localhost, но открываемся не с localhost,
// используем хост страницы и его порт (если он указан). При отсутствии порта
// берём только протокол и хост. В остальных случаях — дефолт localhost:3000.
let resolvedUrl: string | undefined;

if (envUrl && !envUrl.includes("localhost")) {
  resolvedUrl = envUrl;
} else if (runtimeOrigin) {
  try {
    const url = new URL(runtimeOrigin);
    const port = url.port ? `:${url.port}` : "";
    resolvedUrl = `${url.protocol}//${url.hostname}${port}`;
  } catch (e) {
    resolvedUrl = undefined;
  }
}

const SERVER_URL = resolvedUrl || envUrl || "http://localhost:3000";

export default SERVER_URL;
