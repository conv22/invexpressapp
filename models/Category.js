const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: {type: String, max: 40, min: 5, required: true},
        description: {type: String, max: 100, min: 5},
        image: {type: String}
    }
);

CategorySchema
.virtual('url')
.get(function () {
    return '/categories/' + this._id
});

module.exports = mongoose.model('Category', CategorySchema);