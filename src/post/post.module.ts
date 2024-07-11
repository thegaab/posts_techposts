import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { PostRepository } from './repositories/post.repository';
import { PostMongooseRepository } from './repositories/mongoose/post.mongoose.repository';
import { PostService } from './services/post.service';
import { PostController } from './controllers/post.controller';
import { Post } from './schemas/post.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [
    {
      provide: PostRepository,
      useClass: PostMongooseRepository,
    },
    PostService,
  ],
  controllers: [PostController],
})
export class PostModule {}
