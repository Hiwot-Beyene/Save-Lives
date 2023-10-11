const express = require("express");
const router = express.Router();
const Users = require("../schema");
const Posts = require("../postSchema");
const ApprovedPosts = require("../approvedPostSchema");
const { verifyRequestMiddleWare } = require("../Authentication/auth");
const { json } = require("express");
const Hospital = require("../HospitalSchema");
const Blogs = require("../blogsSchema");
const Ban = require("../banSchema");
require("dotenv").config();
router.route("/posts").get(verifyRequestMiddleWare, async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(200).json({ success: false, msg: "Unauthorized" });
    }
    const posts = await Posts.find({});
    if (!posts) {
      return res.status(200).json({ success: false, msg: "No post available" });
    }
    return res.status(200).json({ success: true, posts: posts });
  } catch (err) {
    return res.status(200).json({ success: false, msg: "Try again!" });
  }
});

router
  .route("/verifiedposts")
  .get(verifyRequestMiddleWare, async (req, res) => {
    try {
      if (!req.isAdmin) {
        return res.status(200).json({ success: false, msg: "Unauthorized" });
      }
      const approvedPosts = await ApprovedPosts.find({});
      if (!approvedPosts || approvedPosts.length === 0) {
        return res
          .status(200)
          .json({ success: false, msg: "No approved posts available" });
      }
      return res.status(200).json({ success: true, approvedPosts });
    } catch (err) {
      return res.status(200).json({ success: false, msg: "Try again!" });
    }
  })
  .post(verifyRequestMiddleWare, async (req, res) => {
    try {
      if (!req.isAdmin) {
        return res.status(200).json({ success: false, msg: "Unauthorized" });
      }

      const {
        username,
        age,
        dueDate,
        gender,
        moneyAsked,
        paidAmount,
        disease,
        hospitalAccount,
        hospitalName,
      } = req.body;

      if (
        !username ||
        !age ||
        !dueDate ||
        !gender ||
        !moneyAsked ||
        !disease ||
        typeof paidAmount === "undefined" ||
        !hospitalAccount ||
        !hospitalName
      ) {
        return res.status(200).json({ success: false, msg: "Invalid Input" });
      }

      const post = await Posts.findOne({ username: username });
      const approvedPost = await ApprovedPosts.findOne({ username: username });

      if (!post) {
        return res
          .status(200)
          .json({ success: false, msg: "user or post not found!" });
      }

      if (approvedPost) {
        return res
          .status(200)
          .json({ success: false, msg: "Already Approved!" });
      }

      if (
        post.username !== username ||
        post.age !== age ||
        post.dueDate !== dueDate ||
        post.gender !== gender ||
        post.moneyAsked !== moneyAsked ||
        post.disease !== disease ||
        post.paidAmount !== paidAmount ||
        post.hospitalAccount !== hospitalAccount ||
        post.hospitalName !== hospitalName
      ) {
        return res.status(200).json({ success: false, msg: "Failed" });
      }

      await ApprovedPosts.create({
        username: username,
        age: age,
        dueDate: dueDate,
        gender: gender,
        moneyAsked: moneyAsked,
        disease: disease,
        paidAmount: paidAmount,
        hospitalAccount: hospitalAccount,
        hospitalName: hospitalName,
      });

      await Posts.deleteOne({ username: username });
      return res.status(200).json({
        success: true,
        approvedPost: {
          username: username,
          age: age,
          dueDate: dueDate,
          gender: gender,
          moneyAsked: moneyAsked,
          disease: disease,
          paidAmount: paidAmount,
          hospitalAccount: hospitalAccount,
          hospitalName: hospitalName,
        },
      });
    } catch (err) {
      return res.status(200).json({ success: false, msg: "Failed!" });
    }
  });
router
  .route("/verifedposts/:username")
  .delete(verifyRequestMiddleWare, async (req, res) => {
    try {
      if (!req.isAdmin) {
        return res.status(200).json({ success: false, msg: "Unauthorized" });
      }
      const { username } = req.params;

      const userPost = await Posts.findOne({ username: username });

      if (!userPost) {
        const userApprovedPost = await ApprovedPosts.findOne({
          username: username,
        });

        if (!userApprovedPost) {
          return res
            .status(200)
            .json({ success: false, msg: "post not found!" });
        }
        await ApprovedPosts.deleteOne({ username: username });
        return res.status(200).json({ success: true });
      }
      await Posts.deleteOne({ username: username });
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(200).json({ success: false, msg: "Failed!" });
    }
  })
  .post(verifyRequestMiddleWare, async (req, res) => {
    try {
      if (!req.isAdmin) {
        return res.status(200).json({ success: false, msg: "Unauthorized" });
      }
      const { username, hospitalAccount, hospitalName, moneyPaid } = req.body;
      await ApprovedPosts.deleteOne({ username: username });
      const hospital = await Hospital.create({
        username: username,
        hospitalAccount: hospitalAccount,
        hospitalName: hospitalName,
        moneyPaid: moneyPaid,
      });
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(200).json({ success: false, msg: "Operation Failed!" });
    }
  });
router.route("/hospitals").get(verifyRequestMiddleWare, async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(200).json({ success: false, msg: "Unauthorized" });
    }
    const hospitals = await Hospital.find({});
    const users = await Users.find({});
    const posts = await Posts.find({});
    const approvedPosts = await ApprovedPosts.find({});
    const blogs = await Blogs.find({});
    return res.status(200).json({
      success: true,
      hospitals,
      numbers: [
        users.length,
        posts.length,
        approvedPosts.length,
        hospitals.length,
        blogs.length,
      ],
    });
  } catch (err) {
    return res.status(200).json({ success: false, msg: "Failed!" });
  }
});

router.route("/users").get(verifyRequestMiddleWare, async (req, res) => {
  try {
    if (!req.isAdmin) {
      return res.status(200).json({ success: false, msg: "Unauthorized" });
    }
    const users = await Users.find({});
    if (users.length === 0) {
      return res.status(200).json({ success: false, msg: "No available user" });
    }
    const approvedPosts = await ApprovedPosts.find({});
    const posts = await Posts.find({});
    return res.status(200).json({ success: true, approvedPosts, posts, users });
  } catch (err) {
    return res.status(200).json({ success: false, msg: "Try again" });
  }
});
router
  .route("/users/:username")
  .delete(verifyRequestMiddleWare, async (req, res) => {
    try {
      if (!req.isAdmin) {
        return res.status(200).json({ success: false, msg: "Unauthorized" });
      }
      const { username } = req.params;

      if (!username) {
        return res
          .status(200)
          .json({ success: false, msg: "Invalid username" });
      }
      const user = await Users.findOne({ username: username });
      if (!user) {
        return res.status(200).json({ success: false, msg: "No user found" });
      }

      await Users.deleteOne({ username: username });
      // console.log(username, )
      await Ban.create({ username: username, password: user.password });
      const approvedPost = await ApprovedPosts.findOne({ username: username });
      if (approvedPost) {
        await ApprovedPosts.deleteOne({ username: username });
      } else {
        const post = await Posts.findOne({ username: username });
        if (post) {
          await Posts.deleteOne({ username: username });
        }
      }
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(200).json({ success: false, msg: "Try again" });
    }
  });

module.exports = router;
