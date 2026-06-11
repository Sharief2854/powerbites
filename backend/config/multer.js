// const multer= require("multer")
// const  strorage = multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"/uploads")
//     },
//     filename:(req,file,cb)=>{
//      const uniuqeName= Date.now()+"-"+file.originalname
//      cb(null,uniuqeName)
//     } 
// })
// const upload = multer({
//     storage:strorage
// })
// module.exports = upload






const multer = require("multer")
const storage = multer.diskStorage({
    destination:(req,file,cb )=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        const uniqueName = Date.now() + "-" +file.originalname;
        cb(null,uniqueName)
    }
     }

)
     const uploads=multer({storage}) 

module.exports = uploads