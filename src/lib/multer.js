import multer from "multer";
// import path from "path";

console.log("hello");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(file);
    cb(null, "./src/imgs");
  },
  filename: function (req, file, cb) {
    console.log(file);
    cb(null, new Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimtype === "image/jpeg" ||
    file.mimtype === "image/jpg" ||
    file.mimtype === "image/png"
  ) {
    cb(null, true);
  } else {
    {
      ("Unsupported file format. Upload only JPEG/JPG or PNG");
    }
    false;
  }
};

const upload = multer({
  storage: storage,
  limits: { fieldSize: 1024 * 1024 },
  fileFilter,
});

export default upload;
