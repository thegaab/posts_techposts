import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IPost } from './models/post.interface';
import mongoose, { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema()
export class Post implements IPost {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  id?: string;
  @Prop()
  name: string;
  @Prop()
  content: string;
  @Prop()
  image_url: string;
  @Prop()
  relationalId: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
