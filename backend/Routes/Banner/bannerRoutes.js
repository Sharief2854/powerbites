const express = require('express');
const { allBanners, setBanner } = require('../../Controllers/BannersController');

const router = express.Router()


router.get("/allBanners", allBanners)
router.post("/setBanner", setBanner)


module.exports = router;