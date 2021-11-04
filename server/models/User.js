// imports
import mongoose from "mongoose";
import { nanoid } from "nanoid";
import bcrypt from 'bcrypt';

// Schema for the user model
const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => nanoid(),
    },
    firstName: String,
    lastName: String,
    type: String,
    email: String,
    password: String,
  },
  {
    timestamps: true,
    collection: "users",
  }
);

// Creates a new user with the given email, password, firstName, lastName, and type
// Returns the newly created user
userSchema.statics.createUser = async function (firstName, lastName, type, email, pass) {
  try {
    // Hash the password with 10 rounds of salting
    const password = await bcrypt.hash(pass, 10);
    // create the user
    return await this.create({ firstName, lastName, type, email, password });
  } catch (error) {
    throw error;
  }
}

// Get the user by their id and return the found user if they exist
userSchema.statics.getUserById = async function (id) {
  try {
    const user = await this.findOne({ _id: id });
    if (!user) throw ({ error: 'No user with this id found' });
    return user;
  } catch (error) {
    throw error;
  }
}

// Get all users in the database and return them
userSchema.statics.getUsers = async function () {
  try {
    return await this.find();
  } catch (error) {
    throw error;
  }
}

// Delete a user with the given id and return the result
userSchema.statics.deleteUserById = async function (id) {
  try {
    return await this.deleteOne({ _id: id });
  } catch (error) {
    throw error;
  }
}


// Get users by their ids and return the found users
userSchema.statics.getUserByIds = async function (ids) {
  try {
    const users = await this.find({ _id: { $in: ids } });
    if (!users) throw ({ error: 'No users with these ids were found' });
    return users;
  } catch (error) {
    throw error;
  }
}

// Get a user with the given email and return the found user if they exist
userSchema.statics.getUserByEmail = async function (userEmail) {
  try {
    const user = await this.findOne({ "email": userEmail });
    // return null if the user doesn't exist
    if (!user) return null;
    return user;
  } catch (error) {
    throw error;
  }
}

// Verify the email and password of the user
userSchema.statics.verifyPassword = async function (email, password) {
  try {
    // Get hashed password from the database and compare
    const user = await this.findOne({ "email": email });
    // Throw error if user doesn't exist
    if (!user) throw ({ error: 'No user with this email' });
    // Compare the password with the hashed password
    const isPassword = bcrypt.compareSync(password, user.password);
    // Throw error if password is incorrect
    if (!isPassword) throw ({ error: 'Password is incorrect' });
    return user;
  } catch (error) {
    throw error;
  }
}

export default mongoose.model("User", userSchema);
