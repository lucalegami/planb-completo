exports.id = 447;
exports.ids = [447];
exports.modules = {

/***/ 1558:
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

Promise.resolve(/* import() eager */).then(__webpack_require__.bind(__webpack_require__, 2936))

/***/ }),

/***/ 2936:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ NavBar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6786);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1621);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9483);
/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8038);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* __next_internal_client_entry_do_not_use__ default auto */ 



function NavBar() {
    const pathname = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.usePathname)();
    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const [isLoggedIn, setIsLoggedIn] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const status = localStorage.getItem("isLoggedIn") === "true";
        setIsLoggedIn(status);
    }, []);
    const handleLogout = ()=>{
        localStorage.removeItem("isLoggedIn");
        router.push("/login");
    };
    const linkStyle = (path)=>({
            padding: "0.5rem 1rem",
            border: pathname === path ? "2px solid #4a70b9" : "2px solid transparent",
            color: pathname === path ? "#4a70b9" : "white",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            transition: "all 0.3s ease",
            borderRadius: "0"
        });
    const hoverStyle = {
        color: "#4a70b9",
        borderColor: "#4a70b9"
    };
    const links = [
        {
            href: "/",
            label: "\uD83C\uDFE0 Home"
        },
        {
            href: "/dashboard",
            label: "\uD83D\uDCCA Dashboard"
        },
        {
            href: "/proposte",
            label: "\uD83D\uDCA1 Proposte"
        },
        {
            href: "/radar",
            label: "\uD83D\uDCE1 Radar"
        },
        {
            href: "/crypto",
            label: "\uD83D\uDCB0 Crypto"
        },
        {
            href: "/segnali-wall-street",
            label: "SEGNALI WALL STREET"
        }
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("nav", {
        style: {
            padding: "1rem",
            borderBottom: "1px solid #333",
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
            backgroundColor: "#0d1117",
            fontFamily: "Inter, sans-serif"
        },
        children: [
            links.map((link)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                    href: link.href,
                    style: linkStyle(link.href),
                    onMouseEnter: (e)=>Object.assign(e.currentTarget.style, hoverStyle),
                    onMouseLeave: (e)=>Object.assign(e.currentTarget.style, linkStyle(link.href)),
                    children: link.label
                }, link.href)),
            isLoggedIn && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: handleLogout,
                style: {
                    marginLeft: "auto",
                    background: "transparent",
                    border: "2px solid #00ff88",
                    padding: "0.5rem 1rem",
                    borderRadius: "0",
                    color: "#00ff88",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                },
                onMouseEnter: (e)=>{
                    e.currentTarget.style.backgroundColor = "#00ff8820";
                },
                onMouseLeave: (e)=>{
                    e.currentTarget.style.backgroundColor = "transparent";
                },
                children: "Logout"
            })
        ]
    });
}


/***/ }),

/***/ 668:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ RootLayout),
  metadata: () => (/* binding */ metadata)
});

// EXTERNAL MODULE: external "next/dist/compiled/react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(6786);
// EXTERNAL MODULE: ./node_modules/next/font/google/target.css?{"path":"app\\layout.js","import":"Inter","arguments":[{"subsets":["latin"],"variable":"--font-inter"}],"variableName":"inter"}
var target_path_app_layout_js_import_Inter_arguments_subsets_latin_variable_font_inter_variableName_inter_ = __webpack_require__(9124);
var target_path_app_layout_js_import_Inter_arguments_subsets_latin_variable_font_inter_variableName_inter_default = /*#__PURE__*/__webpack_require__.n(target_path_app_layout_js_import_Inter_arguments_subsets_latin_variable_font_inter_variableName_inter_);
// EXTERNAL MODULE: ./app/globals.css
var globals = __webpack_require__(2817);
// EXTERNAL MODULE: ./node_modules/next/dist/build/webpack/loaders/next-flight-loader/module-proxy.js
var module_proxy = __webpack_require__(1313);
;// CONCATENATED MODULE: ./app/components/NavBar.js

const proxy = (0,module_proxy.createProxy)(String.raw`C:\Users\ester\Desktop\planb-completo\app\components\NavBar.js`)

// Accessing the __esModule property and exporting $$typeof are required here.
// The __esModule getter forces the proxy target to create the default export
// and the $$typeof value is for rendering logic to determine if the module
// is a client boundary.
const { __esModule, $$typeof } = proxy;
const __default__ = proxy.default;


/* harmony default export */ const NavBar = (__default__);
;// CONCATENATED MODULE: ./app/layout.js




const metadata = {
    title: "PlanB",
    description: "Smart Score Dashboard"
};
function RootLayout({ children }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("html", {
        lang: "it",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("body", {
            className: (target_path_app_layout_js_import_Inter_arguments_subsets_latin_variable_font_inter_variableName_inter_default()).variable,
            style: {
                backgroundColor: "#0d1117",
                color: "white",
                fontFamily: "Inter, sans-serif",
                margin: 0,
                padding: 0
            },
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx(NavBar, {}),
                /*#__PURE__*/ jsx_runtime_.jsx("main", {
                    children: children
                })
            ]
        })
    });
}


/***/ }),

/***/ 2817:
/***/ (() => {



/***/ })

};
;