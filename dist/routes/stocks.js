"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _StocksController = _interopRequireDefault(require("../controllers/StocksController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
const router = _express.default.Router(); // Routes for the stocks controller to handle


router.get('/', _StocksController.default.onGetAllStocks).post('/', _StocksController.default.onCreateStocks).get('/:id', _StocksController.default.onGetStocksById).get('/userId/:userId', _StocksController.default.onGetStocksByUserId).post('/update/:userId', _StocksController.default.onUpdateStocksByUserId).delete('/:id', _StocksController.default.onDeleteStocksById).delete('/userId/:userId', _StocksController.default.onDeleteStocksByUserId);
var _default = router;
exports.default = _default;
//# sourceMappingURL=stocks.js.map