import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { z } from 'zod';
import { ZodValidationPipe } from 'src/shared/pipe/zod-validation.pipe';

const createPostSchema = z.object({
  name: z.string(),
  content: z.string(),
  image_url: z.string(),
  relationalId: z.string(),
});

const updatePostSchema = z.object({
  content: z.string(),
});

type CreatePost = z.infer<typeof createPostSchema>;
type UpdatePost = z.infer<typeof updatePostSchema>;

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPost(@Query('limit') limit: number, @Query('page') page: number) {
    return this.postService.getAllPost(limit, page);
  }
  @Get(':postId')
  async getPost(@Param('postId') postId: string) {
    return this.postService.getPost(postId);
  }

  @UsePipes(new ZodValidationPipe(createPostSchema))
  @Post()
  async createPost(
    @Body() { name, content, image_url, relationalId }: CreatePost,
  ) {
    return this.postService.createPost({
      name,
      content,
      image_url,
      relationalId,
    });
  }

  @Put(':postId')
  async updatePost(
    @Param('postId') postId: string,
    @Body(new ZodValidationPipe(updatePostSchema)) { content }: UpdatePost,
  ) {
    return this.postService.updatePost(postId, content);
  }

  @Delete(':postId')
  async deletePost(@Param('postId') postId: string) {
    return this.postService.deletePost(postId);
  }
}
