let express = require("express");
const { getOffers, setOffer, deleteOffer, updateOffer } = require("../../Controllers/OfferController/offer");
let router = express.Router();


router.get("/getOffer",getOffers)
router.post("/setOffer",setOffer)
router.delete("/deleteOffer/:id",deleteOffer)
router.put("/updateOffer/:id",updateOffer)



module.exports = router;