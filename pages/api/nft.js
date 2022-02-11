import MongoDB from "../../config/db.js";
import Metadata from "../../models/MetadataSchema.js";

async function handler(req, res) {
  await MongoDB.getInstance();

  const { method } = req;
  const { tokenIds } = req.query;

  switch (method) {
    case "GET":
      const query = { tokenId: { $in: JSON.parse(tokenIds) } };

      try {
        const Metadatas = await Metadata.find(query);

        res.json({
          status: 200,
          message: "Success getting metadata data",
          data: Metadatas,
        });
      } catch (error) {
        console.error(error);

        res.json({
          status: 500,
          error: error.message,
        });
      }
      break;

    default:
      res.json({
        status: 405,
        error: "Method is not allowed, only accept GET, POST, and PUT",
      });
      break;
  }
}

export default handler;
