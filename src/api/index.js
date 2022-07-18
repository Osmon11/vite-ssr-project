import axios from "axios";
import cookie_js from "cookie_js";
import { useStore } from "../store";

let baseURL = "http://localhost:3001",
  token = cookie_js.get("amanat_advisory_token"),
  headers = {};

if (token) {
  headers.Authorization = token ? token : "";
}

export const appAxios = axios.create({ baseURL, headers });

export const makeRequest = (endpoint, method, data) => {
  const { setAlert } = useStore();
  function errorHandler({ response }) {
    if (response.status === 401) {
      cookie_js.remove("project_deti_token");
      appAxios.defaults.headers["Authorization"] = "";

      setAlert({
        severity: "error",
        message: response.data.message || "Токен больше не действителен",
      });
      return;
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
