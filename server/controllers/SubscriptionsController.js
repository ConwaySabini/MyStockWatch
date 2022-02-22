// libraries
const Cron = require('cron').CronJob;
const validator = require('validator');
// models
import Subscriptions from '../models/Subscriptions';

// Export Subscriptions Controller
export default {
    // Finds subscriptions by their userId and returns the subscriptions on success
    onGetSubscriptionsByUserId: async (req, res) => {
        try {
            const subscriptions = await Subscriptions.getSubscriptionsByUserId(req.params.userId);
            return res.status(200).json({ success: true, subscriptions });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },

    // Returns a list of all subscriptions
    onGetAllSubscriptions: async (req, res) => {
        try {
            // finds all subscriptions and returns them if there are any subscriptions
            const subscriptions = await Subscriptions.getSubscriptions();
            return res.status(200).json({ success: true, subscriptions });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },

    // Tries to create lists, returns the lists on success,
    // otherwise returns an error
    onCreateSubscriptions: async (req, res) => {
        try {
            let validation = true;
            const { userId, symbols } = req.body;
            // Validate the data from the request
            if (!(typeof userId === 'string' || userId instanceof String)) {
                validation = false;
            }
            // throw error on validation failure
            if (!validation) return res.status(400).json(validation);
            // Find if the subscriptions already exists
            const foundSubscriptions = await Subscriptions.getSubscriptionsByUserId(userId);
            // throw error if subscriptions already exists
            if ((foundSubscriptions !== null)) return res.status(500).json({
                success: false,
                error: 'There is already subscriptions for this user.'
            });
            // create the subscriptions
            const createdSubscriptions = await Subscriptions.createSubscription(userId, symbols);
            // return the subscriptions and success message
            return res.status(200).json({ success: true, createdSubscriptions });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },

    // Update the subscriptions with the given userId and returns the success message on success,
    // otherwise returns an error
    onUpdateSubscriptionsByUserId: async (req, res) => {
        try {
            await Subscriptions.updateUserSubscriptions(req.body.userId, req.body.symbols);
            return res.status(200).json({
                success: true,
                message: `Updated subscriptions from user ${req.body.userId}.`
            });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },

    // Add a subscriptions with the given userId and returns the success message on success,
    // otherwise returns an error
    onAddSubscriptionByUserId: async (req, res) => {
        try {
            await Subscriptions.updateUserSubscriptions(req.body.userId, req.body.symbols, req.body.symbol);
            // TODO start cron job
            // start cron job
            const newJob = new Cron('*/15 * * * *',
                analyzeStock(req.body.userId, req.body.symbol), null, true, 'America/Los_Angeles');

            // return message
            return res.status(200).json({
                success: true,
                message: `Updated subscriptions from user ${req.body.userId}.`
            });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },

    // Delete the subscriptions with the given userId and returns the success message on success,
    // otherwise returns an error
    onDeleteSubscriptionsByUserId: async (req, res) => {
        try {
            const subscriptions = await Subscriptions.deleteSubscriptionsByUserId(req.params.userId);
            return res.status(200).json({
                success: true,
                message: `Deleted a count of ${subscriptions.deletedCount} subscriptions.`
            });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },

    // Delete the subscription with the given userId and symbol and returns the success message on success,
    // otherwise returns an error
    onDeleteSubscriptionByUserId: async (req, res) => {
        try {
            const subscriptions = await Subscriptions.deleteSubscriptionByUserId(req.params.userId, req.params.symbol);
            return res.status(200).json({
                success: true,
                message: `Deleted a count of ${subscriptions.deletedCount} subscriptions.`
            });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },
}
