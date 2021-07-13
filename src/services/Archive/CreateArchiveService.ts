import handleGetRepositories from "../../utils/handleGetRepositories";
import handleUploadFile from "./handleUploadFile";

interface ArchiveProps{
  name: string;
  description?: string;
  author: string,
  files: Express.Multer.File
}

class CreateArchiveService {
  async execute({ name, author, description = null, files }: ArchiveProps){
    if(!files) {throw new Error('No File detected status:400')}

    if(!name) {throw new Error('No name detected status:400')}

    if(!author) {throw new Error('No author detected status:400')}
    
    const { archiveRepository } = handleGetRepositories()

    const file_data = await handleUploadFile(files)

    const archive = archiveRepository.create({
      name, 
      author, 
      description, 
      url: files.path, 
      format: file_data.format,
      duration: String(file_data.duration)
    })
    await archiveRepository.save(archive)

    return archive
  }
}
export default new CreateArchiveService()