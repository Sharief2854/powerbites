const bannerModel = require("../../Model/bannerSchema");




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
        const body = req.body;

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "At least one banner image is required." });
        }

        const imagePaths = req.files.map(file => file.path);

        const bannerData = {
            ...body,
            image: imagePaths
        };

        const newBanner = await bannerModel.create(bannerData);
        if(!newBanner){
            return res.status(400).json({
                message:"Something went wrong while creating the banner."
            })
        }
        res.status(201).json({
            message:"Banner added successfully",
            newBanner
        })
    }
    catch(err){
        res.status(500).json({
            message: "Error creating banner", error: err.message
        })
    }
    
}
async function deleteBanner(req, res) {
    try {
        let id = req.params.id;
        let banner = await bannerModel.findByIdAndDelete(id);
        if (!banner) {
            return res.status(400).json({
                message: "Banner not found"
            })
        }
        res.status(200).json({
            message: "Banner deleted successfully",
            banner
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

async function updateBanner(req,res){
    try{
        let id = req.params.id;
        const updateData = { ...req.body };

        if (req.files && req.files.length > 0) {
            const imagePaths = req.files.map(file => file.path);
            updateData.image = imagePaths;
        }

        let banner = await bannerModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if(!banner){
            return res.status(404).json({
                message:"Banner not found"
            })
        }

        res.status(200).json({
            message:"Banner updated successfully",
            banner
        })
    }
    catch(err){
        res.status(500).json({
            message: "Error updating banner", error: err.message
        })
    }
}



module.exports = { allBanners, setBanner, deleteBanner, updateBanner };