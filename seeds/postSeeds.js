const { Post } = require("../models");

const postData = [
  {
    title: "fuyplwu",
    body: "wyuflpwulyuwflpywulfpyuwlfpywulp",
    user_id: 1,
  },
  {
    title: "fuyplwu",
    body: "wyuflpwulyuwflpywulfpyuwlfpywulp",
    user_id: 2,
  },
  {
    title: "fyulwpful",
    body: "wlfypulwf",
    user_id: 3,
  },
];
const postSeeds = () => Post.bulkCreate(userData, { individualHooks: true })


module.exports = postSeeds;