import axios from "axios";

async function handler(req, res) {
  const { method, body } = req;
  const { text } = body;

  switch (method) {
    case "POST":
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_SLACK}`, { text });

        res.json({
          status: 200,
          message: "Success submitting project!",
        });
      } catch (error) {
        const err =
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message;

        console.error(err);

        res.json({
          status: 500,
          error: err,
        });
      }
      break;

    default:
      res.json({
        status: 405,
        error: "Method is not allowed, only accept POST",
      });
      break;
  }
}

export default handler;
