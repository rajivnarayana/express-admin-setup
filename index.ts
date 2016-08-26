import { SetupRouter } from "./router";
import { ODM } from "./module";
import { Router } from "express";

export function router(UsersModel) : Router {
    return new SetupRouter(new ODM(UsersModel)).getRouter();
}

export function setup(router_: Router, userModel, path = '/setup', roleKey = 'role', role = 'admin') {
    let odm = new ODM(userModel, roleKey, role);
    router_.use(path, router(userModel));

    router_.use(async (req, res, next) => {
        if (req.user || req.url && req.url == path) {
            return next();
        }
        let adminUser = await odm.findOne({[roleKey] : role});
        if (!adminUser) {
            res.redirect(req.baseUrl+path);
        } else {
            next();
        }
    })
}