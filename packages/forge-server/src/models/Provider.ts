import { Schema, Document, model } from 'mongoose';
import { modelOptions } from '../utils/models';

export interface IProvider extends Document {
  createdAt: string;
  updatedAt: string;
  creatorId: string;
  domain: string;
  payload: object;
  toRecord: (extra?: object) => object;
}

const schema = {
  creatorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  domain: {
    type: String,
    enum: ['github', 'custom'],
    required: true,
  },
  payload: {
    type: Schema.Types.Mixed,
    required: true,
  },
};

const providerSchema = new Schema(schema, modelOptions);

providerSchema.method('toRecord', function toRecord(this: any, extra: object) {
  const { id, createdAt, updatedAt, creatorId } = this.toObject();
  return {
    id,
    createdAt,
    updatedAt,
    creatorId,
    ...(extra || {}),
  };
});

export default model<IProvider>('Provider', providerSchema);