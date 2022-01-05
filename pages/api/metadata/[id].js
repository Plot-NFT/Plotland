async function handler(req, res) {
  const { method } = req;
  const { id } = req.query;
  const index = Number(id) - 1;
  const metadataURI = ["kwowokwokwo"];

  switch (method) {
    case "GET":
      try {
        res.redirect(308, metadataURI[index]);
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
