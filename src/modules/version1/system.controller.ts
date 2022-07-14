// import { promisify } from "util";
import * as md5 from "md5";
import * as path from "path";
import image_size from "image-size";
import { FileInterceptor } from "@nestjs/platform-express";
/* prettier-ignore */
import {Post,Body,Controller,UploadedFile,UseInterceptors} from "@nestjs/common";

import { banner_fixed_length_width_ratio_enum } from "@/emuns/banner_fixed_length_width_ratio_enum";
import { message_card_length_width_ratio_enum } from "@/emuns/message_card_length_width_ratio_enum";
import { s3client_upload_file } from "@/utils/s3client_upload";

const bucket_prefix = "https://ewr1.vultrobjects.com/test-bucket-002/";

@Controller("/system/v1/")
export class SystemController {
  @Post("upload_message_card")
  @UseInterceptors(FileInterceptor("file"))
  async upload_message_card(@UploadedFile() file, @Body() fileds) {
    const { length_width_ratio } = fileds;
    if (!message_card_length_width_ratio_enum[length_width_ratio]) {
      throw new Error("请选择图片长宽比");
    }
    const { width, height } = image_size(file.buffer);
    if (message_card_length_width_ratio_enum[length_width_ratio] === "W25H3") {
      if (width / height !== 25 / 3) {
        throw new Error("图片长宽比应为25:3");
      }
    }
    if (message_card_length_width_ratio_enum[length_width_ratio] === "W1H1") {
      if (width / height !== 1 / 1) {
        throw new Error("图片长宽比应为1:1");
      }
    }
    const sign_file_name = md5(file.buffer);
    const origin_name_extendname = path.extname(file.originalname);
    const computed_filename = `${sign_file_name}${origin_name_extendname}`;
    await s3client_upload_file({
      filename: computed_filename,
      filebuffer: file.buffer,
    });
    return `${bucket_prefix}${computed_filename}`;
  }

  @Post("upload_banner_fixed")
  @UseInterceptors(FileInterceptor("file"))
  async upload_banner_fixed(@UploadedFile() file, @Body() fileds) {
    const { length_width_ratio } = fileds;
    if (!banner_fixed_length_width_ratio_enum[length_width_ratio]) {
      throw new Error("请选择图片长宽比");
    }
    const { width, height } = image_size(file.buffer);
    if (banner_fixed_length_width_ratio_enum[length_width_ratio] === "W25H7") {
      if (width / height !== 25 / 7) {
        throw new Error("图片长宽比应为25:7");
      }
    }
    const sign_file_name = md5(file.buffer);
    const origin_name_extendname = path.extname(file.originalname);
    const computed_filename = `${sign_file_name}${origin_name_extendname}`;
    await s3client_upload_file({
      filename: computed_filename,
      filebuffer: file.buffer,
    });
    return `${bucket_prefix}${computed_filename}`;
  }
}
