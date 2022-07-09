import {
  Post,
  Controller,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";

import { s3client_upload_file } from "@/utils/s3client_upload";

@Controller("/v1/system/")
export class SystemController {
  @Post("upload")
  @UseInterceptors(FileInterceptor("file"))
  async upload(@UploadedFile() file) {
    await s3client_upload_file({
      filename: file.originalname,
      filebuffer: file.buffer,
    });
    return `https://ewr1.vultrobjects.com/test-bucket-002/${file.originalname}`;
  }
}
