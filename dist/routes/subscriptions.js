"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _SubscriptionsController = _interopRequireDefault(require("../controllers/SubscriptionsController.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// controllers
const router = _express.default.Router(); // Routes for the favorites controller to handle


router.get('/', _SubscriptionsController.default.onGetAllSubscriptions).get('/:userId', _SubscriptionsController.default.onGetSubscriptionsByUserId).put('/', _SubscriptionsController.default.onCreateSubscriptions).put('/add', _SubscriptionsController.default.onAddSubscriptionByUserId).put('/update/', _SubscriptionsController.default.onUpdateSubscriptionsByUserId).delete('/:userId', _SubscriptionsController.default.onDeleteSubscriptionsByUserId).delete('/single/:userId', _SubscriptionsController.default.onDeleteSubscriptionByUserId);
var _default = router;
exports.default = _default;
//# sourceMappingURL=subscriptions.js.map