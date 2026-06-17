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

// async function setBanner(req, res) {
//     try{
//         const body = req.body;

//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ message: "At least one banner image is required." });
//         }

        // const imagePaths = req.files.map(file => `${req.protocol}://${req.get('host')}/${file.path}`);

//         const bannerData = {
//             ...body,
//             image: imagePaths
//         };

//         const newBanner = await bannerModel.create(bannerData);
//         if(!newBanner){
//             return res.status(400).json({
//                 message:"Something went wrong while creating the banner."
//             })
//         }
//         res.status(201).json({
//             message:"Banner added successfully",
//             newBanner
//         })
//     }
//     catch(err){
//         res.status(500).json({
//             message: "Error creating banner", error: err.message
//         })
//     }
    
// }


async function setProductBanner(req, res) {
    try{
        const productId = req.params.Id;
        const body = req.body;
        if(!body){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        let product = await productModel.findById(productId);

        if(!product){
            return res.status(404).json({
                message:"Product not found"
            })

        }

        let bannerData = {
            ...body,
            name: product.name,
            image: product.image,
            discount: product.discount
        };

        let banner = await bannerModel.create(bannerData);

        if (!banner) {
            return res.status(400).json({
                message: "Something went wrong while creating the banner."
            });
        }

        res.status(201).json({
            message: "Banner added successfully",
            banner
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
            updateData.image = req.files.map(file => `${req.protocol}://${req.get('host')}/${file.path}`);
        }

        if (!updateData.image) {
            return res.status(400).json({
                message: "Image is required"
            })
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

async function bannerStatus(req,res){
    try{
        let id = req.params.id;
        let status = req.body.status;
        if(!status){
            return res.status(400).json({
                message:"Status is required"
            })
        }
        let banner = await bannerModel.findById(id);

        if(!banner){
            return res.status(404).json({
                message:"Banner not found"
            })
        }
        if(banner.status === status){
            return res.status(400).json({
                message:`Banner is already in this ${banner.status} status`
            })
        }

        let result = await bannerModel.findByIdAndUpdate(id,{status},{new:true, runValidators:true})

        if(!result){
            return res.status(400).json({
                message:"Something went wrong while updating the status"
            })

        }

        res.status(200).json({
            message:"Status updated successfully",
            result
        })

       
    }
    catch(err){

    }
}



module.exports = { allBanners, setProductBanner, deleteBanner, updateBanner, bannerStatus};