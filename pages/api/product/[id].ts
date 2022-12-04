import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../../models/Product";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const { id } = req.query;
	const product = await Product.findById(id);
	res.send(product);
};

export default handler;
