import mongoose from 'infrastructure/mongoose'

const schema = mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    index: true
  },
  provider: {
    type: String,
    required: true
  },
  identifier: {
    type: String,
    required: true,
    index: true
  },
  domain: {
    type: String,
    required: true
  },
  settings: {
    type: mongoose.Schema.Types.Mixed
  }
})


export default mongoose.model('Infrastructure', schema)
