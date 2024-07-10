import { IPost } from 'src/post/schemas/models/post.interface';
import { PostRepository } from '../post.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from 'src/post/schemas/post.schema';
import { Model } from 'mongoose';

export class PostMongooseRepository implements PostRepository {
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}

  getAllPost(limit: number, page: number): Promise<IPost[]> {
    const offset = (page - 1) * limit;
    return this.postModel.find().skip(offset).limit(limit).exec();
  }

  getPost(productId: string): Promise<IPost> {
    return this.postModel.findById(productId).exec();
  }

  async createPost(post: IPost): Promise<void> {
    const createPost = new this.postModel(post);

    await createPost.save();
  }
  async updatePost(productId: string, post: string): Promise<void> {
    await this.postModel
      .updateOne({ _id: productId }, { content: post })
      .exec();
  }
  async deletePost(productId: string): Promise<void> {
    await this.postModel.deleteOne({ _id: productId }).exec();
  }
}
