import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";

import { Category } from "./category.entity";
import { User } from "./user.entity";
import { ArticleImage } from "./articleImage.entity";

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  title: string;

  @Column()
  body: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ default: false })
  isPublic: boolean;

  @Column({ default: false })
  isFeatured: boolean;

  @Column({ nullable: true })
  YTVideoId?: string;

  @OneToOne(() => ArticleImage, (image) => image.article, {
    cascade: ["insert", "insert", "recover", "remove", "soft-remove"],
  })
  @JoinColumn()
  image?: ArticleImage;

  @ManyToOne(() => User, (user) => user.articles, {
    cascade: ["insert", "insert", "recover", "remove", "soft-remove"],
  })
  author: User;

  @ManyToOne(() => Category, (category) => category.articles, {
    cascade: ["insert", "insert", "recover", "remove", "soft-remove"],
  })
  category: Category;
}
