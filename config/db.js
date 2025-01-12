import mongoose from "mongoose";

const connectToDB = async() => {
    await mongoose.connect(process.env.URI)
    .then(() => console.log("CONNECTED TO DATABASE"))
    .catch((err) => console.log(err))
}

export default connectToDB;