import mongoose from "mongoose";

class MongoDB {
  static instance;

  static async _connect() {
    this.instance = await mongoose.connect(process.env.MONGODB_URI);
  }

  static async getInstance() {
    if (!this.instance) {
      try {
        await this._connect();

        console.log(`MongoDB is running at ${mongoose.connection.host}`);

        return this.instance;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log(`MongoDB is running at ${mongoose.connection.host}`);

      return this.instance;
    }
  }
}

export default MongoDB;
