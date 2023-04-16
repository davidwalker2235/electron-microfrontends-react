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
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_rnd__WEBPACK_IMPORTED_MODULE_1__.Rnd, { bounds: true, style: style, default: {
                x: 0,
                y: 0,
                width: 320,
                height: 200
            } },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: { overflow: 'auto', 'alignItems': 'stretch', display: 'flex' } },
                react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Suspense), null,
                    react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Micro, { className: {} })))),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_rnd__WEBPACK_IMPORTED_MODULE_1__.Rnd, { style: style, default: {
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
/******/ 	__webpack_require__.h = () => ("f86209c703af2f2006bd")
/******/ })();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwX3dpbmRvdy40MmZhZGZlMDEwOTBhODk1Mjc2YS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFpRDtBQUNqQjtBQUNKO0FBQzVCLGFBQWE7QUFDYixNQUFNLEtBQUssR0FBRyxpREFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLDBOQUE2QixDQUFDO0FBQzdELE1BQU0sUUFBUSxHQUFHLGlEQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsNE9BQW1DLENBQUM7QUFFdEUsTUFBTSxXQUFXLEdBQWEsR0FBRyxFQUFFO0lBQ2pDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEdBQUcsK0NBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQyxNQUFNLEtBQUssR0FBRztRQUNWLE9BQU8sRUFBRSxNQUFNO1FBQ2YsY0FBYyxFQUFFLFFBQVE7UUFDeEIsTUFBTSxFQUFFLGlCQUFpQjtRQUN6QixVQUFVLEVBQUUsU0FBUztRQUNyQixVQUFVLEVBQUUsU0FBUztLQUN4QixDQUFDO0lBRUYsZ0RBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDWCxJQUFJLFNBQVMsRUFBRTtZQUNYLFlBQVksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ3ZDLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUM1QzthQUFNO1lBQ0gsWUFBWSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDdkMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1NBQy9DO0lBQ0wsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztJQUVsQixPQUFPLENBQ0wsb0VBQUssRUFBRSxFQUFDLE1BQU07UUFDWixvRUFBSyxTQUFTLEVBQUMsUUFBUTtZQUNyQixvRUFBSyxTQUFTLEVBQUMsY0FBYztnQkFDM0IsbUVBQUksU0FBUyxFQUFDLFFBQVEsa0NBQWlDLENBQ25ELENBQ0Y7UUFDSiwyREFBQywwQ0FBRyxJQUNBLE1BQU0sUUFDTixLQUFLLEVBQUUsS0FBSyxFQUNaLE9BQU8sRUFBRTtnQkFDTCxDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQztnQkFDSixLQUFLLEVBQUUsR0FBRztnQkFDVixNQUFNLEVBQUUsR0FBRzthQUNkO1lBRUQsb0VBQUssS0FBSyxFQUFFLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUM7Z0JBQ3BFLDJEQUFDLHVEQUFjO29CQUNYLDJEQUFDLEtBQUssSUFBQyxTQUFTLEVBQUUsRUFBRSxHQUFHLENBQ1YsQ0FDZixDQUNKO1FBQ04sMkRBQUMsMENBQUcsSUFDQSxLQUFLLEVBQUUsS0FBSyxFQUNaLE9BQU8sRUFBRTtnQkFDTCxDQUFDLEVBQUUsQ0FBQztnQkFDSixDQUFDLEVBQUUsQ0FBQztnQkFDSixLQUFLLEVBQUUsR0FBRztnQkFDVixNQUFNLEVBQUUsR0FBRzthQUNkO1lBRUQsb0VBQUssS0FBSyxFQUFFLEVBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUM7Z0JBQ3BFLDJEQUFDLHVEQUFjO29CQUNYLDJEQUFDLFFBQVEsSUFBQyxTQUFTLEVBQUUsRUFBRSxHQUFHLENBQ2IsQ0FDZixDQUNKLENBQ0osQ0FDUCxDQUFDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsaUVBQWUsV0FBVyxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDckUzQiIsInNvdXJjZXMiOlsid2VicGFjazovL2VsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQtd2VicGFjay0yMDIzLy4vc3JjL3JlbmRlcmVyL2NvbXBvbmVudHMvQXBwbGljYXRpb24udHN4Iiwid2VicGFjazovL2VsZWN0cm9uLXJlYWN0LXR5cGVzY3JpcHQtd2VicGFjay0yMDIzL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHt1c2VFZmZlY3QsIHVzZVN0YXRlfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IFJuZCB9IGZyb20gXCJyZWFjdC1ybmRcIjtcclxuaW1wb3J0ICcuL0FwcGxpY2F0aW9uLnNjc3MnO1xyXG4vLyBAdHMtaWdub3JlXHJcbmNvbnN0IE1pY3JvID0gUmVhY3QubGF6eSgoKSA9PiBpbXBvcnQoJ21pY3JvZnIvQXBwbGljYXRpb24nKSlcclxuY29uc3QgTWljcm90d28gPSBSZWFjdC5sYXp5KCgpID0+IGltcG9ydCgnbWljcm9mcnR3by9BcHBsaWNhdGlvbnR3bycpKVxyXG5cclxuY29uc3QgQXBwbGljYXRpb246IFJlYWN0LkZDID0gKCkgPT4ge1xyXG4gIGNvbnN0IFtkYXJrVGhlbWUsIHNldERhcmtUaGVtZV0gPSB1c2VTdGF0ZSh0cnVlKTtcclxuICAgIGNvbnN0IHN0eWxlID0ge1xyXG4gICAgICAgIGRpc3BsYXk6IFwiZmxleFwiLFxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiBcImNlbnRlclwiLFxyXG4gICAgICAgIGJvcmRlcjogXCJzb2xpZCAxcHggYmxhY2tcIixcclxuICAgICAgICBiYWNrZ3JvdW5kOiBcIiNmMGYwZjBcIixcclxuICAgICAgICBhbGlnbkl0ZW1zOiBcInN0cmV0Y2hcIixcclxuICAgIH07XHJcblxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgICBpZiAoZGFya1RoZW1lKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrLW1vZGUnLCAnMScpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstbW9kZScpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdkYXJrLW1vZGUnLCAnMCcpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2RhcmstbW9kZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0sIFtkYXJrVGhlbWVdKTtcclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgaWQ9J2Vyd3QnPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0naGVhZGVyJz5cclxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbWFpbi1oZWFkaW5nJz5cclxuICAgICAgICAgIDxoMSBjbGFzc05hbWU9J3RoZW1lZCc+T21yb24gLSBSb2JvdCBEYXNoYm9hcmQgUG9DPC9oMT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgICAgPFJuZFxyXG4gICAgICAgICAgICBib3VuZHNcclxuICAgICAgICAgICAgc3R5bGU9e3N0eWxlfVxyXG4gICAgICAgICAgICBkZWZhdWx0PXt7XHJcbiAgICAgICAgICAgICAgICB4OiAwLFxyXG4gICAgICAgICAgICAgICAgeTogMCxcclxuICAgICAgICAgICAgICAgIHdpZHRoOiAzMjAsXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwMFxyXG4gICAgICAgICAgICB9fVxyXG4gICAgICAgID5cclxuICAgICAgICAgICAgPGRpdiBzdHlsZT17e292ZXJmbG93OiAnYXV0bycsICdhbGlnbkl0ZW1zJzogJ3N0cmV0Y2gnLCBkaXNwbGF5OiAnZmxleCd9fT5cclxuICAgICAgICAgICAgICAgIDxSZWFjdC5TdXNwZW5zZT5cclxuICAgICAgICAgICAgICAgICAgICA8TWljcm8gY2xhc3NOYW1lPXt7fX0vPlxyXG4gICAgICAgICAgICAgICAgPC9SZWFjdC5TdXNwZW5zZT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9SbmQ+XHJcbiAgICAgICAgPFJuZFxyXG4gICAgICAgICAgICBzdHlsZT17c3R5bGV9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ9e3tcclxuICAgICAgICAgICAgICAgIHg6IDAsXHJcbiAgICAgICAgICAgICAgICB5OiAwLFxyXG4gICAgICAgICAgICAgICAgd2lkdGg6IDMyMCxcclxuICAgICAgICAgICAgICAgIGhlaWdodDogMjAwXHJcbiAgICAgICAgICAgIH19XHJcbiAgICAgICAgPlxyXG4gICAgICAgICAgICA8ZGl2IHN0eWxlPXt7b3ZlcmZsb3c6ICdhdXRvJywgJ2FsaWduSXRlbXMnOiAnc3RyZXRjaCcsIGRpc3BsYXk6ICdmbGV4J319PlxyXG4gICAgICAgICAgICAgICAgPFJlYWN0LlN1c3BlbnNlPlxyXG4gICAgICAgICAgICAgICAgICAgIDxNaWNyb3R3byBjbGFzc05hbWU9e3t9fS8+XHJcbiAgICAgICAgICAgICAgICA8L1JlYWN0LlN1c3BlbnNlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L1JuZD5cclxuICAgIDwvZGl2PlxyXG4gICk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBBcHBsaWNhdGlvbjtcclxuIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZjg2MjA5YzcwM2FmMmYyMDA2YmRcIikiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=