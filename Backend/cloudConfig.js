
// const cloudinary = require('cloudinary').v2;
// // const { allow } = require('joi');
// const multer = require("multer");
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUD_API_KEY,
//     api_secret: process.env.CLOUD_API_SECRET
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'SrgcHostel',
//     allowedFormates: ["png", "jpg", "jpeg", "pdf"],
//     resource_type: 'auto',
//   },
// });

// const upload = multer({ storage });
// module.exports = {
//     cloudinary,
//     upload,
// }

// // const upload = multer({ storage });
// // export default upload;



// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.CLOUD_API_KEY,
//   api_secret: process.env.CLOUD_API_SECRET,
// });

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     let folder = "SrgcHostel";

//     // Agar file PDF hai → raw resource type
//     if (file.mimetype === "application/pdf") {
//       return {
//         folder,
//         resource_type: "raw",
//         format: "pdf",
//       };
//     }

//     // Agar image hai → image resource type
//     return {
//       folder,
//       allowed_formats: ["jpg", "jpeg", "png"],
//       resource_type: "image",
//     };
//   },
// });

// const multer = require("multer");
// const upload = multer({ storage });

// module.exports = { cloudinary, upload };


const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// ✅ Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ✅ Multer Storage Setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    const folder = "SrgcHostel"; // common folder for all uploads

    // Handle PDF separately (raw resource)
    if (file.mimetype === "application/pdf") {
      return {
        folder,
        resource_type: "raw",
        format: "pdf",
        public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}`, // nice clean name
      };
    }

    // Default: handle images
    return {
      folder,
      allowed_formats: ["jpg", "jpeg", "png"],
      resource_type: "image",
      public_id: `${Date.now()}-${file.originalname.replace(/\.[^/.]+$/, "")}`,
    };
  },
});

// ✅ Multer upload middleware
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    // Allow only PDF or image
    if (
      file.mimetype === "application/pdf" ||
      file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF and image files are allowed!"), false);
    }
  },
});

module.exports = { cloudinary, upload };
