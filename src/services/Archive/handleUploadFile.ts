import { cloudinary } from "../../config/cloudinary";

class handleUploadFile {
  async execute(file: Express.Multer.File){
    cloudinary.uploader.upload(
      file.path,
      { resource_type: "auto", overwrite: true },
      (error, result) => {
        console.log(result)
        if(error) {throw new Error(`Error: ${error.message} status:500`)}
    });
  }
}
export default new handleUploadFile().execute