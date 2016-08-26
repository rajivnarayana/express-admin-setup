import { Router } from "express";
import { urlencoded } from "body-parser";
import { Form, Field, WidgetTypes } from "cms-forms";
import { ODM } from "./module";

export class SetupRouter {
    constructor(private odm : ODM, private redirectURL = '/admin') {
    }

    public getRouter() : Router {
        let router = Router();
        router.use(urlencoded({ extended: false }));

        var relativeURL = relativeURL => relativeURL;

        router.use((req, res, next) => {
            res.locals.relativeURL = relativeURL = relativeURL => req.baseUrl + relativeURL;
            next();
        });

        router.route('/').all(async (req, res, next) => {
            try {
                let admin = await this.odm.findOne({ role: 'admin' });
                if (admin) {
                    req.flash('info', 'Admin already created')
                    return res.redirect(this.redirectURL)
                }
                else {
                    res.form = new AdminSignupForm();
                    res.form.action = relativeURL('');
                    next();
                }
            } catch (error) {
                next(error);
            }
        }).post(async (req, res, next) => {
            try {
                if (!req.body) {
                    throw new Error('Invalid username or password');
                }
                let admin = await this.odm.addAdmin(req.body)
                res.redirect(this.redirectURL);
            } catch (error) {
                res.form.setValues(req.body);
                res.html.errors = error;
                next();
            }
        });
        return router;
    }
}


let stringify = function(obj) {
    let stringValue = JSON.stringify(obj);
    return stringValue.replace(/"/g, "&quot;");
}

class AdminSignupForm extends Form {

    constructor(){
        super();
        this.method = "POST";
        this.fields = [
            {
                label : 'Name',
                labelClass : ['col-sm-2'],
                type : WidgetTypes.TextField,
                name : 'name',
            },
            {
                label : 'Email',
                labelClass : ['col-sm-2'],
                type : WidgetTypes.TextField,
                name : 'email',
            },
            {
                label : 'Password',
                labelClass : ['col-sm-2'],
                type : WidgetTypes.Password,
                name : 'password',
            },
            {
                type : WidgetTypes.Submit,
                name : 'register',
                value : 'Register',
                class : ['col-sm-8','col-sm-offset-2']
            }
        ]
    }
}