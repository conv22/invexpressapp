const Category = require('./../models/Category');
const Item = require('./../models/Item');
exports.category_list = async (req, res) => {
    try {
        const categories = await Category.find({}).lean();
        res.render('index', {title: 'Main page', categories: categories});
    }
    catch (err) {
        console.log(err);
    }
};

exports.category_detail = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id).lean();
        const items = await Item.find({category: category}).populate('category').lean();
        res.render('category_detail', {title: category.name, items: items})
    }
    catch (err) {
        console.log(err);
    }
};