import express from 'express';
// controllers
import favorites from '../controllers/FavoritesController.js';

const router = express.Router();

// Routes for the favorites controller to handle
router
  .get('/', favorites.onGetAllFavorites)
  .get('/:id', favorites.onGetFavoritesById)
  .get('/userId/:userId', favorites.onGetFavoritesByUserId)
  .put('/', favorites.onCreateFavorites)
  .put('/update/', favorites.onUpdateFavoritesByUserId)
  .delete('/:id', favorites.onDeleteFavoritesById)
  .delete('/userId/:userId', favorites.onDeleteFavoritesByUserId)

export default router;
