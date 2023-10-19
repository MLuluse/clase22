import express from 'express'
import jwtRouter from './routers/jwt.router.js'
import passport from 'passport'
import initializePassport from './config/passport.config.js'
import cookieParser from 'cookie-parser'


const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser('secret'))

initializePassport()
app.use(passport.initialize())


app.use(express.static('./src/public'))
app.use('/jwt', jwtRouter)

app.listen(8080, () => console.log('Server Up!'))