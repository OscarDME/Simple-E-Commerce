import Product from "../../models/Product";

const { initMongoose } = require("../../lib/mongoose")

export default async function handle(req, res) {
    try {
        await initMongoose();
        const products = await Product.find().exec();
        res.status(200).json(products);
    } catch (error) {
        console.error("Error in /api/products:", error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}
