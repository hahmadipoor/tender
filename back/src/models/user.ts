import mongoose from 'mongoose';
import { UserRole } from '../types/user-role';

interface UserAttrs {
  phone:string;
  name?: string;
  role?: UserRole;
}

export interface UserDoc extends mongoose.Document {
  phone:string;
  name?: string;
  role?: UserRole;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true
  },
  name: {
    type: String,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.Customer
  }
},
{
  toJSON:{
    transform(doc,ret){
      delete ret.password;
      delete ret.__v;
    }
  }
});

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
