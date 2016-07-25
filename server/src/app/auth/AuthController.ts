import * as express from 'express';
import {UserModel} from '../users/UserModel';
import {AuthUtils} from './AuthUtils';
import environment from '../../environment';


export class AuthController {
    public static signup(req: express.Request, res: express.Response) {
        UserModel.findOne({ email: req.body.email }).exec()
        .then(existingUser => {
            if(existingUser) {
                return Promise.resolve({
                    user: existingUser,
                    existing: true
                });
            }

            if(environment.debug) console.log(`Creating new user ${req.body.firstName} ${req.body.lastName} with email ${req.body.email}`);
            return UserModel.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            }).then(user => {
                return Promise.resolve({
                    existing: false,
                    user: user
                });
            });
        })
        .then(response => {
            if(response.existing) {
                return res.send({ message: `Email ${response.user.email} is in use`});
            }
            return res.send({ token: AuthUtils.createJWT(response.user)}); //I don't like this, I should be able to chain these promises
        })
        .catch(err => {
            console.log(err);
        });
    }

    public static login(req: express.Request, res: express.Response) {
        UserModel.findOne({ email: req.body.email }, '+password').exec()
        .then(user => {
            if(!user) {
                if(environment.debug) console.log("User doesn't exist");
                return res.send({ message: "Wrong email and/or password" });
            }
            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch) {
                    if(environment.debug) console.log("Password doesn't match");
                    return res.send({ message: "Wrong email and/or password" });
                }
                return res.send({ token: AuthUtils.createJWT(user) });
            });
        })
        .catch(err => {
            console.log(err);
        });
    }
}