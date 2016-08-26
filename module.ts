import { Document, Types } from 'mongoose';

export class ODM {
    constructor(public UsersModel, public roleKey = 'role', public role = 'admin') {
    }
    public async findOne(query, options: any = {}): Promise<Document> {
        return await this.UsersModel.findOne(query, options).exec();
    }

    public async addAdmin(body): Promise<Document> {
        body[this.roleKey] = this.role;
        return await this.UsersModel.create(body);
    }
}