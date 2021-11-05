import express from 'express';
// controllers
import lists from '../controllers/ListsController';

const router = express.Router();

// Routes for the lists controller to handle
router
  .get('/', lists.onGetAllLists)
  .get('/:id', lists.onGetListsById)
  .get('/userId/:userId', lists.onGetListsByUserId)
  .put('/', lists.onCreateLists)
  .put('/update/', lists.onUpdateListsByUserId)
  .delete('/:id', lists.onDeleteListsById)
  .delete('/userId/:userId', lists.onDeleteListsByUserId)

export default router;
