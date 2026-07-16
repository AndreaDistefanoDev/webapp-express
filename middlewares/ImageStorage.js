const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/");
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        console.log(uniqueSuffix)
        console.log('File original name: ', file);
        cb(null, uniqueSuffix + "_" + file.originalname);
    },
});

const upload = multer({ storage: storage });

module.exports = upload;