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
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_rnd__WEBPACK_IMPORTED_MODULE_1__.Rnd, { bounds: "parent", style: style, default: {
                x: 0,
                y: 0,
                width: 320,
                height: 200
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { overflow: 'auto', 'alignItems': 'stretch', display: 'flex' } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Suspense), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Micro, { className: {} })))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_rnd__WEBPACK_IMPORTED_MODULE_1__.Rnd, { bounds: "parent", style: style, default: {
                x: 0,
                y: 0,
                width: 320,
                height: 200
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { overflow: 'auto', 'alignItems': 'stretch', display: 'flex' } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Suspense), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Microtwo, { className: {} }))))));
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
/******/ 	__webpack_require__.h = () => ("7ba03f1e12ca52b89300")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwX3dpbmRvdy5mODYyMDljNzAzYWYyZjIwMDZiZC5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFpRDtBQUNqQjtBQUNKO0FBQzVCLGFBQWE7QUFDYixNQUFNLEtBQUssR0FBRyxpREFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDBOQUE2QixDQUFDO0FBQzdELE1BQU0sUUFBUSxHQUFHLGlEQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsNE9BQW1DLENBQUM7QUFFdEUsTUFBTSxXQUFXLEdBQWEsR0FBRyxFQUFFO0lBQ2pDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsK0NBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxNQUFNLEtBQUssR0FBRztRQUNWLE9BQU8sRUFBRSxNQUFNO1FBQ2YsY0FBYyxFQUFFLFFBQVE7UUFDeEIsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixVQUFVLEVBQUUsU0FBUztRQUNyQixVQUFVLEVBQUUsU0FBUztLQUN4QixDQUFDO0lBRUYsZ0RBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDWCxJQUFJLFNBQVMsRUFBRTtZQUNYLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0gsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUVsQixPQUFPLENBQ0wsb0VBQUssRUFBRSxFQUFDLE1BQU07UUFDWixvRUFBSyxTQUFTLEVBQUMsUUFBUTtZQUNyQixvRUFBSyxTQUFTLEVBQUMsY0FBYztnQkFDM0IsbUVBQUksU0FBUyxFQUFDLFFBQVEsa0NBQWlDLENBQ25ELENBQ0Y7UUFDSiwyREFBQywwQ0FBRyxJQUNBLE1BQU0sRUFBQyxRQUFRLEVBQ2YsS0FBSyxFQUFFLEtBQUssRUFDWixPQUFPLEVBQUU7Z0JBQ0wsQ0FBQyxFQUFFLENBQUM7Z0JBQ0osQ0FBQyxFQUFFLENBQUM7Z0JBQ0osS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsTUFBTSxFQUFFLEdBQUc7YUFDZDtZQUVELG9FQUFLLEtBQUssRUFBRSxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFDO2dCQUNwRSwyREFBQyx1REFBYztvQkFDWCwyREFBQyxLQUFLLElBQUMsU0FBUyxFQUFFLEVBQUUsR0FBRyxDQUNWLENBQ2YsQ0FDSjtRQUNOLDJEQUFDLDBDQUFHLElBQ0EsTUFBTSxFQUFDLFFBQVEsRUFDZixLQUFLLEVBQUUsS0FBSyxFQUNaLE9BQU8sRUFBRTtnQkFDTCxDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQztnQkFDSixLQUFLLEVBQUUsR0FBRztnQkFDVixNQUFNLEVBQUUsR0FBRzthQUNkO1lBRUQsb0VBQUssS0FBSyxFQUFFLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUM7Z0JBQ3BFLDJEQUFDLHVEQUFjO29CQUNYLDJEQUFDLFFBQVEsSUFBQyxTQUFTLEVBQUUsRUFBRSxHQUFHLENBQ2IsQ0FDZixDQUNKLENBQ0osQ0FDUCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDdEUzQiIsInNvdXJjZXMiOlsid2VicGFjazovL2VsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQtd2VicGFjay0yMDIzLy4vc3JjL3JlbmRlcmVyL2NvbXBvbmVudHMvQXBwbGljYXRpb24udHN4Iiwid2VicGFjazovL2VsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQtd2VicGFjay0yMDIzL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHt1c2VFZmZlY3QsIHVzZVN0YXRlfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJuZCB9IGZyb20gXCJyZWFjdC1ybmRcIjtcclxuaW1wb3J0ICcuL0FwcGxpY2F0aW9uLnNjc3MnO1xyXG4vLyBAdHMtaWdub3JlXHJcbmNvbnN0IE1pY3JvID0gUmVhY3QubGF6eSgoKSA9PiBpbXBvcnQoJ21pY3JvZnIvQXBwbGljYXRpb24nKSlcclxuY29uc3QgTWljcm90d28gPSBSZWFjdC5sYXp5KCgpID0+IGltcG9ydCgnbWljcm9mcnR3by9BcHBsaWNhdGlvbnR3bycpKVxyXG5cclxuY29uc3QgQXBwbGljYXRpb246IFJlYWN0LkZDID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtkYXJrVGhlbWUsIHNldERhcmtUaGVtZV0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICAgIGNvbnN0IHN0eWxlID0ge1xyXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxyXG4gICAgICAgIGJvcmRlcjogXCJzb2xpZCAxcHggYmxhY2tcIixcclxuICAgICAgICBiYWNrZ3JvdW5kOiBcIiNmMGYwZjBcIixcclxuICAgICAgICBhbGlnbkl0ZW1zOiBcInN0cmV0Y2hcIixcclxuICAgIH07XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoZGFya1RoZW1lKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrLW1vZGUnLCAnMScpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrLW1vZGUnLCAnMCcpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmstbW9kZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtkYXJrVGhlbWVdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgaWQ9J2Vyd3QnPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0naGVhZGVyJz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWFpbi1oZWFkaW5nJz5cclxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9J3RoZW1lZCc+T21yb24gLSBSb2JvdCBEYXNoYm9hcmQgUG9DPC9oMT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgICAgPFJuZFxyXG4gICAgICAgICAgICBib3VuZHM9XCJwYXJlbnRcIlxyXG4gICAgICAgICAgICBzdHlsZT17c3R5bGV9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ9e3tcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMyMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMjAwXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7b3ZlcmZsb3c6ICdhdXRvJywgJ2FsaWduSXRlbXMnOiAnc3RyZXRjaCcsIGRpc3BsYXk6ICdmbGV4J319PlxyXG4gICAgICAgICAgICAgICAgPFJlYWN0LlN1c3BlbnNlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxNaWNybyBjbGFzc05hbWU9e3t9fS8+XHJcbiAgICAgICAgICAgICAgICA8L1JlYWN0LlN1c3BlbnNlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L1JuZD5cclxuICAgICAgICA8Um5kXHJcbiAgICAgICAgICAgIGJvdW5kcz1cInBhcmVudFwiXHJcbiAgICAgICAgICAgIHN0eWxlPXtzdHlsZX1cclxuICAgICAgICAgICAgZGVmYXVsdD17e1xyXG4gICAgICAgICAgICAgICAgeDogMCxcclxuICAgICAgICAgICAgICAgIHk6IDAsXHJcbiAgICAgICAgICAgICAgICB3aWR0aDogMzIwLFxyXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAyMDBcclxuICAgICAgICAgICAgfX1cclxuICAgICAgICA+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3tvdmVyZmxvdzogJ2F1dG8nLCAnYWxpZ25JdGVtcyc6ICdzdHJldGNoJywgZGlzcGxheTogJ2ZsZXgnfX0+XHJcbiAgICAgICAgICAgICAgICA8UmVhY3QuU3VzcGVuc2U+XHJcbiAgICAgICAgICAgICAgICAgICAgPE1pY3JvdHdvIGNsYXNzTmFtZT17e319Lz5cclxuICAgICAgICAgICAgICAgIDwvUmVhY3QuU3VzcGVuc2U+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDwvUm5kPlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEFwcGxpY2F0aW9uO1xyXG4iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSAoKSA9PiAoXCI3YmEwM2YxZTEyY2E1MmI4OTMwMFwiKSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==