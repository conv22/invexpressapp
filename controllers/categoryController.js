const Category = require('./../models/Category');
const Item = require('./../models/Item');
const upload = require('./../upload');
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

exports.category_create_get = (req, res) => res.render('category_form', {title: 'Category form'});

exports.category_create_post = async (req, res) => {
    try {
        upload(req, res, (err) => {
            if (err) console.log(err);
            const category = new Category({
                name: req.body.name,
                description: req.body.description,
                image: req.file ? req.file.path : 'uploads/no_image.png'
            });
            category.save((err, result) => {
                if (err) console.log(err);
                console.log(category);
                res.redirect('/categories');
            })
        }) 
    } catch (err) {
        console.log(err)
    }
}