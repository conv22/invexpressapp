const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema (
    {
        name: {type: String, min: 3, max: 40, required: true},
        description: {type: String},
        category: {type: mongoose.Types.ObjectId, ref: 'Category', required: true},
        price: {type: Number},
        inStock: {type: Number}
    }
);

ItemSchema
.virtual('url')
.get(function () {
    return '/items/' + this._id
});

module.exports = mongoose.model('Item', ItemSchema);