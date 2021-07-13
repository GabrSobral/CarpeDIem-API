import { cloudinary } from "../../config/cloudinary";

class handleUploadFile {
  async execute(file: Express.Multer.File){
    const file_data = await cloudinary.uploader.upload(
      file.path,
      { resource_type: "auto", overwrite: true },
      (error, result) => {
        if(error) {throw new Error(`Error: ${error.message} status:500`)}
      });
      console.log(file_data)
    
    return file_data
  }
}
export default new handleUploadFile().execute