"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("src/middleware",{

/***/ "(middleware)/./src/authconfig.js":
/*!***************************!*\
  !*** ./src/authconfig.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authConfig: () => (/* binding */ authConfig)\n/* harmony export */ });\nconst authConfig = {\n    pages: {\n        signIn: \"/login\"\n    },\n    callbacks: {\n        authorized ({ auth, request }) {\n            const isLoggedIn = !!auth?.user;\n            const isOnDashboard = request.nextUrl.pathname.startsWith(\"/dashboard\");\n            if (isOnDashboard) {\n                if (isLoggedIn) return true;\n                return false; // Redirect unauthenticated users to login page\n            } else if (isLoggedIn) {\n                return Response.redirect(new URL(\"/dashboard\", request.nextUrl));\n            }\n            console.log(\"Not authenticated\");\n            return true;\n        }\n    },\n    providers: []\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vc3JjL2F1dGhjb25maWcuanMiLCJtYXBwaW5ncyI6Ijs7OztBQUNPLE1BQU1BLGFBQWE7SUFDdEJDLE9BQU87UUFDSEMsUUFBUTtJQUNaO0lBQ0FDLFdBQVc7UUFDUEMsWUFBVyxFQUFDQyxJQUFJLEVBQUVDLE9BQU8sRUFBQztZQUN4QixNQUFNQyxhQUFhLENBQUMsQ0FBQ0YsTUFBTUc7WUFDM0IsTUFBTUMsZ0JBQWdCSCxRQUFRSSxPQUFPLENBQUNDLFFBQVEsQ0FBQ0MsVUFBVSxDQUFDO1lBQzFELElBQUlILGVBQWU7Z0JBQ2pCLElBQUlGLFlBQVksT0FBTztnQkFDdkIsT0FBTyxPQUFPLCtDQUErQztZQUMvRCxPQUFPLElBQUlBLFlBQVk7Z0JBQ3JCLE9BQU9NLFNBQVNDLFFBQVEsQ0FBQyxJQUFJQyxJQUFJLGNBQWNULFFBQVFJLE9BQU87WUFDaEU7WUFDQU0sUUFBUUMsR0FBRyxDQUFDO1lBQ1osT0FBTztRQUNUO0lBQ0Y7SUFDRkMsV0FBVyxFQUFFO0FBQ2pCLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2F1dGhjb25maWcuanM/NjQ0MyJdLCJzb3VyY2VzQ29udGVudCI6WyJcclxuZXhwb3J0IGNvbnN0IGF1dGhDb25maWcgPSB7XHJcbiAgICBwYWdlczoge1xyXG4gICAgICAgIHNpZ25JbjogXCIvbG9naW5cIixcclxuICAgIH0sXHJcbiAgICBjYWxsYmFja3M6IHtcclxuICAgICAgICBhdXRob3JpemVkKHthdXRoLCByZXF1ZXN0fSkgeyAgXHJcbiAgICAgICAgICBjb25zdCBpc0xvZ2dlZEluID0gISFhdXRoPy51c2VyO1xyXG4gICAgICAgICAgY29uc3QgaXNPbkRhc2hib2FyZCA9IHJlcXVlc3QubmV4dFVybC5wYXRobmFtZS5zdGFydHNXaXRoKCcvZGFzaGJvYXJkJyk7XHJcbiAgICAgICAgICBpZiAoaXNPbkRhc2hib2FyZCkge1xyXG4gICAgICAgICAgICBpZiAoaXNMb2dnZWRJbikgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTsgLy8gUmVkaXJlY3QgdW5hdXRoZW50aWNhdGVkIHVzZXJzIHRvIGxvZ2luIHBhZ2VcclxuICAgICAgICAgIH0gZWxzZSBpZiAoaXNMb2dnZWRJbikge1xyXG4gICAgICAgICAgICByZXR1cm4gUmVzcG9uc2UucmVkaXJlY3QobmV3IFVSTCgnL2Rhc2hib2FyZCcsIHJlcXVlc3QubmV4dFVybCkpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgY29uc29sZS5sb2coXCJOb3QgYXV0aGVudGljYXRlZFwiKTtcclxuICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sXHJcbiAgICBwcm92aWRlcnM6IFtdLFxyXG59ICJdLCJuYW1lcyI6WyJhdXRoQ29uZmlnIiwicGFnZXMiLCJzaWduSW4iLCJjYWxsYmFja3MiLCJhdXRob3JpemVkIiwiYXV0aCIsInJlcXVlc3QiLCJpc0xvZ2dlZEluIiwidXNlciIsImlzT25EYXNoYm9hcmQiLCJuZXh0VXJsIiwicGF0aG5hbWUiLCJzdGFydHNXaXRoIiwiUmVzcG9uc2UiLCJyZWRpcmVjdCIsIlVSTCIsImNvbnNvbGUiLCJsb2ciLCJwcm92aWRlcnMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(middleware)/./src/authconfig.js\n");

/***/ })

});