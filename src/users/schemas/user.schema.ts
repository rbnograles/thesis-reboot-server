import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  mobileNumber: string;

  @Prop()
  userHealthStatus: string;

  @Prop()
  isVerified: boolean;

  @Prop()
  createdAt: Date;

  @Prop()
  userType: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
