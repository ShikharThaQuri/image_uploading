// import upload from "@/lib/multer";
import { UploadImage } from "@/lib/upload_image";

import photo from "@/lib/models/photos";
import connectDb from "@/lib/db/connect";

export async function POST(req) {
  try {
    try {
      await connectDb();
    } catch (error) {
      return Response.json({ success: false, msg: "Connection Error" });
    }

    const formData = await req.formData();
    const image = formData.get("image");

    if (!image) {
      return Response.json({ success: false, msg: "There is no file." });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const data = await UploadImage(buffer);

    const newPhoto = new photo({
      image_url: data?.secure_url,
      public_id: data?.public_id,
    });

    const result = await newPhoto.save();
    return Response.json(
      { success: true, msg: "Successfully added", data },
      {
        status: 201,
      }
    );
  } catch (error) {
    return Response.json({ success: false, msg: error }, { status: 400 });
  }
}

export async function GET(req) {
  try {
    try {
      await connectDb();
    } catch (error) {
      return Response.json(
        { success: false, msg: "Connection Error" },
        { status: 404 }
      );
    }

    const result = await photo.find({});
    return Response.json({
      success: true,
      msg: "You are Successful",
      result,
      total: result.length,
    });
  } catch (error) {
    return Response.json({ success: false, msg: error }, { status: 400 });
  }
}

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };
