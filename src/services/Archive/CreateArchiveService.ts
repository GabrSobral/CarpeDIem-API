import { getCustomRepository } from "typeorm"
import { cloudinary } from "../../config/cloudinary";
import { ArchiveRepository } from "../../repositories/ArchiveRepository"
import fs from 'fs'

interface ArchiveProps{
  name: string;
  description?: string;
  author: string,
  files: Express.Multer.File[]
}

class CreateArchiveService {
  async execute({ name, author, description = null, files }: ArchiveProps){
    const repository = getCustomRepository(ArchiveRepository)

    if(files.length !== 1){
      throw new Error("There are more than 1 archive")
    }

    cloudinary.uploader.upload(
      files[0].path, 
      { resource_type: "video", overwrite: true }
    );

    const archive = repository.create({
      name, author, description, url: files[0].path
    })
    await repository.save(archive)

    return archive
  }
}
export default new CreateArchiveService()