const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Home endpoint
app.get("/", (req, res) => {
  console.log("hello world");
  res.json({ message: "Hello World!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
