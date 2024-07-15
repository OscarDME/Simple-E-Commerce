import Product from "../../models/Product";

const { initMongoose } = require("../../lib/mongoose")

export async function findAllProducts(){
    return Product.find().exec();
}

export default async function handle(req, res) {
    try {
        await initMongoose();
        const {ids} = req.query;
        if(ids){
            const idsArray = ids.split(",");
            res.json( await Product.find({_id: {$in: idsArray}}).exec());
        } else {
            const products = await findAllProducts();
            res.status(200).json(products);
        }
        
    } catch (error) {
        console.error("Error in /api/products:", error);
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}
