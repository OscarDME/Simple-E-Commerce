import mongoose from "mongoose";

const URL1 = "mongodb+srv://OscarDME:Oscardaniel1000@cluster0.6snug9l.mongodb.net/E-commerce?retryWrites=true&w=majority&appName=Cluster0";

export async function initMongoose() {
    if (mongoose.connection.readyState === 1) {
        return mongoose.connection.asPromise();
    }

    try {
        await mongoose.connect(URL1, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}
