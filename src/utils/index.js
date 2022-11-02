import axios from "axios";

export default function getUrlString(obj) {
  let url = "";
  let keys = Object.keys(obj).filter((key) => Boolean(obj[key]));

  keys.forEach(
    (key, index) =>
      (url += `${key}=${obj[key]}${keys.length === index + 1 ? "" : "&"}`)
  );

  return url;
}

export function isImageLoaded(url) {
  return new Promise((resolve, reject) => fetch(url).then(res => res.status >= 200 && res.status < 300 ? resolve(true) : reject(false)).catch(() => reject(false)))
}