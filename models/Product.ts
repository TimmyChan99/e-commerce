import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: { type: String, required: true },
	image: { type: String, required: true },
	brand: { type: String, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	countInStock: { type: Number, required: true, default: 0 },
	rating: { type: Number, required: true, default: 0 },
	numReviews: { type: Number, required: true, default: 0 },
	slug: { type: String, required: true, unique: true },
}, {
	timestamps: true,
	});

const productModel = mongoose.models.Product || mongoose.model("Product", productSchema);	

export default productModel;
