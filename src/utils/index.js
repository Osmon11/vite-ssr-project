export default function getUrlString(obj) {
  let url = "";
  let keys = Object.keys(obj).filter((key) => Boolean(obj[key]));

  keys.forEach(
    (key, index) =>
      (url += `${key}=${obj[key]}${keys.length === index + 1 ? "" : "&"}`)
  );

  return url;
}
