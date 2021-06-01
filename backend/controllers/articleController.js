const ArticleModel = require('../models/articleModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncErrors');
const ApiFeatures = require('../utils/apiFeatures');

// Images!!!!
const cloudinary = require('cloudinary');

// Create a new product =>  {{DOMAIN}}/api/v1/admin/product/new
exports.createArticle = catchAsyncError(async (req, res, next) => {

    if(!req.body.image){
        return next(new ErrorHandler('Image is required', 404));
    }
       
    const result = await await cloudinary.v2.uploader.upload(req.body.image,{
        folder: 'imageBlog',
        crop: 'scale'
    })

    const { title, subtitle, content, category } = req.body;

    article = await ArticleModel.create({
        title, 
        subtitle,
        content,
        category,
        user: req.user.id,
        image: {
            public_id: result.public_id,
            url: result.secure_url
        },
    });

    res.status(200).json({
     success: true,
     article
    });

})

// Get All product => {{DOMAIN}}/api/v1/product
exports.getArticles = catchAsyncError(async (req, res, next) => {

    const products = await ArticleModel.find();

    res.status(200).json({
        success: true, 
        products
    });

})

// Get single product details => {{DOMAIN}}/api/v1/product/6099cef67053da41a03936c5
exports.getSingleArticle = catchAsyncError(async (req, res, next) => {

    const article = await ArticleModel.findById(req.params.id);

    if(!article) {
        return next(new ErrorHandler('Product not found', 404));
    }
    
    res.status(200).json({
        success: true,
        article
    }); 
})

// Ipdate a product =>  {{DOMAIN}}/api/v1/admin/product/6099cef67053da41a03936c5
exports.updateArticle = catchAsyncError(async (req, res, next) => {

    const newArticleData = {
        title: req.body.title, 
        subtitle: req.body.subtitle,
        content: req.body.content,
    }
 
    let article = await ArticleModel.findById(req.params.id);

    if(!article) {
        return next(new ErrorHandler('Product not found', 404));
    }

    if (req.body.image !== '') {
        const article = await ArticleModel.findById(req.params.id)

        const image_id = article.image.public_id;
        const res = await cloudinary.v2.uploader.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req.body.image, {
            folder: 'avatars',
            width: 150,
            crop: "scale"
    })
    
    newArticleData.image = {
        public_id: result.public_id,
        url: result.secure_url
    }

  }
     
    articleRes = await ArticleModel.findByIdAndUpdate(req.params.id, newArticleData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        articleRes
    })

})

// Delete Product => {{DOMAIN}}/api/v1/admin/product/:id
exports.deleteArticle = catchAsyncError(async (req, res, next) => {
    
    const article = await ArticleModel.findById(req.params.id);

    if(!article) {
        return next(new ErrorHandler('Product not found', 404));
    }

    const image_id = article.image.public_id;
    await cloudinary.v2.uploader.destroy(image_id);
    
    await article.remove();

    res.status(200).json({
        success: true,
        msg: "Product is deleted"
    });
})