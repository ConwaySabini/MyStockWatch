// imports
import mongoose from "mongoose";
import { nanoid } from "nanoid";

// Schema for each stock
const nameSchema = new mongoose.Schema(
    {
        country: String,
        currency: String,
        exchange: String,
        name: String,
        symbol: String,
        type: String,
    },
);

// Schema for the user model
const autocompleteSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default: () => nanoid(),
        },
        names: [nameSchema]
    },
    {
        timestamps: true,
        collection: "users",
    }
);

// Creates the stock list for autocomplete
autocompleteSchema.statics.createAutocomplete = async function (names) {
    try {
        // create the names
        return await this.create({ names });
    } catch (error) {
        throw error;
    }
}

// Get all users in the database and return them
autocompleteSchema.statics.getAutocomplete = async function () {
    try {
        return await this.find();
    } catch (error) {
        throw error;
    }
}

export default mongoose.model("Autocomplete", autocompleteSchema);
