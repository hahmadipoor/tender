import mongoose from 'mongoose';

// An interface that describes a User object  
// that is going to be inserted in the database
interface VerificationAttrs {
  code: string;
  phone: string;
}

// An interface that describes a User document 
// that is going to be fetched from the database
interface VerificationDoc extends mongoose.Document {
  code: string;
  phone: string;
}

// An interface that has a build() method that describes
// how to build a user document from a user object 
interface VerificationModel extends mongoose.Model<VerificationDoc> {
  build(attrs: VerificationAttrs): VerificationDoc;
}

const verificationSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  createdAt:{
    type:Date,
    default:Date.now,
    index:{expires:180}
  }
});

verificationSchema.statics.build = (attrs: VerificationAttrs) => {
  return new Verification(attrs);
};

const Verification = mongoose.model<VerificationDoc, VerificationModel>('Verification', verificationSchema);

export { Verification };
