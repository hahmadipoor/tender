import mongoose from 'mongoose';

interface CatAttrs {
  name: string;
}

export interface CatDoc extends mongoose.Document {
  name: string;
}

interface CatModel extends mongoose.Model<CatDoc> {
  build(attrs: CatAttrs): CatDoc;
}

const catSchema = new mongoose.Schema({
  name: {
    type: String,
  }
},
);

catSchema.statics.build = (attrs: CatAttrs) => {
  return new Cat(attrs);
};

const Cat = mongoose.model<CatDoc, CatModel>('Cat', catSchema);

export { Cat };
