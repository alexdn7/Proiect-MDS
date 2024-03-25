const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/AuthRoutes");

app.use(express.json());
app.use(cors());
app.use("/auth", authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on ${PORT}`);
});
