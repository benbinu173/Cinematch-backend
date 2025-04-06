const multer = require('multer')

// disk storage 
// 

const storage = multer.diskStorage({
    destination : (req,file,callback)=>
    {
        callback(null , './uploads')
    },

    //here the filename can be explained when we upload the file or any imge our filname shud contain image tht is the images name followed by date followed by original filename of the image 

    filename : (req , file , callback) =>
    {
        // returns the number of milliseconds elapsed since midnight , jan 1 1970 universal Coordinated time (utc)
        
        const filename = `image - ${Date.now()} -- ${file.originalname}`
        callback(null , filename)
    }
})


// file filter
// here in file filter our aim is to upload the images which has only jpg , jpeg and png files. 


const fileFilter = (req, file , callback) =>
{
    if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg'  ||  file.mimetype == 'image/jpeg')
    {
        // its true when the uploding file is of any 3 types 
        callback(null , true)
    }
    else
    {
        // is false when the uploading file is not of the 3 file types
        callback(null, false)

        return callback(new Error ('only jpg , jpeg and png files are only accepted here'))
    }
}

const multerConfig = multer ({
    storage , 
    fileFilter
})

module.exports = multerConfig