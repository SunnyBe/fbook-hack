import mongoose, { Schema } from 'mongoose'

const reportSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: String
  },
  title: {
    type: String
  },
  message: {
    type: String
  },
  category: {
    type: String
  },
  views: {
    type: String
  },
  isAnonymous: {
    type: String
  },
  isPublic: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

reportSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      assignedTo: this.assignedTo,
      title: this.title,
      message: this.message,
      category: this.category,
      views: this.views,
      isAnonymous: this.isAnonymous,
      isPublic: this.isPublic,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Report', reportSchema)

export const schema = model.schema
export default model
