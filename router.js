"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const express_1 = require("express");
const body_parser_1 = require("body-parser");
const cms_forms_1 = require("cms-forms");
class SetupRouter {
    constructor(odm) {
        this.odm = odm;
    }
    getRouter() {
        let router = express_1.Router();
        router.use(body_parser_1.urlencoded({ extended: false }));
        var relativeURL = relativeURL => relativeURL;
        router.use((req, res, next) => {
            res.locals.relativeURL = relativeURL = relativeURL => req.baseUrl + relativeURL;
            next();
        });
        router.route('/').all((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                let admin = yield this.odm.findOne({ role: 'admin' });
                if (admin)
                    throw new Error("Admin already created");
                else {
                    res.form = new AdminSignupForm();
                    res.form.action = relativeURL('');
                    next();
                }
            }
            catch (error) {
                next(error);
            }
        })).post((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body) {
                    throw new Error('Invalid username or password');
                }
                let admin = yield this.odm.addAdmin(req.body);
                res.redirect('/admin');
            }
            catch (error) {
                res.html.errors = error;
                next();
            }
        }));
        return router;
    }
}
exports.SetupRouter = SetupRouter;
let stringify = function (obj) {
    let stringValue = JSON.stringify(obj);
    return stringValue.replace(/"/g, "&quot;");
};
class AdminSignupForm extends cms_forms_1.Form {
    constructor() {
        super();
        this.method = "POST";
        this.fields = [
            {
                label: 'Name',
                labelClass: ['col-sm-2'],
                type: cms_forms_1.WidgetTypes.TextField,
                name: 'name',
            },
            {
                label: 'Email',
                labelClass: ['col-sm-2'],
                type: cms_forms_1.WidgetTypes.TextField,
                name: 'email',
            },
            {
                label: 'Password',
                labelClass: ['col-sm-2'],
                type: cms_forms_1.WidgetTypes.Password,
                name: 'password',
            },
            {
                type: cms_forms_1.WidgetTypes.Submit,
                name: 'register',
                value: 'Register',
                class: ['col-sm-8', 'col-sm-offset-2']
            }
        ];
    }
}
//# sourceMappingURL=router.js.map