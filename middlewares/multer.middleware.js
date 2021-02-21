const multer = require('multer');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
uuidv4();
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/uploads'),
    filename: (req, file, cb) => {
        const extension = file.originalname.split('.')
        const fileFinal = `${uuidv4()}.${extension[extension.length -1]}`
        cb(null, fileFinal);
    }
});


const fileFilter = (req, file, cb) => {
    var filetypes = /jpeg|jpg|png|gif/;
    var mimetype = filetypes.test(file.mimetype);
    var extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }else{
        return cb(null, false)
    }
};

const upload = multer({
    dest: path.join(__dirname, '../public/uploads/'),
    fileFilter,
    storage,
})

module.exports = upload;
