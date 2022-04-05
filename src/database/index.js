const debug = require("debug")("learning-helper:database");
const mongoose = require("mongoose");

const connectToDataBase = (connectionString) =>
  new Promise((resolve, reject) => {
    mongoose.set("returnOriginal", false);
    mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, ret) => {
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        delete ret._id;
        // eslint-disable-next-line no-param-reassign, no-underscore-dangle
        delete ret.__v;
      },
    });

    mongoose.connect(connectionString, (error) => {
      if (error) {
        reject(new Error(`You can't connect a database: ${error.message}`));
        return;
      }
      debug("You're connected a database");
      resolve();
    });
  });

module.exports = connectToDataBase;
