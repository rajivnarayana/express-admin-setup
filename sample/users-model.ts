import { Schema, model as Model } from "mongoose";

let schema = new Schema({
    email : String,
    password : String,
    name : String,
    role : String
});

export var model = Model('users', schema);
