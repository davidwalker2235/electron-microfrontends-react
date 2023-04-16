"use strict";
self["webpackHotUpdateelectron_react_typescript_webpack_2023"]("app_window",{

/***/ "./src/renderer/components/Application.tsx":
/*!*************************************************!*\
  !*** ./src/renderer/components/Application.tsx ***!
  \*************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Application_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Application.scss */ "./src/renderer/components/Application.scss");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");



// @ts-ignore
const Micro = react__WEBPACK_IMPORTED_MODULE_0___default().lazy(() => __webpack_require__.e(/*! import() */ "webpack_container_remote_microfr_Application").then(__webpack_require__.t.bind(__webpack_require__, /*! microfr/Application */ "webpack/container/remote/microfr/Application", 23)));
const Application = () => {
    const [darkTheme, setDarkTheme] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { id: 'erwt' },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: 'header' },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: 'main-heading' },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", { className: 'themed' }, "Omron - Robot Dashboard PoC"))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Suspense), null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Micro, { className: {} }))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Application);


const $ReactRefreshModuleId$ = __webpack_require__.$Refresh$.moduleId;
const $ReactRefreshCurrentExports$ = __react_refresh_utils__.getModuleExports(
	$ReactRefreshModuleId$
);

function $ReactRefreshModuleRuntime$(exports) {
	if (true) {
		let errorOverlay;
		if (typeof __react_refresh_error_overlay__ !== 'undefined') {
			errorOverlay = __react_refresh_error_overlay__;
		}
		let testMode;
		if (typeof __react_refresh_test__ !== 'undefined') {
			testMode = __react_refresh_test__;
		}
		return __react_refresh_utils__.executeRuntime(
			exports,
			$ReactRefreshModuleId$,
			module.hot,
			errorOverlay,
			testMode
		);
	}
}

if (typeof Promise !== 'undefined' && $ReactRefreshCurrentExports$ instanceof Promise) {
	$ReactRefreshCurrentExports$.then($ReactRefreshModuleRuntime$);
} else {
	$ReactRefreshModuleRuntime$($ReactRefreshCurrentExports$);
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ (() => {
/******/ 	__webpack_require__.h = () => ("02426e9a6434e0ec35e6")
/******/ })();
/******/ 
/******/ /* webpack/runtime/remotes loading */
/******/ (() => {
/******/ 	var chunkMapping = {
/******/ 		"webpack_container_remote_microfr_Application": [
/******/ 			"webpack/container/remote/microfr/Application"
/******/ 		]
/******/ 	};
/******/ 	var idToExternalAndNameMapping = {
/******/ 		"webpack/container/remote/microfr/Application": [
/******/ 			"default",
/******/ 			"./Application",
/******/ 			"webpack/container/reference/microfr"
/******/ 		]
/******/ 	};
/******/ 	__webpack_require__.f.remotes = (chunkId, promises) => {
/******/ 		if(__webpack_require__.o(chunkMapping, chunkId)) {
/******/ 			chunkMapping[chunkId].forEach((id) => {
/******/ 				var getScope = __webpack_require__.R;
/******/ 				if(!getScope) getScope = [];
/******/ 				var data = idToExternalAndNameMapping[id];
/******/ 				if(getScope.indexOf(data) >= 0) return;
/******/ 				getScope.push(data);
/******/ 				if(data.p) return promises.push(data.p);
/******/ 				var onError = (error) => {
/******/ 					if(!error) error = new Error("Container missing");
/******/ 					if(typeof error.message === "string")
/******/ 						error.message += '\nwhile loading "' + data[1] + '" from ' + data[2];
/******/ 					__webpack_require__.m[id] = () => {
/******/ 						throw error;
/******/ 					}
/******/ 					data.p = 0;
/******/ 				};
/******/ 				var handleFunction = (fn, arg1, arg2, d, next, first) => {
/******/ 					try {
/******/ 						var promise = fn(arg1, arg2);
/******/ 						if(promise && promise.then) {
/******/ 							var p = promise.then((result) => (next(result, d)), onError);
/******/ 							if(first) promises.push(data.p = p); else return p;
/******/ 						} else {
/******/ 							return next(promise, d, first);
/******/ 						}
/******/ 					} catch(error) {
/******/ 						onError(error);
/******/ 					}
/******/ 				}
/******/ 				var onExternal = (external, _, first) => (external ? handleFunction(__webpack_require__.I, data[0], 0, external, onInitialized, first) : onError());
/******/ 				var onInitialized = (_, external, first) => (handleFunction(external.get, data[1], getScope, 0, onFactory, first));
/******/ 				var onFactory = (factory) => {
/******/ 					data.p = 1;
/******/ 					__webpack_require__.m[id] = (module) => {
/******/ 						module.exports = factory();
/******/ 					}
/******/ 				};
/******/ 				handleFunction(__webpack_require__, data[2], 0, 0, onExternal, 1);
/******/ 			});
/******/ 		}
/******/ 	}
/******/ })();
/******/ 
/******/ /* webpack/runtime/sharing */
/******/ (() => {
/******/ 	__webpack_require__.S = {};
/******/ 	var initPromises = {};
/******/ 	var initTokens = {};
/******/ 	__webpack_require__.I = (name, initScope) => {
/******/ 		if(!initScope) initScope = [];
/******/ 		// handling circular init calls
/******/ 		var initToken = initTokens[name];
/******/ 		if(!initToken) initToken = initTokens[name] = {};
/******/ 		if(initScope.indexOf(initToken) >= 0) return;
/******/ 		initScope.push(initToken);
/******/ 		// only runs once
/******/ 		if(initPromises[name]) return initPromises[name];
/******/ 		// creates a new share scope if needed
/******/ 		if(!__webpack_require__.o(__webpack_require__.S, name)) __webpack_require__.S[name] = {};
/******/ 		// runs all init snippets from all modules reachable
/******/ 		var scope = __webpack_require__.S[name];
/******/ 		var warn = (msg) => (typeof console !== "undefined" && console.warn && console.warn(msg));
/******/ 		var uniqueName = "electron-react-typescript-webpack-2023";
/******/ 		var register = (name, version, factory, eager) => {
/******/ 			var versions = scope[name] = scope[name] || {};
/******/ 			var activeVersion = versions[version];
/******/ 			if(!activeVersion || (!activeVersion.loaded && (!eager != !activeVersion.eager ? eager : uniqueName > activeVersion.from))) versions[version] = { get: factory, from: uniqueName, eager: !!eager };
/******/ 		};
/******/ 		var initExternal = (id) => {
/******/ 			var handleError = (err) => (warn("Initialization of sharing external failed: " + err));
/******/ 			try {
/******/ 				var module = __webpack_require__(id);
/******/ 				if(!module) return;
/******/ 				var initFn = (module) => (module && module.init && module.init(__webpack_require__.S[name], initScope))
/******/ 				if(module.then) return promises.push(module.then(initFn, handleError));
/******/ 				var initResult = initFn(module);
/******/ 				if(initResult && initResult.then) return promises.push(initResult['catch'](handleError));
/******/ 			} catch(err) { handleError(err); }
/******/ 		}
/******/ 		var promises = [];
/******/ 		switch(name) {
/******/ 			case "default": {
/******/ 				initExternal("webpack/container/reference/microfr");
/******/ 			}
/******/ 			break;
/******/ 		}
/******/ 		if(!promises.length) return initPromises[name] = 1;
/******/ 		return initPromises[name] = Promise.all(promises).then(() => (initPromises[name] = 1));
/******/ 	};
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwX3dpbmRvdy42YTRkYTE1ZmUxYmNhYmI4ZDljYi5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXdDO0FBQ1o7QUFDNUIsYUFBYTtBQUNiLE1BQU0sS0FBSyxHQUFHLGlEQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsME5BQTZCLENBQUM7QUFFN0QsTUFBTSxXQUFXLEdBQWEsR0FBRyxFQUFFO0lBQ2pDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsK0NBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUVqRCxPQUFPLENBQ0wsb0VBQUssRUFBRSxFQUFDLE1BQU07UUFDWixvRUFBSyxTQUFTLEVBQUMsUUFBUTtZQUNyQixvRUFBSyxTQUFTLEVBQUMsY0FBYztnQkFDM0IsbUVBQUksU0FBUyxFQUFDLFFBQVEsa0NBQWlDLENBQ25ELENBQ0Y7UUFDTiwyREFBQyx1REFBYztZQUNiLDJEQUFDLEtBQUssSUFBQyxTQUFTLEVBQUUsRUFBRSxHQUFHLENBQ1IsQ0FDYixDQUNQLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUN0QjNCOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSwyQ0FBMkM7VUFDM0MsT0FBTztVQUNQO1VBQ0E7VUFDQSxNQUFNO1VBQ047VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EsR0FBRztVQUNIO1VBQ0E7Ozs7O1VDdERBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLG9KQUFvSjtVQUNwSjtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLElBQUksYUFBYTtVQUNqQjtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvLi9zcmMvcmVuZGVyZXIvY29tcG9uZW50cy9BcHBsaWNhdGlvbi50c3giLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIiwid2VicGFjazovL2VsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQtd2VicGFjay0yMDIzL3dlYnBhY2svcnVudGltZS9yZW1vdGVzIGxvYWRpbmciLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvd2VicGFjay9ydW50aW1lL3NoYXJpbmciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQgJy4vQXBwbGljYXRpb24uc2Nzcyc7XHJcbi8vIEB0cy1pZ25vcmVcclxuY29uc3QgTWljcm8gPSBSZWFjdC5sYXp5KCgpID0+IGltcG9ydCgnbWljcm9mci9BcHBsaWNhdGlvbicpKVxyXG5cclxuY29uc3QgQXBwbGljYXRpb246IFJlYWN0LkZDID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtkYXJrVGhlbWUsIHNldERhcmtUaGVtZV0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgaWQ9J2Vyd3QnPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0naGVhZGVyJz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWFpbi1oZWFkaW5nJz5cclxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9J3RoZW1lZCc+T21yb24gLSBSb2JvdCBEYXNoYm9hcmQgUG9DPC9oMT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxSZWFjdC5TdXNwZW5zZT5cclxuICAgICAgICA8TWljcm8gY2xhc3NOYW1lPXt7fX0vPlxyXG4gICAgICA8L1JlYWN0LlN1c3BlbnNlPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uO1xyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCIwMjQyNmU5YTY0MzRlMGVjMzVlNlwiKSIsInZhciBjaHVua01hcHBpbmcgPSB7XG5cdFwid2VicGFja19jb250YWluZXJfcmVtb3RlX21pY3JvZnJfQXBwbGljYXRpb25cIjogW1xuXHRcdFwid2VicGFjay9jb250YWluZXIvcmVtb3RlL21pY3JvZnIvQXBwbGljYXRpb25cIlxuXHRdXG59O1xudmFyIGlkVG9FeHRlcm5hbEFuZE5hbWVNYXBwaW5nID0ge1xuXHRcIndlYnBhY2svY29udGFpbmVyL3JlbW90ZS9taWNyb2ZyL0FwcGxpY2F0aW9uXCI6IFtcblx0XHRcImRlZmF1bHRcIixcblx0XHRcIi4vQXBwbGljYXRpb25cIixcblx0XHRcIndlYnBhY2svY29udGFpbmVyL3JlZmVyZW5jZS9taWNyb2ZyXCJcblx0XVxufTtcbl9fd2VicGFja19yZXF1aXJlX18uZi5yZW1vdGVzID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhjaHVua01hcHBpbmcsIGNodW5rSWQpKSB7XG5cdFx0Y2h1bmtNYXBwaW5nW2NodW5rSWRdLmZvckVhY2goKGlkKSA9PiB7XG5cdFx0XHR2YXIgZ2V0U2NvcGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLlI7XG5cdFx0XHRpZighZ2V0U2NvcGUpIGdldFNjb3BlID0gW107XG5cdFx0XHR2YXIgZGF0YSA9IGlkVG9FeHRlcm5hbEFuZE5hbWVNYXBwaW5nW2lkXTtcblx0XHRcdGlmKGdldFNjb3BlLmluZGV4T2YoZGF0YSkgPj0gMCkgcmV0dXJuO1xuXHRcdFx0Z2V0U2NvcGUucHVzaChkYXRhKTtcblx0XHRcdGlmKGRhdGEucCkgcmV0dXJuIHByb21pc2VzLnB1c2goZGF0YS5wKTtcblx0XHRcdHZhciBvbkVycm9yID0gKGVycm9yKSA9PiB7XG5cdFx0XHRcdGlmKCFlcnJvcikgZXJyb3IgPSBuZXcgRXJyb3IoXCJDb250YWluZXIgbWlzc2luZ1wiKTtcblx0XHRcdFx0aWYodHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09IFwic3RyaW5nXCIpXG5cdFx0XHRcdFx0ZXJyb3IubWVzc2FnZSArPSAnXFxud2hpbGUgbG9hZGluZyBcIicgKyBkYXRhWzFdICsgJ1wiIGZyb20gJyArIGRhdGFbMl07XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVtpZF0gPSAoKSA9PiB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZGF0YS5wID0gMDtcblx0XHRcdH07XG5cdFx0XHR2YXIgaGFuZGxlRnVuY3Rpb24gPSAoZm4sIGFyZzEsIGFyZzIsIGQsIG5leHQsIGZpcnN0KSA9PiB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0dmFyIHByb21pc2UgPSBmbihhcmcxLCBhcmcyKTtcblx0XHRcdFx0XHRpZihwcm9taXNlICYmIHByb21pc2UudGhlbikge1xuXHRcdFx0XHRcdFx0dmFyIHAgPSBwcm9taXNlLnRoZW4oKHJlc3VsdCkgPT4gKG5leHQocmVzdWx0LCBkKSksIG9uRXJyb3IpO1xuXHRcdFx0XHRcdFx0aWYoZmlyc3QpIHByb21pc2VzLnB1c2goZGF0YS5wID0gcCk7IGVsc2UgcmV0dXJuIHA7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdHJldHVybiBuZXh0KHByb21pc2UsIGQsIGZpcnN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gY2F0Y2goZXJyb3IpIHtcblx0XHRcdFx0XHRvbkVycm9yKGVycm9yKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0dmFyIG9uRXh0ZXJuYWwgPSAoZXh0ZXJuYWwsIF8sIGZpcnN0KSA9PiAoZXh0ZXJuYWwgPyBoYW5kbGVGdW5jdGlvbihfX3dlYnBhY2tfcmVxdWlyZV9fLkksIGRhdGFbMF0sIDAsIGV4dGVybmFsLCBvbkluaXRpYWxpemVkLCBmaXJzdCkgOiBvbkVycm9yKCkpO1xuXHRcdFx0dmFyIG9uSW5pdGlhbGl6ZWQgPSAoXywgZXh0ZXJuYWwsIGZpcnN0KSA9PiAoaGFuZGxlRnVuY3Rpb24oZXh0ZXJuYWwuZ2V0LCBkYXRhWzFdLCBnZXRTY29wZSwgMCwgb25GYWN0b3J5LCBmaXJzdCkpO1xuXHRcdFx0dmFyIG9uRmFjdG9yeSA9IChmYWN0b3J5KSA9PiB7XG5cdFx0XHRcdGRhdGEucCA9IDE7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVtpZF0gPSAobW9kdWxlKSA9PiB7XG5cdFx0XHRcdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRoYW5kbGVGdW5jdGlvbihfX3dlYnBhY2tfcmVxdWlyZV9fLCBkYXRhWzJdLCAwLCAwLCBvbkV4dGVybmFsLCAxKTtcblx0XHR9KTtcblx0fVxufSIsIl9fd2VicGFja19yZXF1aXJlX18uUyA9IHt9O1xudmFyIGluaXRQcm9taXNlcyA9IHt9O1xudmFyIGluaXRUb2tlbnMgPSB7fTtcbl9fd2VicGFja19yZXF1aXJlX18uSSA9IChuYW1lLCBpbml0U2NvcGUpID0+IHtcblx0aWYoIWluaXRTY29wZSkgaW5pdFNjb3BlID0gW107XG5cdC8vIGhhbmRsaW5nIGNpcmN1bGFyIGluaXQgY2FsbHNcblx0dmFyIGluaXRUb2tlbiA9IGluaXRUb2tlbnNbbmFtZV07XG5cdGlmKCFpbml0VG9rZW4pIGluaXRUb2tlbiA9IGluaXRUb2tlbnNbbmFtZV0gPSB7fTtcblx0aWYoaW5pdFNjb3BlLmluZGV4T2YoaW5pdFRva2VuKSA+PSAwKSByZXR1cm47XG5cdGluaXRTY29wZS5wdXNoKGluaXRUb2tlbik7XG5cdC8vIG9ubHkgcnVucyBvbmNlXG5cdGlmKGluaXRQcm9taXNlc1tuYW1lXSkgcmV0dXJuIGluaXRQcm9taXNlc1tuYW1lXTtcblx0Ly8gY3JlYXRlcyBhIG5ldyBzaGFyZSBzY29wZSBpZiBuZWVkZWRcblx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhfX3dlYnBhY2tfcmVxdWlyZV9fLlMsIG5hbWUpKSBfX3dlYnBhY2tfcmVxdWlyZV9fLlNbbmFtZV0gPSB7fTtcblx0Ly8gcnVucyBhbGwgaW5pdCBzbmlwcGV0cyBmcm9tIGFsbCBtb2R1bGVzIHJlYWNoYWJsZVxuXHR2YXIgc2NvcGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLlNbbmFtZV07XG5cdHZhciB3YXJuID0gKG1zZykgPT4gKHR5cGVvZiBjb25zb2xlICE9PSBcInVuZGVmaW5lZFwiICYmIGNvbnNvbGUud2FybiAmJiBjb25zb2xlLndhcm4obXNnKSk7XG5cdHZhciB1bmlxdWVOYW1lID0gXCJlbGVjdHJvbi1yZWFjdC10eXBlc2NyaXB0LXdlYnBhY2stMjAyM1wiO1xuXHR2YXIgcmVnaXN0ZXIgPSAobmFtZSwgdmVyc2lvbiwgZmFjdG9yeSwgZWFnZXIpID0+IHtcblx0XHR2YXIgdmVyc2lvbnMgPSBzY29wZVtuYW1lXSA9IHNjb3BlW25hbWVdIHx8IHt9O1xuXHRcdHZhciBhY3RpdmVWZXJzaW9uID0gdmVyc2lvbnNbdmVyc2lvbl07XG5cdFx0aWYoIWFjdGl2ZVZlcnNpb24gfHwgKCFhY3RpdmVWZXJzaW9uLmxvYWRlZCAmJiAoIWVhZ2VyICE9ICFhY3RpdmVWZXJzaW9uLmVhZ2VyID8gZWFnZXIgOiB1bmlxdWVOYW1lID4gYWN0aXZlVmVyc2lvbi5mcm9tKSkpIHZlcnNpb25zW3ZlcnNpb25dID0geyBnZXQ6IGZhY3RvcnksIGZyb206IHVuaXF1ZU5hbWUsIGVhZ2VyOiAhIWVhZ2VyIH07XG5cdH07XG5cdHZhciBpbml0RXh0ZXJuYWwgPSAoaWQpID0+IHtcblx0XHR2YXIgaGFuZGxlRXJyb3IgPSAoZXJyKSA9PiAod2FybihcIkluaXRpYWxpemF0aW9uIG9mIHNoYXJpbmcgZXh0ZXJuYWwgZmFpbGVkOiBcIiArIGVycikpO1xuXHRcdHRyeSB7XG5cdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG5cdFx0XHRpZighbW9kdWxlKSByZXR1cm47XG5cdFx0XHR2YXIgaW5pdEZuID0gKG1vZHVsZSkgPT4gKG1vZHVsZSAmJiBtb2R1bGUuaW5pdCAmJiBtb2R1bGUuaW5pdChfX3dlYnBhY2tfcmVxdWlyZV9fLlNbbmFtZV0sIGluaXRTY29wZSkpXG5cdFx0XHRpZihtb2R1bGUudGhlbikgcmV0dXJuIHByb21pc2VzLnB1c2gobW9kdWxlLnRoZW4oaW5pdEZuLCBoYW5kbGVFcnJvcikpO1xuXHRcdFx0dmFyIGluaXRSZXN1bHQgPSBpbml0Rm4obW9kdWxlKTtcblx0XHRcdGlmKGluaXRSZXN1bHQgJiYgaW5pdFJlc3VsdC50aGVuKSByZXR1cm4gcHJvbWlzZXMucHVzaChpbml0UmVzdWx0WydjYXRjaCddKGhhbmRsZUVycm9yKSk7XG5cdFx0fSBjYXRjaChlcnIpIHsgaGFuZGxlRXJyb3IoZXJyKTsgfVxuXHR9XG5cdHZhciBwcm9taXNlcyA9IFtdO1xuXHRzd2l0Y2gobmFtZSkge1xuXHRcdGNhc2UgXCJkZWZhdWx0XCI6IHtcblx0XHRcdGluaXRFeHRlcm5hbChcIndlYnBhY2svY29udGFpbmVyL3JlZmVyZW5jZS9taWNyb2ZyXCIpO1xuXHRcdH1cblx0XHRicmVhaztcblx0fVxuXHRpZighcHJvbWlzZXMubGVuZ3RoKSByZXR1cm4gaW5pdFByb21pc2VzW25hbWVdID0gMTtcblx0cmV0dXJuIGluaXRQcm9taXNlc1tuYW1lXSA9IFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKCgpID0+IChpbml0UHJvbWlzZXNbbmFtZV0gPSAxKSk7XG59OyJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==