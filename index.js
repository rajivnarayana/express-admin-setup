"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
const router_1 = require("./router");
const module_1 = require("./module");
function router(UsersModel) {
    return new router_1.SetupRouter(new module_1.ODM(UsersModel)).getRouter();
}
exports.router = router;
function setup(router_, userModel, path = '/setup', roleKey = 'role', role = 'admin') {
    let odm = new module_1.ODM(userModel, roleKey, role);
    router_.use(path, router(userModel));
    router_.use((req, res, next) => __awaiter(this, void 0, void 0, function* () {
        if (req.user || req.url && req.url == path) {
            return next();
        }
        let adminUser = yield odm.findOne({ [roleKey]: role });
        if (!adminUser) {
            res.redirect(req.baseUrl + path);
        }
        else {
            next();
        }
    }));
}
exports.setup = setup;
//# sourceMappingURL=index.js.map