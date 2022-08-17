"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseJson = parseJson;

function parseJson(json) {
  try {
    return JSON.parse(json);
  } catch (error) {
    return undefined;
  }
}
//# sourceMappingURL=utils.js.map