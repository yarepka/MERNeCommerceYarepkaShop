import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log(
      `MongoDB Connected: ${connection.connection.host}`.cyan.underline
    );
  } catch (error) {
    console.error(`Error: ${error.message}`.red.underline.bold);
    // Exit process with failure
    process.exit(1);
  }
};

export default connectDB;
