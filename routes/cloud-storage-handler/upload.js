const util = require("util");
const Multer = require("multer");
const { Storage } = require("@google-cloud/storage");

let processFile = Multer({
  storage: Multer.memoryStorage(),
}).single("file");
console.log(processFile);

let processFileMiddleware = util.promisify(processFile);

// Instantiate a storage client with credentials
const storage = new Storage({
  keyFilename: "routes/cloud-storage-handler/somethingnew.json",
});
// ini diganti
const bucket = storage.bucket("eventapp");

// Create a new handler for the upload route
const uploadHandler = async (req, res) => {
  try {
    await processFileMiddleware(req, res);

    if (!req.file) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    // Create a new blob in the bucket and upload the file data.
    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream();

    blobStream.on("NotFoundError", (err) => {
      res.status(500).send({ message: err.message });
    });
    blobStream.on("InvalidRequestError", (err) => {
      res.status(500).send({ message: err.message });
    });

    blobStream.on("finish", async (data) => {
      // Create URL for directly file access via HTTP.
      const publicUrl = new URL(
        // ini boleh diganti kalau mau set folder
        // misal
        // `https://storage.googleapis.com/${bucket.name}/image/${blob.name}`
        
        `https://storage.googleapis.com/${bucket.name}/${blob.name}`

      );

      try {
        // Make the file public
        await bucket.file(req.file.originalname).makePublic();
      } catch {
        return res.status(500).send({
          message: `File uploaded successfully but public access is denied!`,
          url: publicUrl,
        });
      }

      res.status(200).send({
        message: "File uploaded successfully",
        url: publicUrl,
      });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

module.exports = uploadHandler;
