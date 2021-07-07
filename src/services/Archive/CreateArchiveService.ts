import { getCustomRepository } from "typeorm"
import { cloudinary } from "../../config/cloudinary";
import { ArchiveRepository } from "../../repositories/ArchiveRepository"
import fs from 'fs'

interface ArchiveProps{
  name: string;
  description?: string;
  author: string,
  files: Express.Multer.File
}

class CreateArchiveService {
  async execute({ name, author, description = null, files }: ArchiveProps){
    if(!files) throw new Error('No File detected status:400')

    if(!name) throw new Error('No name detected status:400')

    if(!author) throw new Error('No author detected status:400')
    
    const repository = getCustomRepository(ArchiveRepository)
    
    cloudinary.uploader.upload(
      files.path,
      { resource_type: "auto", overwrite: true },
      (error, result) => {
        if(error) throw new Error(`Error: ${error.message} status:500`)
    });

    const archive = repository.create({
      name, author, description, url: files.path
    })
    await repository.save(archive)

    return archive
  }
}
export default new CreateArchiveService()