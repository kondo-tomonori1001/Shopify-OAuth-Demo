import dotenv from "dotenv";
import { shopifyApp } from "@shopify/shopify-app-express";
import { MySQLSessionStorage } from "@shopify/shopify-app-session-storage-mysql";
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
  sessionStorage: MySQLSessionStorage.withCredentials(
    process.env.JAWSDB_HOST,
    process.env.JAWSDB_DATABASE,
    process.env.JAWSDB_USER,
    process.env.JAWSDB_PASSWORD,
    { connectionPoolLimit: 10 } // optional
  ),
});

export default shopify;
