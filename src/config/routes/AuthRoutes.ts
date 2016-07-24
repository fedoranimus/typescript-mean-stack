import {Router} from 'express';
import {AuthController} from '../../app/auth/AuthController';

export class AuthRoutes {
    private router = Router();


    get routes(): Router {
        this.router.post('/signup', AuthController.signup);
        this.router.post('/login', AuthController.login);

        // router.post('/google', google.authenticate);
        // router.post('/twitter', twitter.authenticate);
        // router.post('/facebook', facebook.authenticate);

        return this.router;
    }
}