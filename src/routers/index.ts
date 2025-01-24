import { Express, Router } from "express"
import authRoute from './auth/index'

const routes: { path: string, route: Router }[] = [
    {
        path: '/auth',
        route: authRoute
    }
]

export const applyRouters = (app: Express) => {
    routes.map(route => app.use(route.path, route.route))
};