// libraries
const validator = require('validator');
// models
import UserStocks from '../models/UserStocks';

// Export User Controller
export default {
  // Finds stocks by their id and returns the stocks on success
  onGetStocksById: async (req, res) => {
    try {
      const stocks = await UserStocks.getStocksById(req.params.id);
      return res.status(200).json({ success: true, stocks });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Find stocks with their userId and returns the stocks if they exist,
  // otherwise returns an error
  onGetStocksByUserId: async (req, res) => {
    try {
      // get the stocks and return the stocks if available
      const stocks = await UserStocks.getStocksByUserId(req.params.userId);
      return res.status(200).json({ success: true, stocks });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Returns a list of all stocks
  onGetAllStocks: async (req, res) => {
    try {
      // finds all stocks and returns them if there are any stocks
      const stocks = await UserStocks.getAllStocks();
      return res.status(200).json({ success: true, stocks });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Tries to create stocks, returns the stocks on success,
  // otherwise returns an error
  onCreateStocks: async (req, res) => {
    try {
      let validation = true;
      const { userId, stocks } = req.body;
      // Validate the data from the request
      if (!(typeof userId === 'string' || userId instanceof String)) {
        validation = false;
      }
      // throw error on validation failure
      if (!validation) return res.status(400).json(validation);
      // Find if the stocks already exists
      const foundStocks = await UserStocks.getStocksByUserId(userId);
      // throw error if stocks already exists
      if ((foundStocks !== null)) return res.status(500).json({
        success: false,
        error: 'There is already stocks for this user.'
      });
      // create the stocks
      const createdStocks = await UserStocks.createUserStocks(
        userId,
        stocks
      );
      // return the stocks and success message
      return res.status(200).json({ success: true, createdStocks });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Update the stocks with the given userId and returns the success message on success,
  // otherwise returns an error
  onUpdateStocksByUserId: async (req, res) => {
    try {
      await UserStocks.updateUserStocks(req.body.userId, req.body.stocks);
      return res.status(200).json({
        success: true,
        message: `Updated stocks from user ${req.body.userId}.`,
        stocks: req.body.stocks
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Delete the stocks with the given id and returns the success message on success,
  // otherwise returns an error
  onDeleteStocksById: async (req, res) => {
    try {
      const deletedStocks = await UserStocks.deleteStocksById(req.params.id);
      return res.status(200).json({
        success: true,
        message: `Deleted ${deletedStocks.deletedCount} stocks.`
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },

  // Delete the stocks with the given userId and returns the success message on success,
  // otherwise returns an error
  onDeleteStocksByUserId: async (req, res) => {
    try {
      const deletedStocks = await UserStocks.deleteStocksByUserId(req.params.userId);
      return res.status(200).json({
        success: true,
        message: `Deleted ${deletedStocks.deletedCount} stocks.`
      });
    } catch (error) {
      return res.status(500).json({ success: false, error: error });
    }
  },
}
