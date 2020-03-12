const express = require('express');

const Posts = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the posts',
      });
    });
  });

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: 'Post not found' });
      }
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the Post',
      });
    });
  });

router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(error => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: 'Error adding the hub',
      });
    });
  });

router.get('/:id/comments', (req, res) => {
    const commentId = req.params.id;
    Posts.findPostComments(commentId)
        .then(posts => {
            if (posts.length === 0) {
                resp.status(404).json({
                    message: 'The post with the specified ID does not exist.'
                });
            } else {
                res.status(200).json(posts);
            }
        })
        .catch(error => {
            console.log("Error: ", error);
            res.status(500).json({ error: 'The comments information could not be retrieved.' });
        });
});

router.delete("/:id", (req, res) => {
    const { id } = req.params;
    Posts.remove(id)
        .then(posts => {
            if (!posts) {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
            } else {
                res.status(200).json(posts);
            }
        })
        .catch(error => {
            console.log("Error: ", error);
            res
                .status(500)
                .json({ errorMessage: "The post could not be removed" });
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    Posts.update(id, updates)
        .then(posts => {
            if (!posts) {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." });
            } else if (!updates.title || !updates.contents) {
                res.status(400).json({
                    errorMessage: "Please provide title and contents for the post."
                });
            } else {
                res.status(200).json(posts);
            }
        })
        .catch(error => {
            console.log("Error: ", error);
            res
                .status(500)
                .json({ error: "The post information could not be modified." });
        });
});

router.post('/:id/comments', (req, res) => {
    const { id } = req.params;
    const commentItems = {...req.body, post_id: id };

    if (!id) {
        res
            .status(404)
            .json({ message: 'The post with the specified ID does not exist.' });
    } else if (!req.body.text) {
        res
            .status(400)
            .json({ errorMessage: 'Please provide text for the comment.' });
    } else {
        Posts.insertComment(commentItems)
            .then(comment => {
                res.status(201).json(comment);
            })
            .catch(error => {
                console.log('Error: ', error);
                res.status(500).json({
                    error: 'There was an error while saving the comment to the database.'
                });
            });
    }
});



module.exports = router;