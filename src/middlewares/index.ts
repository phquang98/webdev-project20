import express from "express";
// --- Helpers/Middlewares fncs ---

export const verifyToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];
  // Check if bea
  if (typeof bearerHeader !== "undefined") {
    // Split at the space
    const bearer = bearerHeader.split(" ");
    // Get token from array
    const bearerToken = bearer[1];
    // Set the token
    req.body = {
      token: bearerToken,
    };
    // Calling next() to pass to other logics
    next();
  } else {
    // not allowed to proceed
    res.sendStatus(401);
  }
};

// ---
