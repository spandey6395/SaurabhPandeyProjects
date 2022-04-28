const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const BlogSchema = new mongoose.Schema({

    title: { type: String, required: true },
    body: { type: String, required: true },
    author_id: { type: ObjectId, ref: "AuthorCollection" },
    tags: [String],
    category: {
        type: String,
        required: true,
        enum: ['technology', 'entertainment', 'life style', 'food', 'fashion','Book']
    },
    subcategory: [String],
    isPublished:{ type:Boolean, default: false },
    publishedAt:{ type: Date, default: null },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  
}, { timestamps: true })


module.exports = mongoose.model('BlogCollection', BlogSchema)
