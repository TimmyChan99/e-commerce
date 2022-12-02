import { NextApiRequest, NextApiResponse } from "next";
import Product from "../../models/Product";
import User from "../../models/User";
import data from "../../utils/data";
import dbConnect from "../../utils/db";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await dbConnect();
  await User.deleteMany({});
	await User.insertMany(data.users);
	await Product.deleteMany({});
	await Product.insertMany(data.products);
	res.status(200).json({ message: "Data imported successfully" });
};

export default handler;
