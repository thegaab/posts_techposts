import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PostService } from '../services/post.service';
import { IPost } from '../schemas/models/post.interface';

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

  @Post()
  async createPost(@Body() post: IPost) {
    return this.postService.createPost(post);
  }

  @Put(':postId')
  async updatePost(
    @Param('postId') postId: string,
    @Body('content') content: string,
  ) {
    return this.postService.updatePost(postId, content);
  }

  @Delete(':postId')
  async deletePost(@Param('postId') postId: string) {
    return this.postService.deletePost(postId);
  }
}
