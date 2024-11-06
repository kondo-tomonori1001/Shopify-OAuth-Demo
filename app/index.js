import express from "express";
import dotenv from "dotenv";
import { shopifyApp } from "@shopify/shopify-app-express";
import { MemorySessionStorage } from "@shopify/shopify-app-session-storage-memory";


dotenv.config();

const shopify = shopifyApp({
  api: {
    apiKey: process.env.API_KEY,
    apiSecretKey: process.env.API_SECRET_KEY,
    scopes: ["read_products", "write_products"],
    hostScheme: "https",
    hostName: process.env.HOST_NAME,
    isEmbeddedApp: false,
    apiVersion: "2024-10",
  },
  auth: {
    path: "/api/auth",
    callbackPath: "/api/auth/callback",
  },
  webhooks: {
    path: "/api/webhooks",
  },
  sessionStorage: new MemorySessionStorage(),
});

const app = express();
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// OAuth認証
app.get(shopify.config.auth.path, shopify.auth.begin());
app.get(
  shopify.config.auth.callbackPath,
  shopify.auth.callback(),
  (req, res) => {
    res.redirect("/");
  }
);

// sessionがあるかチェックし、なければ認証へリダイレクト
const sessionCheck = async (req, res, next) => {
  const sessionId = await shopify.api.session.getCurrentId({
    isOnline: false,
    rawRequest: req,
    rawResponse: res,
  });
  const session = await shopify.config.sessionStorage.loadSession(sessionId);

  if (!session) {
    return res.redirect(`/api/auth?shop=${process.env.SHOP}`);
  }
  req.session = session; // sessionをリクエストに格納
  next();
};

app.get("/", sessionCheck, (req, res) => {
  res.send("home");
});

// Rest APIの実行（商品データ取得）
app.get(
  "/api/products",
  sessionCheck,
  async (req, res) => {
    const session = req.session;
    const client = new shopify.api.clients.Rest({ session });
    const products = await client.get({
      path: "/admin/api/2024-10/products.json",
    });
    console.log(products.body.products);
    res.send("success get products data");
  }
);
