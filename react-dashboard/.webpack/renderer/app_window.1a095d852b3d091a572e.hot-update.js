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
/* harmony import */ var react_rnd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-rnd */ "./node_modules/react-rnd/lib/index.js");
/* harmony import */ var _Application_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Application.scss */ "./src/renderer/components/Application.scss");
/* provided dependency */ var __react_refresh_utils__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/lib/runtime/RefreshUtils.js");
/* provided dependency */ var __react_refresh_error_overlay__ = __webpack_require__(/*! ./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js */ "./node_modules/@pmmmwh/react-refresh-webpack-plugin/overlay/index.js");
__webpack_require__.$Refresh$.runtime = __webpack_require__(/*! ./node_modules/react-refresh/runtime.js */ "./node_modules/react-refresh/runtime.js");




// @ts-ignore
const Micro = react__WEBPACK_IMPORTED_MODULE_0___default().lazy(() => __webpack_require__.e(/*! import() */ "webpack_container_remote_microfr_Application").then(__webpack_require__.t.bind(__webpack_require__, /*! microfr/Application */ "webpack/container/remote/microfr/Application", 23)));
const Microtwo = react__WEBPACK_IMPORTED_MODULE_0___default().lazy(() => __webpack_require__.e(/*! import() */ "webpack_container_remote_microfrtwo_Applicationtwo").then(__webpack_require__.t.bind(__webpack_require__, /*! microfrtwo/Applicationtwo */ "webpack/container/remote/microfrtwo/Applicationtwo", 23)));
const Application = () => {
    const [darkTheme, setDarkTheme] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
    const style = {
        display: "flex",
        justifyContent: "center",
        border: "solid 1px black",
        background: "#f0f0f0",
        alignItems: "stretch",
    };
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
        if (darkTheme) {
            localStorage.setItem('dark-mode', '1');
            document.body.classList.add('dark-mode');
        }
        else {
            localStorage.setItem('dark-mode', '0');
            document.body.classList.remove('dark-mode');
        }
    }, [darkTheme]);
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { id: 'erwt' },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: 'header' },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { className: 'main-heading' },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", { className: 'themed' }, "Omron - Robot Dashboard PoC"))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_rnd__WEBPACK_IMPORTED_MODULE_1__.Rnd, { bounds: "parent", style: style, default: {
                    x: 0,
                    y: 100,
                    width: 500,
                    height: 500
                } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { overflow: 'auto', 'alignItems': 'stretch', display: 'flex' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Suspense), null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Micro, { className: {} })))),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_rnd__WEBPACK_IMPORTED_MODULE_1__.Rnd, { bounds: "parent", style: style, default: {
                    x: 600,
                    y: 100,
                    width: 500,
                    height: 500
                } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { overflow: 'auto', 'alignItems': 'stretch', display: 'flex' } },
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Suspense), null,
                        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Microtwo, { className: {} })))))));
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
/******/ 	__webpack_require__.h = () => ("dea0abd81354968af6ae")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwX3dpbmRvdy4xYTA5NWQ4NTJiM2QwOTFhNTcyZS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFpRDtBQUNqQjtBQUNKO0FBQzVCLGFBQWE7QUFDYixNQUFNLEtBQUssR0FBRyxpREFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDBOQUE2QixDQUFDO0FBQzdELE1BQU0sUUFBUSxHQUFHLGlEQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsNE9BQW1DLENBQUM7QUFFdEUsTUFBTSxXQUFXLEdBQWEsR0FBRyxFQUFFO0lBQ2pDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsK0NBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxNQUFNLEtBQUssR0FBRztRQUNWLE9BQU8sRUFBRSxNQUFNO1FBQ2YsY0FBYyxFQUFFLFFBQVE7UUFDeEIsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixVQUFVLEVBQUUsU0FBUztRQUNyQixVQUFVLEVBQUUsU0FBUztLQUN4QixDQUFDO0lBRUYsZ0RBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDWCxJQUFJLFNBQVMsRUFBRTtZQUNYLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0gsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUVsQixPQUFPLENBQ0wsb0VBQUssRUFBRSxFQUFDLE1BQU07UUFDWixvRUFBSyxTQUFTLEVBQUMsUUFBUTtZQUNyQixvRUFBSyxTQUFTLEVBQUMsY0FBYztnQkFDM0IsbUVBQUksU0FBUyxFQUFDLFFBQVEsa0NBQWlDLENBQ25ELENBQ0Y7UUFDSjtZQUNJLDJEQUFDLDBDQUFHLElBQ0EsTUFBTSxFQUFDLFFBQVEsRUFDZixLQUFLLEVBQUUsS0FBSyxFQUNaLE9BQU8sRUFBRTtvQkFDTCxDQUFDLEVBQUUsQ0FBQztvQkFDSixDQUFDLEVBQUUsR0FBRztvQkFDTixLQUFLLEVBQUUsR0FBRztvQkFDVixNQUFNLEVBQUUsR0FBRztpQkFDZDtnQkFFRCxvRUFBSyxLQUFLLEVBQUUsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBQztvQkFDcEUsMkRBQUMsdURBQWM7d0JBQ1gsMkRBQUMsS0FBSyxJQUFDLFNBQVMsRUFBRSxFQUFFLEdBQUcsQ0FDVixDQUNmLENBQ0o7WUFDTiwyREFBQywwQ0FBRyxJQUNBLE1BQU0sRUFBQyxRQUFRLEVBQ2YsS0FBSyxFQUFFLEtBQUssRUFDWixPQUFPLEVBQUU7b0JBQ0wsQ0FBQyxFQUFFLEdBQUc7b0JBQ04sQ0FBQyxFQUFFLEdBQUc7b0JBQ04sS0FBSyxFQUFFLEdBQUc7b0JBQ1YsTUFBTSxFQUFFLEdBQUc7aUJBQ2Q7Z0JBRUQsb0VBQUssS0FBSyxFQUFFLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUM7b0JBQ3BFLDJEQUFDLHVEQUFjO3dCQUNYLDJEQUFDLFFBQVEsSUFBQyxTQUFTLEVBQUUsRUFBRSxHQUFHLENBQ2IsQ0FDZixDQUNKLENBQ0osQ0FDSixDQUNQLENBQUM7QUFDSixDQUFDLENBQUM7QUFFRixpRUFBZSxXQUFXLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7VUN4RTNCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvLi9zcmMvcmVuZGVyZXIvY29tcG9uZW50cy9BcHBsaWNhdGlvbi50c3giLCJ3ZWJwYWNrOi8vZWxlY3Ryb24tcmVhY3QtdHlwZXNjcmlwdC13ZWJwYWNrLTIwMjMvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwge3VzZUVmZmVjdCwgdXNlU3RhdGV9IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgUm5kIH0gZnJvbSBcInJlYWN0LXJuZFwiO1xyXG5pbXBvcnQgJy4vQXBwbGljYXRpb24uc2Nzcyc7XHJcbi8vIEB0cy1pZ25vcmVcclxuY29uc3QgTWljcm8gPSBSZWFjdC5sYXp5KCgpID0+IGltcG9ydCgnbWljcm9mci9BcHBsaWNhdGlvbicpKVxyXG5jb25zdCBNaWNyb3R3byA9IFJlYWN0LmxhenkoKCkgPT4gaW1wb3J0KCdtaWNyb2ZydHdvL0FwcGxpY2F0aW9udHdvJykpXHJcblxyXG5jb25zdCBBcHBsaWNhdGlvbjogUmVhY3QuRkMgPSAoKSA9PiB7XHJcbiAgY29uc3QgW2RhcmtUaGVtZSwgc2V0RGFya1RoZW1lXSA9IHVzZVN0YXRlKHRydWUpO1xyXG4gICAgY29uc3Qgc3R5bGUgPSB7XHJcbiAgICAgICAgZGlzcGxheTogXCJmbGV4XCIsXHJcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgYm9yZGVyOiBcInNvbGlkIDFweCBibGFja1wiLFxyXG4gICAgICAgIGJhY2tncm91bmQ6IFwiI2YwZjBmMFwiLFxyXG4gICAgICAgIGFsaWduSXRlbXM6IFwic3RyZXRjaFwiLFxyXG4gICAgfTtcclxuXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICAgIGlmIChkYXJrVGhlbWUpIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhcmstbW9kZScsICcxJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnZGFyay1tb2RlJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhcmstbW9kZScsICcwJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZGFyay1tb2RlJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgW2RhcmtUaGVtZV0pO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBpZD0nZXJ3dCc+XHJcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdoZWFkZXInPlxyXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtYWluLWhlYWRpbmcnPlxyXG4gICAgICAgICAgPGgxIGNsYXNzTmFtZT0ndGhlbWVkJz5PbXJvbiAtIFJvYm90IERhc2hib2FyZCBQb0M8L2gxPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICA8Um5kXHJcbiAgICAgICAgICAgICAgICBib3VuZHM9XCJwYXJlbnRcIlxyXG4gICAgICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxyXG4gICAgICAgICAgICAgICAgZGVmYXVsdD17e1xyXG4gICAgICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgeTogMTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiA1MDAsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA1MDBcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tvdmVyZmxvdzogJ2F1dG8nLCAnYWxpZ25JdGVtcyc6ICdzdHJldGNoJywgZGlzcGxheTogJ2ZsZXgnfX0+XHJcbiAgICAgICAgICAgICAgICAgICAgPFJlYWN0LlN1c3BlbnNlPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8TWljcm8gY2xhc3NOYW1lPXt7fX0vPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvUmVhY3QuU3VzcGVuc2U+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9SbmQ+XHJcbiAgICAgICAgICAgIDxSbmRcclxuICAgICAgICAgICAgICAgIGJvdW5kcz1cInBhcmVudFwiXHJcbiAgICAgICAgICAgICAgICBzdHlsZT17c3R5bGV9XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0PXt7XHJcbiAgICAgICAgICAgICAgICAgICAgeDogNjAwLFxyXG4gICAgICAgICAgICAgICAgICAgIHk6IDEwMCxcclxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogNTAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNTAwXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7b3ZlcmZsb3c6ICdhdXRvJywgJ2FsaWduSXRlbXMnOiAnc3RyZXRjaCcsIGRpc3BsYXk6ICdmbGV4J319PlxyXG4gICAgICAgICAgICAgICAgICAgIDxSZWFjdC5TdXNwZW5zZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPE1pY3JvdHdvIGNsYXNzTmFtZT17e319Lz5cclxuICAgICAgICAgICAgICAgICAgICA8L1JlYWN0LlN1c3BlbnNlPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvUm5kPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uO1xyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCJkZWEwYWJkODEzNTQ5NjhhZjZhZVwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==