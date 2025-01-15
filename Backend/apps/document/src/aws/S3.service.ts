import { Injectable, Logger } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsCommand,
} from '@aws-sdk/client-s3';
import { BucketName } from '@app/common/types/bucketName';

@Injectable()
export class S3Service {
  private readonly logger = new Logger(S3Service.name);
  private readonly s3Client: S3Client;
  private readonly bucketName: string;

  constructor() {
    const endpoint = process.env.MINIO_ENDPOINT;
    const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
    const useSSL = process.env.MINIO_USE_SSL === 'true';
    const region = process.env.AWS_REGION;
    this.bucketName = process.env.MINIO_BUCKET;

    this.s3Client = new S3Client({
      endpoint,
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
      forcePathStyle: true,
      tls: useSSL,
    });
  }

  async uploadFile(
    fileBuffer: Buffer,
    filename: string,
    mimeType: Express.Multer.File['mimetype'],
    bucketName: BucketName,
  ): Promise<void> {
    try {
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: filename,
          Body: fileBuffer,
          ContentType: mimeType,
        }),
      );

      this.logger.log(`File '${filename}' uploaded successfully`);
    } catch (error) {
      this.logger.error(`Failed to upload file '${filename}':`, error);
      throw error;
    }
  }

  async getFile(filename: string, bucketName: BucketName): Promise<Buffer> {
    try {
      const params = {
        Bucket: bucketName,
        Key: filename,
      };

      const data = await this.s3Client.send(new GetObjectCommand(params));

      const chunks = [];
      for await (const chunk of data.Body as any) {
        chunks.push(chunk);
      }
      return Buffer.concat(chunks);
    } catch (error) {
      this.logger.error(`Failed to get file '${filename}':`, error);
      throw error;
    }
  }

  async getFileNames(bucketName: BucketName): Promise<string[]> {
    try {
      const data = await this.s3Client.send(
        new ListObjectsCommand({
          Bucket: bucketName,
        }),
      );

      return data.Contents.map((object) => object.Key);
    } catch (error) {
      this.logger.error('Failed to get file names:', error);
      throw error;
    }
  }
}
