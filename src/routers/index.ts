import { Express, Router } from "express";
import authRoute from './auth/auth.router';
import userRoute from './user/user.router';
import listingRouter from './listing/listing.router';

const routes: { path: string, route: Router }[] = [
    {
        path: '',
        route: listingRouter
    },
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/user',
        route: userRoute
    }
];

export const applyRouters = (app: Express) => {
    routes.map(route => app.use(route.path, route.route))
};