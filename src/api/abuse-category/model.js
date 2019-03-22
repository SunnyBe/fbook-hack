import mongoose, { Schema } from 'mongoose'

const abuseCategorySchema = new Schema({
  title: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

abuseCategorySchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('AbuseCategory', abuseCategorySchema)

export const schema = model.schema
export default model
