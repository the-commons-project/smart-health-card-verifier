"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Timer {
  /* milli second */

  /* milli second */
  constructor() {
    _defineProperty(this, "startTime", void 0);

    _defineProperty(this, "timeTook", void 0);

    this.startTime = 0;
    this.timeTook = 0;
  }

  start() {
    this.startTime = new Date().getTime();
  }
  /**
   * result will be return in second.
   * @return {number} [description]
   */


  stop() {
    const time = new Date().getTime();
    this.timeTook = time - this.startTime;
    return this.timeTook / 1000;
  }

}

exports.default = Timer;
//# sourceMappingURL=timer.js.map