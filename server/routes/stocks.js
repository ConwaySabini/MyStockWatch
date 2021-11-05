import express from 'express';
// controllers
import stocks from '../controllers/StocksController.js';

const router = express.Router();

// Routes for the stocks controller to handle
router
  .get('/', stocks.onGetAllStocks)
  .get('/:id', stocks.onGetStocksById)
  .get('/userId/:userId', stocks.onGetStocksByUserId)
  .put('/', stocks.onCreateStocks)
  .put('/update/', stocks.onUpdateStocksByUserId)
  .delete('/:id', stocks.onDeleteStocksById)
  .delete('/userId/:userId', stocks.onDeleteStocksByUserId)

export default router;
