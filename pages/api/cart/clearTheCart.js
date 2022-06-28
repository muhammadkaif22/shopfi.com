import nc from "next-connect";
import db from "../../../utils/db";
import Cart from "../../../modals/Cart";

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const items = await Cart.deleteMany({});

  res.send("Done");
});

export default handler;
