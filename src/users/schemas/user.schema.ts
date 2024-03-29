import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  mobileNumber: string;

  @Prop({ default: 'Normal' })
  userHealthStatus: string;

  @Prop({ default: false })
  isVerified: boolean;

  @Prop({ default: Date.now(), required: false })
  createdAt: number;

  @Prop({ default: 'Member' })
  userType: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
