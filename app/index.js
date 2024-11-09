import express from "express";
import shopify from "./shopify.js";
import connection from "./db.js";
import dotenv from "dotenv";

dotenv.config();

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

app.get("/", sessionCheck, async (req, res) => {
  console.log("home");
  const [rows] = await connection.execute("SELECT * FROM users");
  console.log(rows);
  res.send("home111");
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
