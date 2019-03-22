import mongoose, { Schema } from 'mongoose'

const reportSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  message: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    default: ''
  },
  views: {
    type: String,
    default: ''
  },
  isAnonymous: {
    type: String,
    default: ''
  },
  isPrivate: {
    type: String,
    default: ''
  },
  contactMethod: {
    type: String,
    default: ''
  },
  victim: {
    type: String,
    default: null
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
      isPrivate: this.isPrivate,
      contactMethod: this.contactMethod,
      victim: this.victim,
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
