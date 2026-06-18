let express = require("express");
const { getOffers, setOffer, deleteOffer, updateOffer, updateStatus } = require("../../Controllers/OfferController/offer");
const isAdmin = require("../../MiddleWare/adminAuth");
let router = express.Router();


router.get("/getOffer",getOffers)
router.post("/setOffer",isAdmin,setOffer)
router.delete("/deleteOffer/:id",isAdmin,deleteOffer)
router.put("/updateOffer/:id",isAdmin,updateOffer)
router.put("/updateStatus/:id",isAdmin,updateStatus)



module.exports = router;