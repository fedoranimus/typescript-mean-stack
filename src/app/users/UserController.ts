import * as express from 'express';
import {UserModel} from './UserModel';
import environment from '../../environment';

export class UserController {
    public static getUser(req: express.Request, res: express.Response) {
        UserModel.findById(req['user']).exec()
        .then(user => {
            if(!user) {
                return res.send({ message: 'User not found' });
            }
            res.send(user);
        })
        .catch(err => {
            console.log(err);
        });
    }

    public static updateUser(req: express.Request, res: express.Response) {
        UserModel.findByIdAndUpdate(req['user'], req.body).exec();
    }

    public static deleteUser(req: express.Request, res: express.Response) {
        UserModel.findByIdAndRemove(req['user']).exec();
    }

}