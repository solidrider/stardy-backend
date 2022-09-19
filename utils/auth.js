const jwt = require("jsonwebtoken");
const secret_key = "mern-stardy";

const auth = async (req, res, next) => {
  if (req.method === "GET") {
    return next();
  }
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiY0B0ZXN0LmNvbSIsImlhdCI6MTY2MzQ3NzkyOSwiZXhwIjoxNjYzNTYwNzI5fQ.04O2vs3eO0y-L7f0qmHl_cYwU82_ilWwuDDVqh7_DYs";
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
