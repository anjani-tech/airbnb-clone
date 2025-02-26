"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GET = void 0;

var _database = _interopRequireDefault(require("@/config/database"));

var _Property = _interopRequireDefault(require("@/models/Property"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var GET = function GET() {
  var properties;
  return regeneratorRuntime.async(function GET$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap((0, _database["default"])());

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(_Property["default"].find({}));

        case 5:
          properties = _context.sent;
          return _context.abrupt("return", new Response(properties, {
            status: 200
          }));

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", new Response('SOmething went wrong', {
            status: 500
          }));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.GET = GET;