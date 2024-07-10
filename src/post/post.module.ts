import { Module, Post } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostSchema } from './schemas/post.schema';
import { PostRepository } from './repositories/post.repository';
import { PostMongooseRepository } from './repositories/mongoose/post.mongoose.repository';
import { PostService } from './services/post.service';

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
})
export class PostModule {}
