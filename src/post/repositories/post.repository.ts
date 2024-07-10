import { IPost } from '../schemas/models/post.interface';

export abstract class PostRepository {
  abstract getAllPost(limit: number, page: number): Promise<IPost[]>;
  abstract getPost(productId: string): Promise<IPost>;
  abstract createPost(post: IPost): Promise<void>;
  abstract updatePost(productId: string, post: string): Promise<void>;
  abstract deletePost(productId: string): Promise<void>;
}
