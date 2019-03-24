import path from "path";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { renderStylesToString } from "emotion-server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "store/store";
import App from "components/containers/app";
import render from "./render";
import parse from "./parse";

const app = express();
const port = process.env.PORT || 3000;

const { head, body } = parse(path.join(__dirname, "../client/index.html"));

app.enable("trust proxy");
app.use("/assets", express.static(path.join(__dirname, "../client")));
app.use("/assets", express.static(path.join(__dirname, "../server")));

app.get("*", async (req, res, next) => {
  const referrer = req.get("Referrer");
  const userAgent = req.get("User-Agent");
  const timestamp = new Date().toISOString();

  console.log(
    "Express:",
    timestamp,
    req.ip,
    req.method,
    req.url,
    referrer ? referrer : "-",
    userAgent ? userAgent : "-"
  );

  if (req.url.includes("/assets") || req.url.includes("/favicon.ico")) {
    return next();
  }

  let html = "";
  let store = null;
  const context = {};
  const preloadedState = {};

  try {
    store = configureStore(preloadedState, req.url).store;
  } catch (e) {
    console.error(e);
  }

  const appWithRouter = (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>
  );

  // First render to catch in-app Redirects
  try {
    html = renderStylesToString(renderToString(appWithRouter));
  } catch (e) {
    html = "Server error: 500";
    console.error("ERROR: server.js -> renderToString pass I: ", e);
  }

  if (context.url) {
    res.redirect(context.url);
    return;
  }

  // .done is resolved when store.close() send an END event
  try {
    store
      .serverRunSaga(req.url)
      .toPromise()
      .then(() => {
        try {
          // Second render
          html = renderStylesToString(renderToString(appWithRouter));
        } catch (e) {
          html = "Server error: 500";
          console.error("ERROR: server.js -> renderToString pass II: ", e);
        }

        // Catch in-app redirects again after api requests were performed
        if (context.url) {
          res.redirect(context.url);
          return;
        }

        const finalState = store.getState();

        res
          .set("content-type", "text/html")
          .status(200)
          .send(render(html, finalState, head, body));
      });
  } catch (e) {
    res
      .set("content-type", "text/html")
      .status(500)
      .send("Server error: 500");
    console.error("ERROR: server.js -> store.serverRunSaga(): ", e);
  }

  // Dispatch a close event so sagas stop listening after they're resolved
  store && store.serverStopSaga();
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));
