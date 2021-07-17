import handleGetRepositories from "../../utils/handleGetRepositories";
import handleUploadFile from "./handleUploadFile";

interface ArchiveProps{
  files: Express.Multer.File;
}

class CreateArchiveService {
  async execute({ files }: ArchiveProps){
    if(!files) {throw new Error('No File detected status:400')}
    
    const { archiveRepository } = handleGetRepositories()

    const file_data = await handleUploadFile(files)

    const archive = archiveRepository.create({
      name: files.originalname, 
      size: files.size, 
      url: files.path, 
      format: file_data.format,
      duration: String(file_data.duration),
      public_id: file_data.public_id
    })
    await archiveRepository.save(archive)

    return archive
  }
}
export default new CreateArchiveService()