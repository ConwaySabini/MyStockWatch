import express from 'express';
// controllers
import stocks from '../controllers/StocksController';

const router = express.Router();

// Routes for the stocks controller to handle
router
  .get('/', stocks.onGetAllStocks)
  .post('/', stocks.onCreateStocks)
  .get('/:id', stocks.onGetStocksById)
  .get('/userId/:userId', stocks.onGetStocksByUserId)
  .put('/update/:userId', stocks.onUpdateStocksByUserId)
  .delete('/:id', stocks.onDeleteStocksById)
  .delete('/userId/:userId', stocks.onDeleteStocksByUserId)

export default router;
