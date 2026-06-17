const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "src/uploads/");
    },
    filename: function(req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    },
});

const fileFilter = (req, file, cb) => {
    if(!file || !file.originalname) {
        return cb(new Error("No file uploaded or invalid file."), false);
    };

    const allowedTypes = /jpeg|jpg|png/;

    const extname = allowedTypes.test(
        path.extname(file.originalname).toLowerCase()
    );

    const mimetype = allowedTypes.test(file.mimetype);

    if(extname && mimetype) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type. Only JPEG, JPG and PNG files are allowed."));
    }
};

const upload = multer({
    storage,
    fileFilter,
});

module.exports = upload;