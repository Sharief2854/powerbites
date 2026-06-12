const express = require('express');
const { allBanners, setBanner, deleteBanner, updateBanner, bannerStatus } = require('../../Controllers/BannerController/Banners');
const upload = require('../../config/multerConfig');

const router = express.Router()


router.get("/allBanners", allBanners)
router.post("/setBanner", upload.array("file", 5), setBanner)
router.delete("/deleteBanner/:id", deleteBanner)
router.put("/updateBanner/:id", upload.array("file", 5), updateBanner)
router.put("/bannerStatus/:id", bannerStatus)



module.exports = router;