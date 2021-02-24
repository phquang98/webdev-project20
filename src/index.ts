import express from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";

import { verifyToken } from "./middlewares/index";

const app = express();

app.use(express.json()); // for parsing application/json

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// Needs authen
app.post("/api/posts", verifyToken, (req, res) => {
  req.headers.authorization &&
    jwt.verify(
      // req.body.token,
      req.headers.authorization.split(" ")[1],
      "verySecret",
      (err: VerifyErrors | null, authData: object | undefined) => {
        if (err) {
          res.sendStatus(403);
        } else {
          res.json({ message: "Post created ...", decodedAuthData: authData });
        }
      }
    );
});

// Get the token
app.post("/api/login", (req, res) => {
  const loginedUser = {
    id: 1,
    username: "John",
    email: "John@gmail.com",
  };

  jwt.sign(
    { userCredentials: loginedUser },
    "verySecret",
    { expiresIn: "30s" },
    (err: Error | null, token: string | undefined) => {
      res.json({ tokenValue: token });
    }
  );
});

app.listen(5000, () => {
  console.log("Server started at port 5000");
});
