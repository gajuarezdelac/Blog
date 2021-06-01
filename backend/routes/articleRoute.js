const express = require('express');
const router = express.Router();
const {isAuthenticatedUser,authorizeRoles} = require('../middlewares/auth');
const { 
    createArticle,
    getArticles,
    getSingleArticle,
    updateArticle,
    deleteArticle
}  = require('../controllers/articleController');

router.route('/articles').get(getArticles);
router.route('/article/new').post(isAuthenticatedUser,authorizeRoles('admin'),createArticle);

router.route('/article/:id')
         .get(getSingleArticle)
         .put(isAuthenticatedUser,authorizeRoles('admin'),updateArticle)
         .delete(isAuthenticatedUser,authorizeRoles('admin'),deleteArticle);
         
// router.route('/review').put(isAuthenticatedUser,createProductReview);
      
// router.route('/reviews')
//                  .get(isAuthenticatedUser,getProductsReviews)
//                  .delete(isAuthenticatedUser,deleteReview)   

module.exports = router;