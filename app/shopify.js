// import { shopifyApp } from "@shopify/shopify-app-express";
// import { MemorySessionStorage } from "@shopify/shopify-app-session-storage-memory";

// const shopify = shopifyApp({
//   api: {
//     apiKey: process.env.API_KEY,
//     apiSecretKey: process.env.API_SECRET_KEY,
//     scopes: ["read_products", "write_products"],
//     hostScheme: "https",
//     hostName: process.env.HOST_NAME,
//     isEmbeddedApp: false,
//     apiVersion: "2024-10",
//   },
//   auth: {
//     path: "/api/auth",
//     callbackPath: "/api/auth/callback",
//   },
//   webhooks: {
//     path: "/api/webhooks",
//   },
//   sessionStorage: new MemorySessionStorage(),
// });

// export default shopify;
