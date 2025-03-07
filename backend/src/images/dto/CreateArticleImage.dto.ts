import { IsNotEmpty, IsNumber, IsObject, IsString } from "class-validator";
import { ArticleImage } from "src/entities/articleImage.entity";

export class CreateArticleImageDto extends ArticleImage {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  size: number;

  @IsString()
  @IsNotEmpty()
  type: string;
}
