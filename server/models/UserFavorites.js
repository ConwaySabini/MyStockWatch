import mongoose from "mongoose";
import { nanoid } from "nanoid";

// Schema for the user favorites model
const userFavoritesSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    userId: String,
    favorites: [{
      id: String,
      symbol: String,
      percentChange: Number,
      timeline: String,
      status: String,
      data: {
        symbol: String,
        interval: String,
        currency: String,
        exchange_timezone: String,
        exchange: String,
        stockType: String,
        values: [{
          datetime: String,
          open: String,
          high: String,
          low: String,
          close: String,
          volume: String,
        }],
      },
    }],
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Creates user favorites
userFavoritesSchema.statics.createUserFavorites = async function (userId, favorites) {
  try {
    // create the favorites
    return await this.create({ userId, favaorites });
  } catch (error) {
    throw error;
  }
}

// Get the favorites by their id and return the found favorites if they exist
userFavoritesSchema.statics.getFavoritesById = async function (id) {
  try {
    const favorites = await this.findOne({ _id: id });
    if (!favorites) throw ({ error: 'No favorites with this id found' });
    return favorites;
  } catch (error) {
    throw error;
  }
}

// Get the favorites by their userId and return the found favorites if they exist
userFavoritesSchema.statics.getFavoritesByUserId = async function (userId) {
  try {
    const favorites = await this.findOne({ userId: userId });
    if (!favorites) throw ({ error: 'No favorites with this userId found' });
    return favorites;
  } catch (error) {
    throw error;
  }
}

// Get all user favorites in the database and return them
userFavoritesSchema.statics.getAllFavorites = async function () {
  try {
    return await this.find();
  } catch (error) {
    throw error;
  }
}

// Delete favorites with the given id and return the result
userFavoritesSchema.statics.deletFavoritesById = async function (id) {
  try {
    return await this.deleteOne({ _id: id });
  } catch (error) {
    throw error;
  }
}


// Get favorites by their ids and return the found favorites
userFavoritesSchema.statics.getAllFavorites = async function (ids) {
  try {
    const favorites = await this.find({ _id: { $in: ids } });
    if (!favorites) throw ({ error: 'No favorites with these ids were found' });
    return users;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model("UserFavorites", userFavoritesSchema);
