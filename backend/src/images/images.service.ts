import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { firebaseAdmin } from "firebase";
import { ArticleImage } from "src/entities/articleImage.entity";
import { Repository } from "typeorm";

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ArticleImage)
    private articleImageRepo: Repository<ArticleImage>,
  ) {}

  async getAllImages() {
    return await this.articleImageRepo.find();
  }

  async getImageById(id: number) {
    return await this.articleImageRepo.findOne({ where: { id } });
  }

  async getImageByName(name: string) {
    return await this.articleImageRepo.findOne({ where: { name } });
  }

  async uploadToStorage(
    image: Express.MulterFile,
  ): Promise<{ url: string; name: string }> {
    try {
      const sanitizedFilename = image.originalname.replace(
        /[^a-zA-Z0-9.\-_]/g,
        "",
      );
      const bucket = firebaseAdmin.storage().bucket();

      const newImagePath = bucket.file(`images/${sanitizedFilename}`);
      await newImagePath.save(image.buffer, {
        metadata: {
          contentType: image.mimetype,
        },
        public: true,
      });

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/images/${sanitizedFilename}`;

      const getImage = newImagePath.get();

      console.log("Get image:", getImage);

      if (getImage)
        return {
          url: publicUrl,
          name: sanitizedFilename,
        };
      else return null;
    } catch (err) {
      console.error("Error uploading image to Firebase:", err);
      throw err;
    }
  }

  async deleteByName(imageName: string) {
    try {
      const image = await this.getImageByName(imageName);

      const bucket = firebaseAdmin.storage().bucket();
      const deletedFile = await bucket.file(`images/${imageName}`).delete();

      console.log("Attempting to delete image from storage:", deletedFile);

      return await this.articleImageRepo.delete(image);
    } catch (err) {
      console.error("Error deleting image from Firebase:", err);
      throw err;
    }
  }

  async create(image: Express.MulterFile): Promise<ArticleImage> {
    try {
      const firebaseImage = await this.uploadToStorage(image);

      const imageObject: Partial<ArticleImage> = {
        name: firebaseImage.name,
        size: image.size,
        type: image.mimetype,
        url: firebaseImage.url,
      };

      const createdImage = this.articleImageRepo.create(imageObject);
      return await this.articleImageRepo.save(createdImage);
    } catch (err) {
      console.error("Error uploading image:", err);
      throw new Error("Error uploading image");
    }
  }
}
