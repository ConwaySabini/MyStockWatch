// libraries
const validator = require('validator');
// models
import Autocomplete from '../models/Autocomplete.js';

// Export Autocomplete Controller
export default {
    // Returns a list of all stocks
    onGetAutocomplete: async (req, res) => {
        try {
            // finds all stocks and returns them
            const autocomplete = await Autocomplete.getAutocomplete();
            return res.status(200).json({ success: true, autocomplete });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },

    // Tries to create autocomplete, returns the stocks on success,
    // otherwise returns an error
    onCreateAutocomplete: async (req, res) => {
        try {
            const { names } = req.body;
            // create the autocomplete
            const createdAutocomplete = await Autocomplete.createAutocomplete(
                names
            );
            // return the autocomplete and success message
            return res.status(200).json({ success: true, createdAutocomplete });
        } catch (error) {
            return res.status(500).json({ success: false, error: error });
        }
    },
}
