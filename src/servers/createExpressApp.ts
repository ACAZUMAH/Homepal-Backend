import express from 'express'
import helmet, { HelmetOptions } from "helmet"
import cors from "cors"
import { isDevelopment, isProduction, productionWhitelist } from 'src/common/contants'

const helmetOptioons: HelmetOptions = {
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false
}

const corsOptions = {
    maxAge: 600,
    credentials: true,
    origin: (origin: any, callback: (err: Error | null, allow?: boolean) => void) => {
        if(!origin){
            callback(null, true)
        }else if(isDevelopment){
            callback(null, true)
        }else if(isProduction && productionWhitelist.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error(`Not allowed by CORS: ${origin}`))
        }
    }
}

export const createExpressApp = () => {
    const app = express()
    
    app.use(express.urlencoded({ extended: true }))

    app.use(express.json({ limit: '50mb' }))

    app.use(helmet(helmetOptioons))

    app.use(helmet.hidePoweredBy())
    app.disable("x-powered-by")

    app.options("*", cors())

    app.use(cors(corsOptions))

    app.get('/', (_: express.Request, res: express.Response) => {
        res.json("hello world")
    })

    return app
}