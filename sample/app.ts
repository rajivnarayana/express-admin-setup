import * as express from "express";
import { Router } from "express";
import { Application, Request, Response } from "express";
import { OK } from "http-status-codes";
import * as scaffoldRouter from "express-mongoose-scaffold";
import { connect } from "mongoose";
import { render as formRenderer } from "cms-forms";
import * as path from "path";
import { setup as adminSetup } from "express-mongoose-admin-setup";
import { model as UsersModel } from "./users-model";

connect(process.env.MONGO_URL || "mongodb://localhost/admin-setup-router-demo");

let app :Application = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.get('/', (request : Request, response : Response) => {
    response.status(OK).send("Hello World");
});

let adminRouter = Router();
app.use('/admin', adminRouter);
adminSetup(adminRouter, UsersModel);
adminRouter.get('/', (req, res, next) => {
    res.html = {content : 'Hello World'};
    next();
})

app.use(formRenderer);

app.use((req, res, next) => {
    if (res.html) {
        if (res.html.errors && !Array.isArray(res.html.errors)) {
            res.html.errors = [res.html.errors];
        }
        res.locals.html = res.html;
        res.render(res.html.layout || 'layouts/master');
        delete res.html;
    } else {
        next();
    }
})

export = app;