const { Router } = require("express");
const Words = require("../models/Words");
const authMiddleware = require("../middleware/auth.middleware");
const router = Router();
const { body, validationResult } = require("express-validator");

router.post(
  "/add",
  authMiddleware,
  body("word").notEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      const hasError = !errors.isEmpty();
      const errorString = errors
        .array()
        .map(({ value, msg, param, location }) => {
          return `\nvalue: ${
            value || "undefined"
          }\nmsg: ${msg}\nparam: ${param}\nlocation: ${location}`;
        })
        .join("\n");

      if (hasError) {
        return res.status(400).json({
          errors: errors.array(),
          message: errorString,
        });
      }
      const wordsByUserId = await Words.findOne({ owner: req.user.userId });
      const word = req.body.word.toUpperCase();

      if (!wordsByUserId) {
        const newWord = new Words({
          owner: req.user.userId,
          words: [{ showTime: Date.now(), word }],
        });

        newWord.save();
        return res
          .status(200)
          .json({ message: "For user words has been created!" });
      }

      const words = wordsByUserId.words;
      const includes = words.some((item) => item.word === word);

      if (includes) {
        return res.status(400).json({
          message: "This word already exists!",
        });
      }

      words.push({ showTime: Date.now(), word });
      wordsByUserId.words = words.sort((a, b) => a.showTime - b.showTime);
      wordsByUserId.save();
      return res.status(200).json({ message: "New Word Added" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong, try again please!" });
    }
  }
);

module.exports = router;
