const jwt = require("jsonwebtoken");
const secret_key = "mern-stardy";

const auth = async (req, res, next) => {
  if (req.method === "GET") {
    return next();
  }
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY2RlZkB0ZXN0LmNvbSIsImlhdCI6MTY2MzU5NTcyOCwiZXhwIjoxNjY0MjAwNTI4fQ.1CqaMuOQ7WdQJO8ubOXuK5bqyc7faUftXSNqRNEDZB0";
  // await req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(400).json({ message: "トークンがありません" });
  }
  try {
    const decoded = jwt.verify(token, secret_key);
    req.body.email = decoded.email;
    return next();
  } catch (err) {
    return res.status(400).json({ message: "トークンが不正です" });
  }
};

module.exports = auth;
