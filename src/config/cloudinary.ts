import 'dotenv/config'
import { v2 as cloudinary } from 'cloudinary'
import { NextFunction, Request, Response } from "express";

const cloudinaryConfig = (request: Request, response: Response, next: NextFunction) => {
  cloudinary.config({
    cloud_name: "dmv19qtjb",
    api_key: "716997555334137",
    api_secret: "HGCguNY9v3_kkiScbRZb_fWtb6A",
    secure: true
  })

  next()
}
export { cloudinaryConfig, cloudinary }