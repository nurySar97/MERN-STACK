const express = require("express");
const mongoose = require("mongoose");
const app = express();

require("dotenv").config();

// Routes
const authRoutes = require("./routes/auth.routes");
const linkRoutes = require("./routes/link.routes");
const redirectRoutes = require("./routes/redirect.routes");
const wordsRoutes = require("./routes/words.routes");

/* Middlewares */
app.use(express.json({ extended: true }));
app.use("/api/auth", authRoutes);
app.use("/api/link", linkRoutes);
app.use("/t/", redirectRoutes);
app.use("/api/word", wordsRoutes);

/* Port */
const PORT = process.env.port || 5000;

/* Init */
void (async function () {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    app.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}...`);
    });
  } catch (error) {
    console.log("Server error: ", error.message);

    process.exit(1);
  }
})();
