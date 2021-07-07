import multer from 'multer'
import { cloudinary } from './cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    console.log(file)
    return {
      folder: 'uploads',
      public_id: `${Date.now()}-${file.originalname}`,
      resource_type: 'auto'
    }
  }
})
export const upload = multer({ storage: storage }).single('files');