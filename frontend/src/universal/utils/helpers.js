export const isServer = !(
  typeof window !== "undefined" &&
  window.document &&
  window.document.createElement
);

export const isLocalHost =
  (typeof window !== "undefined" &&
    window &&
    window.location &&
    window.location.hostname) === "localhost" ||
  (typeof window !== "undefined" &&
    window &&
    window.location &&
    window.location.hostname) === "127.0.0.1";

export const isDevMode = process.env.NODE_ENV === "development";

export function getErrorType(error, errors) {
  if (errors[error.type]) {
    return errors[error.type].type;
  } else {
    return errors.DEFAULT.type;
  }
}

export function pad(n) {
  return n < 10 ? "0" + n : n;
}

export function getOrdinalSuffix(n) {
  return [, "st", "nd", "rd"][(n % 100 >> 3) ^ 1 && n % 10] || "th";
}

export function scrollToAnimated(top) {
  typeof window !== "undefined" &&
    window.scrollTo({
      top: top,
      left: 0,
      behavior: "smooth"
    });
}

export function removeEmptyKeys(obj) {
  let result = Object.assign({}, obj);
  Object.keys(result).forEach(key => !obj[key] && delete obj[key]);
  return result;
}
