const Item = require('./../models/Item');
const Category = require('./../models/Category');
const { findById } = require('./../models/Item');
const { body,validationResult } = require('express-validator');
const upload = require('./../upload');


exports.item_list = async (req, res) => {
    try {
        const items = await Item.find({}).populate('category').lean();
        res.render('items_page', {title: 'All items', items: items})
    } catch (err) {
        console.log(err)
    }
};

exports.item_detail = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('category').lean();
        res.render('item_details', {title: item.name, item: item});
    } catch (err) {
        console.log(err);
    }
};

exports.item_create_get = async (req, res) => {
    try {
        const categories = await Category.find({}).lean();
        res.render('create_form', {title: 'Add item', categories: categories});

    } catch (err) {
        console.log(err);
    }
 };

 exports.item_create_post = (req, res) => {
    body('name', 'Empty name').trim().isLength({ min: 1 }).escape(),
    body('description', 'Description should not be empty').trim().isLength({min: 1}).escape(),
    body('price').trim().escape(),
    body('inStock').trim().escape();
     try {
         upload(req, res, (err) => {
             if (err) console.log (err);
             Category.findById(req.body.category, (err, result) => {
                 if (err) console.log(err);
                 const newItem = new Item ({
                    name: req.body.name,
                    description: req.body.description,
                    category: result,
                    price: req.body.price,
                    inStock: req.body.inStock,
                    image: req.file ? req.file.path : 'uploads/no_image.png'
                });
                newItem.save((err, data) => {
                    if (err) console.log(err);
                    res.redirect('/items')
                });
                });

             });
     } catch (err) {
         console.log (err);
     }
 };

 exports.item_delete_get = async (req, res) => {
     try {
         const item = await Item.findById(req.params.id).lean();
         res.render('item_delete', {title: 'Delete' + item.name, item: item})
         } catch (err) {
         console.log(err);   
     }
 };
 
 exports.item_delete_post = async (req, res) => {
     try {
         await Item.findByIdAndRemove(req.params.id);
         res.redirect('/items');
     } catch (err) {
         console.log(err);
     }
 };

 exports.item_update_get = async (req, res) => {
     try {
         const categories = await Category.find({}).lean();
         const item = await Item.findById(req.params.id).populate('category').lean();
         res.render('item_update', {title: 'Update' + item.name, item: item, categories: categories});
     } catch (err) {
         console.log(err);
     }
};

exports.item_update_post = async (req, res) => {
    try {
        const category = await Category.findById(req.body.category).lean();
        const newItem =  new Item ({
            name: req.body.name,
            description: req.body.description,
            category: category,
            price: req.body.price,
            inStock: req.body.inStock,
            _id: req.params.id
        });
        await Item.findByIdAndUpdate(req.params.id, newItem, (err, result) => {
            if (err) console.log(err);
            res.redirect('/items');
        })

    } catch (err) {
        console.log(err);
    }
}
    