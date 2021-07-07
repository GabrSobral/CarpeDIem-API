import multer from 'multer'
import path from 'path'
import { cloudinary, cloudinaryConfig } from './cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params : async (req, file) => {
    return {
      folder: 'uploads',
      public_id: `${Date.now()}-${file.originalname}`
    }
  }
})

export const parser = multer({ storage }).array('files');