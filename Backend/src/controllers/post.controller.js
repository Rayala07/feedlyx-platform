const imageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
require("dotenv").config();

const client = new imageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  // File upload to imagekit
  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "image1",
  });

  res.send(file);
}

module.exports = {
  createPostController,
};
