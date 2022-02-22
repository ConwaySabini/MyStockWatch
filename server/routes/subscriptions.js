import express from 'express';
// controllers
import subscriptions from '../controllers/SubscriptionsController.js';

const router = express.Router();

// Routes for the favorites controller to handle
router
    .get('/', subscriptions.onGetAllSubscriptions)
    .get('/:userId', subscriptions.onGetSubscriptionsByUserId)
    .put('/', subscriptions.onCreateSubscriptions)
    .put('/add', subscriptions.onAddSubscriptionByUserId)
    .put('/update/', subscriptions.onUpdateSubscriptionsByUserId)
    .delete('/:userId', subscriptions.onDeleteSubscriptionsByUserId)
    .delete('/single/:userId', subscriptions.onDeleteSubscriptionByUserId)

export default router;
