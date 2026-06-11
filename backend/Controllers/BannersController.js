



async function allBanners(req, res) {
    try {

        let banners = await bannerModel.find();
        if (!banners) {
            return res.status(400).json({
                message: "No banners found"
            })
        }
        res.status(200).json({
            message: "Banners fetched successfully",
            banners
        })

    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })

    }

}

async function setBanner(req, res) {
    try{
        let body = req.body;

        let newBanner = await bannerModel.create(body);
        if(!newBanner){
            return res.status(400).json({
                message:"Something went wrong"
            })
        }
        res.status(200).json({
            message:"Banner added successfully",
            newBanner
        })

    }
    catch(err){

        res.status(500).json({
            message: err.message
        })
    }
    
}


module.exports = { allBanners, setBanner };