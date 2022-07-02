import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export const s3client = new S3Client({
  region: "ewr1",
  endpoint: "https://ewr1.vultrobjects.com/",
  credentials: {
    accessKeyId: "LPPO2YQUG513G7ILHPP0",
    secretAccessKey: "Jap3JeUiGkdECllQ1Wms3SDvruXj9CiDbzOsJ7KF",
  },
});

export async function s3client_upload_file({ filename, filebuffer }) {
  const upload_command = new PutObjectCommand({
    ACL: "public-read",
    Bucket: "test-bucket-002",
    Key: filename,
    Body: filebuffer,
  });
  const upload_result = await s3client.send(upload_command);
  return upload_result;
}
