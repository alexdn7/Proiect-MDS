const express = require("express");
const app = express();
const authRoutes = require("./routes/AuthRoutes");

app.use(express.json());

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
