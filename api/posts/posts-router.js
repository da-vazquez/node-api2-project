// implement your posts router here
const express = require("express")
const posts = require("./posts-model")
const router = express.Router()

router.get("/api/posts", (req, res) => {
  posts.find(req.query)
    .then(success => {
      res.status(200).json(success)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "The posts information could not be retrieved"})
    })
})


router.get("/api/posts/:id", (req, res) => {
  posts.findById(req.params.id)
    .then(success => {
      if (success) {
        res.status(200).json(success)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "The post infomation could not be retrieved"})
    })
})


router.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ message: "Please provide title and contents for the post"})
  }

  posts.insert(req.body)
    .then(success => {
      res.status(201).json(success)
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "There was an error while saving the post to the database"})
    })
})


router.put("/api/posts/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({ message: "Please provide title and contents for the post"})
  }
    posts.update(req.params.id, req.body)
      .then(success => {
        if (success) {
          res.status(200).json(success)
      } else {
          res.status(404).json({ message: "The post with the specified ID does not exist"})
      }
    })
      .catch(error => {
        console.log(error)
        res.status(500).json({ message: "The post information could not be modified"})
    })
  })


router.delete("/api/posts/:id", (req, res) => {
  posts.remove(req.params.id)
    .then(success => {
      if (success) {
        res.status(200).json({ message: "The post has been removed"})
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "The post could not be removed"})
    })
})


router.get("/api/posts/:id/comments", (req, res) => {
  posts.findPostComments(req.params.id)
    .then(success => {
      if (success) {
        res.json(success)
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist"})
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: "The comments information could not be retrieved"})
    })
})

        

module.exports = router