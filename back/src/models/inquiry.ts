import mongoose from 'mongoose';
import { CatDoc } from './category';
import { SubCatDoc } from './subcat';
import { UserDoc } from './user';
import { ProductDoc } from './product';
import { InquiryState } from '../types/inquiry-status';

interface InquiryAttrs {
  product: ProductDoc;
  customer: UserDoc;
  status?:InquiryState;
}

export interface InquiryDoc extends mongoose.Document {
    product: ProductDoc;
    customer: UserDoc;
    status?:InquiryState;
}

interface InquiryModel extends mongoose.Model<InquiryDoc> {
  build(attrs: InquiryAttrs): InquiryDoc;
}

const inquirySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Product',
    required:true
  },
  customer:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  status: {
    type: String,
    enum: Object.values(InquiryState),
    default: InquiryState.Pending
  }
},
);

inquirySchema.statics.build = (attrs: InquiryAttrs) => {
  return new Inquiry(attrs);
};

const Inquiry = mongoose.model<InquiryDoc, InquiryModel>('Inquiry', inquirySchema);

export { Inquiry };
