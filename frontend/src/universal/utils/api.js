import fetch from "node-fetch";

const apiUrl = process.env.API_URL ? process.env.API_URL : "/api";

export function fetchJson(url) {
  const options = {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(url, options).then(response =>
    response.json().then(data => ({
      data: data,
      ok: response.ok,
      headers: response.headers
    }))
  );
}

export function apiGet(url) {
  const options = {
    method: "GET",
    credentials: "include",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(apiUrl + url, options).then(response =>
    response.json().then(data => ({
      data: data,
      ok: response.ok,
      code: response.code,
      headers: response.headers
    }))
  );
}

export function apiPost(url, data, method) {
  const options = {
    method: method || "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };

  return fetch(apiUrl + url, options).then(response =>
    response.json().then(data => ({
      data: data,
      ok: response.ok,
      code: response.status,
      headers: response.headers
    }))
  );
}

export function apiDelete(url) {
  const options = {
    method: "DELETE",
    credentials: "include",
    headers: { "Content-Type": "application/json" }
  };

  return fetch(apiUrl + url, options).then(response => ({
    ok: response.ok,
    code: response.status,
    headers: response.headers
  }));
}

export function apiFileUpload(url, data) {
  const options = {
    method: "PATCH",
    credentials: "include",
    body: data
  };

  return fetch(apiUrl + url, options).then(response =>
    response.json().then(data => ({
      data: data,
      ok: response.ok,
      headers: response.headers
    }))
  );
}
