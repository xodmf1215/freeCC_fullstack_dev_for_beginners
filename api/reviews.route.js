import express from "express";
import ReviewsCtrl from "./reviews.controller.js"

const router = express.Router();

// req.url is not a native Express property, it is inherited from Node’s http module.
router.use((req,res,next) => {
  console.log(`Time:${Date.now()}\tpath:${req.path}\tbaseUrl:${req.baseUrl}\tUrl:${req.originalUrl}`);
  next();
})
// The app.mountpath property contains one or more path patterns on which a sub-app was mounted.
// When called from a middleware, the mount point is not included in req.path. See app.use() for more details.
router.route("/").get((req, res) => {res.send("helllo world")});

// ":id" is a variable
router.route("/movie/:id").get(ReviewsCtrl.apiGetReviews);
router.route("/new").post(ReviewsCtrl.apiPostReview);
router.route("/:id")
  .get(ReviewsCtrl.apiGetReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview);


export default router;
