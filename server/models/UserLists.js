// imports
import mongoose from "mongoose";
import { nanoid } from "nanoid";



// Schema for the stock Objects
const stockSchema = new mongoose.Schema(
  {
    symbol: String,
    data: [mongoose.Schema.Types.Mixed],
    percentChange: Number,
    timeline: String,
    id: String,
  },
);

// Schema for the list Objects
const list = new mongoose.Schema(
  {
    id: String,
    name: String,
    stocks: [stockSchema],
  },
);

// Schema for the user lists model
const listsSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    userId: String,
    lists: [list]
  },
  {
    timestamps: true,
    collection: "lists",
  }
);

// Creates user lists
listsSchema.statics.createUserLists = async function (userId, lists) {
  try {
    // create the lists
    return await this.create({ userId, lists });
  } catch (error) {
    throw error;
  }
}

// Updates user favorite data
listsSchema.statics.updateUserLists = async function (userId, lists) {
  try {
    // delete the existing lists
    await this.deleteOne({ userId: userId });
    // create the updated lists
    await this.create({ userId, lists });
  } catch (error) {
    throw error;
  }
}

// Get the lists by their id and return the found lists if they exist
listsSchema.statics.getListsById = async function (id) {
  try {
    const lists = await this.findOne({ _id: id });
    if (!lists) throw ({ error: 'No lists with this id found' });
    return lists;
  } catch (error) {
    throw error;
  }
}

// Get the lists by their userId and return the found lists if they exist
listsSchema.statics.getListsByUserId = async function (userId) {
  try {
    return this.findOne({ userId: userId });
  } catch (error) {
    throw error;
  }
}

// Get all user lists in the database and return them
listsSchema.statics.getAllLists = async function () {
  try {
    return await this.find();
  } catch (error) {
    throw error;
  }
}

// Delete lists with the given id and return the result
listsSchema.statics.deleteListsById = async function (id) {
  try {
    return await this.deleteOne({ _id: id });
  } catch (error) {
    throw error;
  }
}

// Delete the lists by their userId and return result
listsSchema.statics.deleteListsByUserId = async function (userId) {
  try {
    return await this.deleteOne({ userId: userId });
  } catch (error) {
    throw error;
  }
}


// Get lists by their ids and return the found lists
listsSchema.statics.getLists = async function (ids) {
  try {
    const lists = await this.find({ _id: { $in: ids } });
    if (!lists) throw ({ error: 'No lists with these ids were found' });
    return users;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model("Userlists", listsSchema);
