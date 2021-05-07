const express = require('express');
const router = express.Router({ mergeParams: true });
const { isReviewAuthor, validateReview, isLoggedIn } = require('../middleware');
const reviews = require('../controllers/reviews');

//! models
const Review = require('../models/review');
const Campground = require('../models/campground');

//! Joi schema
const { reviewSchema } = require('../schemas.js');

//! utilities
const ExpressError = require('../utility/expressError');
const catchAsync = require('../utility/catchAsync');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;