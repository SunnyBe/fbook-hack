import mongoose, { Schema } from 'mongoose'

const exampleEndpointSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    index: true
  },
  title: {
    type: String
  },
  message: {
    type: String
  },
  likes: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

exampleEndpointSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user,
      title: this.title,
      message: this.message,
      likes: this.likes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('ExampleEndpoint', exampleEndpointSchema)

export const schema = model.schema
export default model
