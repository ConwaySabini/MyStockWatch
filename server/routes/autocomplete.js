import express from 'express';
// controllers
import autocomplete from '../controllers/AutocompleteController.js';

const router = express.Router();

// Routes for the autocomplete controller to handle
router
    .get('/', autocomplete.onGetAutocomplete)
    .put('/', autocomplete.onCreateAutocomplete)

export default router;
