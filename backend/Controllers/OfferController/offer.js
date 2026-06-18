
const offerModel = require("../../Model/offerModel");

async function getOffers(req,res){
    try{

        let offers = await offerModel.find();

        if(!offers){
            return res.status(400).json({
                message:"No offers found"
            })

        }
        res.status(200).json({
            message:"Offers fetched successfully",
            offers
        })



    }
    catch(err){
       res.status(500).json({
        message:"Internal Server Error",
        error:err.message
       })
    
    
    }

}
async function setOffer(req,res){
    try{

        let body = req.body;

        let offer = await offerModel.create(body);

        if(!offer){
            return res.status(400).json({
                message:"Something went wrong"
            })
        }
        res.status(200).json({
            message:"Offer created successfully",
            offer
        })

    

    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    
    }

}

async function deleteOffer(req,res){
    try{

        let id = req.params.id;

        let offer = await offerModel.findByIdAndDelete(id);

        if(!offer){
            return res.status(400).json({
                message:"Offer not found"
            })
        }
        res.status(200).json({
            message:"Offer deleted successfully",
            offer
        })

    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }

}

async function updateOffer(req,res){
    try{

        let id = req.params.id;
        let body = req.body;

        let offer = await offerModel.findByIdAndUpdate(id,body,{new:true,runValidators:true});

        if(!offer){
            return res.status(400).json({
                message:"Offer not found"
            })
        
        }

        res.status(200).json({
            message:"Offer updated successfully",
            offer
        })

    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    
    }
}

async function updateStatus(req,res){
    try{
        let id = req.params.id;
        let status = req.body.status;

        let updatedStatus = await offerModel.findByIdAndUpdate(id,{status},{new:true});

        if(!updatedStatus){
            return res.status(400).json({
                message:"Offer not found"
            })
        }

        res.status(200).json({
            message:"Status updated successfully",
            status: updatedStatus
        })

    }
    catch(err){
        res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
}

module.exports = {getOffers,setOffer,deleteOffer,updateOffer,updateStatus}