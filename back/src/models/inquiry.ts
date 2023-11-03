import mongoose from 'mongoose';
import { CatDoc } from './category';
import { SubCatDoc } from './subcat';
import { UserDoc } from './user';
import { ProductDoc } from './product';
import { InquiryState } from '../types/inquiry-status';
import { OfferingDoc } from './offering';

interface InquiryAttrs {
  product: ProductDoc;
  customer: UserDoc;
  status?:InquiryState;
  address?:string;
  offers?:OfferingDoc[];
}

export interface InquiryDoc extends mongoose.Document {
    product: ProductDoc;
    customer: UserDoc;
    status?:InquiryState;
    address?:string;
    offers?:OfferingDoc[];
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
  },
  address: {
    type: String,
  },
  offers: [
    {
      type : mongoose.Schema.Types.ObjectId, 
      ref : 'Offering'
    }
  ],
},
);

inquirySchema.statics.build = (attrs: InquiryAttrs) => {
  return new Inquiry(attrs);
};

const Inquiry = mongoose.model<InquiryDoc, InquiryModel>('Inquiry', inquirySchema);

export { Inquiry };
