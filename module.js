"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator.throw(value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
class ODM {
    constructor(UsersModel, roleKey = 'role', role = 'admin') {
        this.UsersModel = UsersModel;
        this.roleKey = roleKey;
        this.role = role;
    }
    findOne(query, options = {}) {
        return __awaiter(this, void 0, Promise, function* () {
            return yield this.UsersModel.findOne(query, options).exec();
        });
    }
    addAdmin(body) {
        return __awaiter(this, void 0, Promise, function* () {
            body[this.roleKey] = this.role;
            return yield this.UsersModel.create(body);
        });
    }
}
exports.ODM = ODM;
//# sourceMappingURL=module.js.map