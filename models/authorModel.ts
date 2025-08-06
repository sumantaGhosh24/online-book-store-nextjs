import {Schema, model, models} from "mongoose";

export interface IAuthor extends Document {
  _id: string;
  name: string;
  image: {
    url: string;
    public_id: string;
    blurHash: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const AuthorSchema = new Schema(
  {
    name: {type: String, required: true, unique: true},
    image: {url: String, public_id: String, blurHash: String},
  },
  {timestamps: true}
);

const AuthorModel = models?.Author || model<IAuthor>("Author", AuthorSchema);

export default AuthorModel;
