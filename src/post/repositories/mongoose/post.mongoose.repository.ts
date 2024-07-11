import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { IPost } from 'src/post/schemas/models/post.interface';
import { Post } from 'src/post/schemas/post.schema';

@Injectable()
export class PostMongooseRepository {
  constructor(
    @InjectModel(Post.name) private readonly postModel: Model<Post>,
  ) {}

  async getAllPost(limit: number, page: number) {
    const skip = (page - 1) * limit;
    return this.postModel.find().limit(limit).skip(skip).exec();
  }

  async getPost(productId: string) {
    const objectId = new Types.ObjectId(productId);
    return this.postModel.findById(objectId).exec();
  }

  async createPost(post: IPost) {
    const createdPost = new this.postModel(post);
    return createdPost.save();
  }

  async updatePost(productId: string, post: Partial<IPost>) {
    const objectId = new Types.ObjectId(productId);
    return this.postModel
      .findByIdAndUpdate(objectId, post, { new: true })
      .exec();
  }

  async deletePost(productId: string) {
    const objectId = new Types.ObjectId(productId);
    return this.postModel.findByIdAndDelete(objectId).exec();
  }
}
