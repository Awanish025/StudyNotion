const mongoose = require("mongoose");

const RatingAndReviewSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Course",
    index: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  review: {
    type: String,
    required: true,
  },
});

const RatingAndReviews =
  mongoose.models.RatingAndReviews ||
  mongoose.model("RatingAndReviews", RatingAndReviewSchema);

if (!mongoose.models.RatingAndReview) {
  mongoose.model("RatingAndReview", RatingAndReviewSchema);
}

module.exports = RatingAndReviews;
