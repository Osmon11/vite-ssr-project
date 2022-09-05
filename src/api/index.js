import axios from "axios";
import cookie_js from "cookie_js";
import { useStore } from "../store";

let token = cookie_js.get(import.meta.env.VITE_TOKEN_KEY),
  headers = { "X-CSRF-TOKEN": "CSRF-Token" };

if (token) {
  headers.Authorization = token ? token : "";
}
export const appAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers,
});

export const makeRequest = (endpoint, method, data) => {
  const store = useStore();
  function errorHandler({ response }) {
    if (response.status === 401) {
      cookie_js.remove(import.meta.env.VITE_TOKEN_KEY);
      appAxios.defaults.headers["authorization"] = "";

      store.setAlert({
        severity: "error",
        message: response.data?.message || "Токен больше не действителен",
      });
      return;
    } else {
      store.setAlert({
        severity: "error",
        message: response.data?.message || `Ошибка в запросе на: ${endpoint}`,
      });
    }
  }

  switch (method) {
    case "get": {
      return appAxios
        .get(endpoint)
        .then((res) => res.data)
        .catch(errorHandler);
    }
    case "post": {
      return appAxios
        .post(endpoint, data)
        .then((res) => res.data)
        .catch(errorHandler);
    }
    case "put": {
      return appAxios.put(endpoint, data).catch(errorHandler);
    }
    case "delete": {
      return appAxios
        .delete(endpoint, { data: data || {} })
        .catch(errorHandler);
    }
    default: {
      setAlert({
        severity: "error",
        message: `Метод запроса не найден: ${method} на ${endpoint}`,
      });
    }
  }
};
