import {Router} from 'express';
import {AuthUtils} from '../../app/auth/AuthUtils';

export class UserRoutes {
    private router = Router();


    get routes(): Router {
        this.router.use(AuthUtils.ensureAuthenticated); //auth only applied for these paths
        
        return this.router;
    }
}