import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";
import bodyParser from "body-parser";

// to access on env file
dotenv.config();

// app config
const app = express();
const port = process.env.PORT || 4000; // 4000

//  middleware
app.use(express.json());
app.use(bodyParser.json());

const corsOptions = {
  origin: 'https://food-del-pgpj.vercel.app', // Replace with your frontend domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true, // If your app uses cookies or authentication
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));
export default function handler(req, res) {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://food-del-pgpj.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Your API logic here
  res.status(200).json({ message: 'Hello, world!' });
}

// db connection
connectDB();

app.get("/", (req, res) => {
  res.json("Welcome");
});
// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
// user endpoints
app.use("/api/user", userRouter);
// cart endpoints
app.use("/api/cart", cartRouter);
// order
app.use("/api/order", orderRouter)

app.use((err, req, res, next) => {
  console.error(err); // طباعة الخطأ في السجل
  res
    .status(500)
    .json({ message: "Internal Server Error", error: err.message });
});

// rung the server
app.listen(port, () => {
  console.log(`server is running  in port :${port}`);
});
