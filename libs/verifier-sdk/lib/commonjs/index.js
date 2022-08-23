"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  VerifierFactory: true,
  Utils: true,
  Timer: true
};
Object.defineProperty(exports, "Timer", {
  enumerable: true,
  get: function () {
    return _timer.Timer;
  }
});
exports.Utils = void 0;
Object.defineProperty(exports, "VerifierFactory", {
  enumerable: true,
  get: function () {
    return _VerifierFactory.VerifierFactory;
  }
});

var _VerifierFactory = require("./factory/VerifierFactory");

var _InvalidError = require("./utils/InvalidError");

Object.keys(_InvalidError).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _InvalidError[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _InvalidError[key];
    }
  });
});

var _error = require("./constants/error");

Object.keys(_error).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _error[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _error[key];
    }
  });
});

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _types[key];
    }
  });
});

var _Utils = _interopRequireWildcard(require("./utils/utils"));

exports.Utils = _Utils;

var _timer = require("./utils/timer");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
//# sourceMappingURL=index.js.map