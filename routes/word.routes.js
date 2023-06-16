const { Router } = require("express");
const Word = require("../models/Word");
const router = Router();

router.get("/add", async (req, res) => {
  try {
    const link = await Link.findOne({ code: req.params.code });
    if (link) {
      link.clicks++;
      await link.save();
      return res.redirect(link.from);
    }
    res.status(404).json("Link not found!");
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong, try again please!" });
  }
});

module.exports = router;
