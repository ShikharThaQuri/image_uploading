import cloudinary from "./cloudinary";

export const UploadImage = async (buffer) => {
  return new Promise(async (resolve, reject) => {
    await cloudinary.uploader
      .upload_stream(
        {
          resource_type: "auto",
          folder: "nextjs-imageGallary",
        },
        async (err, result) => {
          if (err) {
            return reject(err.message);
          }
          return resolve(result);
        }
      )
      .end(buffer);
  });
};
