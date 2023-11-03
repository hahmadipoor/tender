import mongoose from 'mongoose';
import { UserDoc } from './user';
import { OfferingState } from '../types/offering-status';

interface OfferingAttrs {
  inquiry: OfferingDoc;
  owner: UserDoc;
  status?:OfferingState;
  bid:Number;
}

export interface OfferingDoc extends mongoose.Document {
  inquiry: OfferingDoc;
  owner: UserDoc;
  status?:OfferingState;
  bid:Number;
}

interface OfferingModel extends mongoose.Model<OfferingDoc> {
  build(attrs: OfferingAttrs): OfferingDoc;
}

const offeringSchema = new mongoose.Schema({
  inquiry: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Inquiry',
    required:true
  },
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  },
  status: {
    type: String,
    enum: Object.values(OfferingState),
    default: OfferingState.Pending
  },
  bid:{
    type:Number
  }
});

offeringSchema.statics.build = (attrs: OfferingAttrs) => {
  return new Offering(attrs);
};

const Offering = mongoose.model<OfferingDoc, OfferingModel>('Offering', offeringSchema);

export { Offering };
