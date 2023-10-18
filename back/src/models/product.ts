import mongoose from 'mongoose';
import { CatDoc } from './category';
import { SubCatDoc } from './subcat';

interface ProductAttrs {
  name: string;
  cat: CatDoc;
  sub:SubCatDoc;
}

export interface ProductDoc extends mongoose.Document {
  name: string;
  cat: CatDoc;
  sub: SubCatDoc;
}

interface ProductModel extends mongoose.Model<ProductDoc> {
  build(attrs: ProductAttrs): ProductDoc;
}

const catSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  cat:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Cat',
    required:true
  },
  sub:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'SubCat',
    required:true
  }
},
);

catSchema.statics.build = (attrs: ProductAttrs) => {
  return new Product(attrs);
};

const Product = mongoose.model<ProductDoc, ProductModel>('Product', catSchema);

export { Product };
