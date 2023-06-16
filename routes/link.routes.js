const { Router } = require("express");
const Link = require("../models/Link");
const authMiddleware = require("../middleware/auth.middleware");
const shortid = require("shortid");
const router = Router();

router.post("/generate", authMiddleware, async (req, res) => {
  try {
    const baseUrl = process.env.baseUrl;
    const { from } = req.body;
    const code = shortid.generate();
    const isExist = await Link.findOne({ from });

    if (isExist) {
      return res.json({ link: isExist });
    }

    const to = baseUrl + "/t/" + code;
    const link = new Link({ code, to, from, owner: req.user.userId });
    await link.save();
    res.status(201).json({ link });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong...try please again!" });
  }
});

router.post("/delete", authMiddleware, async (req, res) => {
  try {
    await Link.deleteOne({ _id: req.body.linkId });
    const links = await Link.find({ owner: req.user.userId });
    res.status(201).json({ message: "Link has been removed!", links });
  } catch (error) {
    console.error(error);
  }
});

router.get("/", authMiddleware, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId }); // ???
    res.json(links);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong...try please again!" });
  }
});

router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id); //???
    res.json(link);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong...try please again!" });
  }
});

module.exports = router;
