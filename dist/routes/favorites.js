"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _FavoritesController = _interopRequireDefault(require("../controllers/FavoritesController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
const router = _express.default.Router(); // Routes for the favorites controller to handle


router.get('/', _FavoritesController.default.onGetAllFavorites).get('/:id', _FavoritesController.default.onGetFavoritesById).get('/userId/:userId', _FavoritesController.default.onGetFavoritesByUserId).put('/', _FavoritesController.default.onCreateFavorites).put('/update/', _FavoritesController.default.onUpdateFavoritesByUserId).delete('/:id', _FavoritesController.default.onDeleteFavoritesById).delete('/userId/:userId', _FavoritesController.default.onDeleteFavoritesByUserId);
var _default = router;
exports.default = _default;
//# sourceMappingURL=favorites.js.map