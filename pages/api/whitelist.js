import MongoDB from "../../config/db.js";
import Whitelist from "../../models/WhitelistSchema.js";

async function handler(req, res) {
  await MongoDB.getInstance();

  const { method } = req;
  const { wallet: userWallet } = req.query;

  switch (method) {
    case "GET":
      const query = userWallet ? { wallet: userWallet } : {};

      try {
        const whitelists = await Whitelist.find(query);

        res.json({
          status: 200,
          message: "Success getting whitelist data",
          data: whitelists,
        });
      } catch (error) {
        console.error(error);
        res.json({
          status: 500,
          error: "Server error",
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
