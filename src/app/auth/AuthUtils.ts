import * as jwt from 'jwt-simple';
import * as moment from 'moment';
import environment from '../../environment';
import {IUser} from '../users/UserModel';
import * as express from 'express';

export class AuthUtils {
    public static createJWT(user: IUser): string {
        let payload = {
            sub: user._id,
            iat: moment().unix(),
            exp: moment().add(14, 'days').unix()
        }

        return jwt.encode(payload, environment.TOKEN_SECRET);
    }

    public static ensureAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction) {
        if(!req.headers['authorization']) {
            return res.send({ message: 'Please make sure your request has an Authorization header' });
        }

        let token = req.headers['authorization'].split(' ')[1];

        let payload = null;
        try {
            payload = jwt.decode(token, environment.TOKEN_SECRET);
        } catch (err) {
            return res.send({ message: err.message });
        }

        if(payload.exp <= moment().unix()) {
            return res.send({ message: 'Token has expired' });
        }

        req['user'] = payload.sub;
        next();
    }
}