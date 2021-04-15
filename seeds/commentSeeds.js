const { Comments } = require('../models');

const commentData = [
  {
    content: "Youre right!",
    user_id: 1,
    post_id: 4
  },
  {
    content: "Insane.",
    user_id: 4,
    post_id: 3
  },
  {
    content: "Why you say that?",
    user_id: 2,
    post_id: 2
  },
  {
    content: "Great stuff!",
    user_id: 3,
    post_id: 1
  },
  {
    content: "Oh yea",
    user_id: 4,
    post_id: 3
  },
  {
    content: "Please dont say that",
    user_id: 3,
    post_id: 5
  },
];

const commentSeeds = () => Comments.bulkCreate(userData, { individualHooks: true })

module.exports = commentSeeds;