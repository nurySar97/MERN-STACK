const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

require("dotenv").config();

const mongoDbUrl = `mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PASSWORD}@cluster0.dica1nv.mongodb.net/?retryWrites=true&w=majority`;

/* Middlewares */
app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
app.use("/t/", require("./routes/redirect.routes"));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "client", "index.html"));
//   res.send("Hello World!");
// });

/* PORT */
const PORT = process.env.port || 5000;

/* INIT */
void (async function () {
  try {
    await mongoose.connect(mongoDbUrl, {
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
