import mongoose, { mongo } from 'mongoose';
import { CatDoc } from './category';

interface SubCatAttrs {
  name: string;
  parent:CatDoc;
}

export interface SubCatDoc extends mongoose.Document {
  name: string;
  parent:CatDoc
}

interface SubCatModel extends mongoose.Model<SubCatDoc> {
  build(attrs: SubCatAttrs): SubCatDoc;
}

const subcatSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Cat',
    required:true
  },
},
);

subcatSchema.statics.build = (attrs: SubCatAttrs) => {
  return new SubCat(attrs);
};

const SubCat = mongoose.model<SubCatDoc, SubCatModel>('SubCat', subcatSchema);

export { SubCat };
