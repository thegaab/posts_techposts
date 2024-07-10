import { Injectable } from '@nestjs/common';
import { PostRepository } from '../repositories/post.repository';
import { IPost } from '../schemas/models/post.interface';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async getAllPost(limit: number, page: number) {
    return this.postRepository.getAllPost(limit, page);
  }

  async getPost(productId: string) {
    return this.postRepository.getPost(productId);
  }

  async createPost(post: IPost) {
    return this.postRepository.createPost(post);
  }

  async updatePost(productId: string, post: string) {
    return this.postRepository.updatePost(productId, post);
  }

  async deletePost(productId: string) {
    return this.postRepository.deletePost(productId);
  }
}
