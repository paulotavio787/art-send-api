const express = require("express");
const Email = require("../model/Email");

const router = express.Router();

//validation
const joi = require("@hapi/joi")

const schema = joi.object({
    email: joi.string().min(5).required().email()
});

// Add a Post
router.post("/add", async (req, res) => {
    //Validte a user
    const {error} = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    //check if e-mail already exist
    const emailExist = Email.findOne({email: req.body.email})
    if (emailExist) return res.status(400).send("this e-mail already exist")

    const addPost = new Email({
        email: req.body.email,
    })

    try {
        const postSave = await addPost.save()
        res.json(postSave)
    } catch (err) {
        res.json({ message: err })
    }
})


// Find all Posts
router.get("/find_all", async (req, res) => {
    try {
        const findAllPosts = await Email.find();
        res.json(findAllPosts)
    } catch (err) {
        res.json({ message: err })
    }
});

// Find Specific Post
router.get("/find_specific/:postId", async (req, res) => {
    try {
        const findSpecificPost = await Email.findById(req.params.postId)
        res.json(findSpecificPost)
    } catch (err) {
        res.json({ message: err })
    }
})

// Delete Post
router.delete("/delete/:postId", async (req, res) => {
    try {
        const removePost = await Email.remove({ _id: req.params.postId })
        res.json(removePost)
    } catch (err) {
        res.json({ message: err })
    }
})

// Update Post
router.patch("/update/:postId", async (req, res) => {
    try {
        const updatePost = await Email.updateOne(
            { _id: req.params.postId }, 
            { $set: {email: req.body.email} })
        res.json(updatePost)
    } catch (err) {
        res.json({ message: err })
    }
})

module.exports = router;