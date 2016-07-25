import {Router} from 'express';
import {AuthUtils} from '../../app/auth/AuthUtils';
import {UserController} from '../../app/users/UserController';

export class UserRoutes {
    private router = Router();


    get routes(): Router {
        this.router.use(AuthUtils.ensureAuthenticated); //auth only applied for these paths
        
        this.router.get('/user', UserController.getUser);
        this.router.put('/user', UserController.updateUser);
        this.router.delete('/user', UserController.deleteUser);

        return this.router;
    }
}