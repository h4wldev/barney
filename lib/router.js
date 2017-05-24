"use strict";
const http = require("http");
const parse = require("co-body");
const status = require("http-status");

class Router {
    constructor(app) {
        this.app = null;
        this.app = app;
    }

    use(path, route, children = null) {
        this._call(path, route);
        if (children !== null) {
            for (const cRoute of children) {
                this._callChildren(path, cRoute);
            }
        }
    }

    _call(path, route) {
        const routeMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(route));
        for (const method of routeMethods) {
            if (http.METHODS.indexOf(method.toUpperCase()) > 0) {
                const getParams = this._getParams;
                const getQuery = this._getQuery;

                this.app[method](path, function* (req, res) {
                    const url = req.url.split("?");

                    route.req = req;
                    route.req.body = yield parse(req);
                    route.res = res;
                    route.params = getParams(path, url[0]);
                    route.query = getQuery(url[1]);

                    return yield route[method]();
                });
            }
        }
    }

    _getParams(path, url) {
        const params = {};
        const keys = path.split("/").map((key) => {
            return [key.indexOf(":") > -1, key.replace(":", "")];
        });
        url.split("/").forEach((value, index) => {
            if (keys[index][0]) {
                params[String(keys[index][1])] = value;
            }
        });
        return params;
    }

    _getQuery(url) {
        if (!url) {
            return {};
        }
        return (/^[?#]/.test(url) ? url.slice(1) : url).split("&").reduce((params, param) => {
            let [key, value] = param.split("=");
            params[key] = value ? decodeURIComponent(value.replace(/\+/g, " ")) : "";
            return params;
        }, {});
    }

    _callChildren(path, route) {
        const cPath = (route.path.charAt(0) === "/") ? route.path.slice(1) : route.path;
        path = ((path === "/") ? "" : path) + "/" + cPath;
        this._call(path, route.route);
        if (route.children !== undefined) {
            for (const cRoute of route.children) {
                this._callChildren(path, cRoute);
            }
        }
    }
}

exports.default = Router;
exports.status = status;
