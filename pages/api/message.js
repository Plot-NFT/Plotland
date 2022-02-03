import axios from "axios";

async function handler(req, res) {
  const { method, body } = req;

  switch (method) {
    case "POST":
      try {
        await axios.post(`${process.env.NEXT_PUBLIC_SLACK}`, {
          text: `Payload received!\n\n${JSON.stringify(body)}`,
        });

        res.json({
          status: 200,
          message: "Success sending message!",
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
