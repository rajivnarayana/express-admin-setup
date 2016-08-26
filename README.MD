## Setup
```
npm install rajivnarayana/express-mongoose-admin-setup
```

## Dependencies

### mongoose

This module should be used only after you establish a connection with mongoose.

### cms-forms

This module depends on an other module to generate [forms](https://github.com/rajivnarayana/cms-forms)

These modules will also help you theme your pages and should be used as a middleware.
```javascript
import { render as formRenderer } from "cms-forms"
app.use(formRenderer);
```

These modules will populate res.html object and can be safely output into your layout engine pages.
Heres an example for master.jade
```jade
.container-fluid 
      :verbatim
        !{html.content}
```

## Usage

Create your User mongoose schema file
```javascript
import { Schema, model as Model } from "mongoose";

let schema = new Schema({
    name : String,
    password : String,
    email : String
});

export var model = Model('users', schema);
```

Use this model to add setup middleware.
```javascript
import * as express from "express";
import { render as formRenderer } from "cms-forms"
import * as scaffoldRouter from "express-mongoose-scaffold";
import { connect } from "mongoose";

let app = express();
connect(process.env.MONGO_URI || 'mongodb://localhost/your-db');

app.use(adminSetup('/setup',UserModel));

app.use(formRenderer);
app.use((req, res, next) => {
    if (res.html) {
        res.locals.html = res.html;
        res.render(res.html.layout || 'layouts/master');
        delete res.html;
    } else {
        next();
    }
})
```
## ToDo

* Ability to customize the code generated.
* Handle search and pagination.
* Expose internal Routers to be extensible.