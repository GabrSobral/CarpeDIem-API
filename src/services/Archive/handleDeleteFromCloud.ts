import { cloudinary } from "../../config/cloudinary"

class handleDeleteFromCloud {
  async execute(public_id: string){

    await cloudinary.uploader.destroy( public_id, {resource_type: 'video'},
      async (error, result) => {
        if(result.result == "not found"){
          await cloudinary.uploader.destroy( public_id,
            (error, result) => {
              if(error){ throw new Error(error.message) }
            }
          )
        }
      }
    )
  }
}
export default new handleDeleteFromCloud()