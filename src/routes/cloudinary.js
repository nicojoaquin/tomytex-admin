const {Router} = require('express');
const cloudinary = require('cloudinary').v2
const fs = require('fs-extra');

const router = Router();

router.post('/', async (req, res) => {

  const img = req.files[0];

  try {
    const {url} = await cloudinary.uploader.upload(img.path);
    await fs.unlink(req.files[0].path)
    res.json({url})
  } catch (err) {
    console.warn(err);
  }
  

});

module.exports = router;