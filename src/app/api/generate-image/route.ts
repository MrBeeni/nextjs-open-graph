import axios from "axios";
import sharp from "sharp";

export async function POST(request: Request) {
  console.log("first");

  try {
    const { searchParams } = new URL(request.url);

    const imageUrl = searchParams.get("imageUrl");

    // Fetch the image from the URL
    const response = await axios({
      url: imageUrl!,
      responseType: "arraybuffer",
    });

    // Convert WebP to JPG
    const jpgBuffer = await sharp(response.data).toFormat("jpeg").toBuffer();

    console.log(jpgBuffer);

    // Send a response indicating success
  } catch (error) {
    console.error("Error during image conversion:", error);
  }
}
