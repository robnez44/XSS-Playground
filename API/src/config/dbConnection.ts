import mongoose from "mongoose";

const getConnection = async () => {
  try {
    (await mongoose.connect(process.env.DATABASE_URL as string)).connection;
    console.log("MongoDB conectado correctamente");
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

export default getConnection;