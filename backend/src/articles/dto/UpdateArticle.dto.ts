import {
  IsBoolean,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
} from "class-validator";

import { Article } from "src/entities/article.entity";

export class UpdateArticleDto {
  @IsNumber()
  id: number;

  @IsString({ message: "Title must be a string" })
  @MaxLength(100, {
    message: "The title cannot contain more than 100 characters",
  })
  title: string;

  @IsString({ message: "The category name must be a string" })
  categoryName: string;

  @IsObject({ message: "Image must be an object" })
  imageAsFile?: Express.MulterFile;

  @IsString({ message: "The article body must be a string" })
  body: string;

  @IsString({ message: "The Youtube video ID must be a string" })
  YTVideoId?: string;

  @IsBoolean()
  isPublic: boolean;

  @IsBoolean()
  isFeatured: boolean;
}
