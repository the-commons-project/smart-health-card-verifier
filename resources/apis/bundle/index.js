/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
  if(typeof exports === 'object' && typeof module === 'object')
    module.exports = factory()
  else if(typeof define === 'function' && define.amd)
    define([], factory)
  else {
    const a = factory()
    for(const i in a) (typeof exports === 'object' ? exports : root)[i] = a[i]
  }
})(global, function() {
  return /******/ (() => { // webpackBootstrap
    /******/ 	"use strict"
    /******/ 	const __webpack_modules__ = ({

      /***/ "./src/index.js":
      /*! **********************!*\
  !*** ./src/index.js ***!
  \**********************/
      /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"handler\": () => (/* binding */ handler)\n/* harmony export */ });\n/* harmony import */ var _libs_LocaleFinder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./libs/LocaleFinder */ \"./src/libs/LocaleFinder.js\");\n\nconst handler = async ( event ) => {\n  var res = await (0,_libs_LocaleFinder__WEBPACK_IMPORTED_MODULE_0__[\"default\"])( event );\n  console.log('Received event', event);\n  return {\n    statusCode: 200,\n    body: JSON.stringify({ message: res }),\n  };\n};\nhandler().then( function(){\n  console.info(\"test\")\n})\n\n\n//# sourceURL=webpack:///./src/index.js?")

        /***/ }),

      /***/ "./src/libs/LocaleFinder.js":
      /*! **********************************!*\
  !*** ./src/libs/LocaleFinder.js ***!
  \**********************************/
      /***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  resolveLocale:()=> { return 'hi' }\n});\n\n//# sourceURL=webpack:///./src/libs/LocaleFinder.js?")

        /***/ })

      /******/ 	})
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	const __webpack_module_cache__ = {}
    /******/ 	
    /******/ 	// The require function
    /******/ 	function __webpack_require__(moduleId) {
      /******/ 		// Check if module is in cache
      /******/ 		const cachedModule = __webpack_module_cache__[moduleId]
      /******/ 		if (cachedModule !== undefined) {
        /******/ 			return cachedModule.exports
        /******/ 		}
      /******/ 		// Create a new module (and put it into the cache)
      /******/ 		const module = __webpack_module_cache__[moduleId] = {
        /******/ 			// no module.id needed
        /******/ 			// no module.loaded needed
        /******/ 			exports: {}
        /******/ 		}
      /******/ 	
      /******/ 		// Execute the module function
      /******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__)
      /******/ 	
      /******/ 		// Return the exports of the module
      /******/ 		return module.exports
      /******/ 	}
    /******/ 	
    /************************************************************************/
    /******/ 	/* webpack/runtime/define property getters */
    /******/ 	(() => {
      /******/ 		// define getter functions for harmony exports
      /******/ 		__webpack_require__.d = (exports, definition) => {
        /******/ 			for(const key in definition) {
          /******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
            /******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] })
            /******/ 				}
          /******/ 			}
        /******/ 		}
      /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/hasOwnProperty shorthand */
    /******/ 	(() => {
      /******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
      /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/make namespace object */
    /******/ 	(() => {
      /******/ 		// define __esModule on exports
      /******/ 		__webpack_require__.r = (exports) => {
        /******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
          /******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' })
          /******/ 			}
        /******/ 			Object.defineProperty(exports, '__esModule', { value: true })
        /******/ 		}
      /******/ 	})()
    /******/ 	
    /************************************************************************/
    /******/ 	
    /******/ 	// startup
    /******/ 	// Load entry module and return exports
    /******/ 	// This entry module can't be inlined because the eval devtool is used.
    /******/ 	const __webpack_exports__ = __webpack_require__("./src/index.js")
    /******/ 	
    /******/ 	return __webpack_exports__
    /******/ })()

})
