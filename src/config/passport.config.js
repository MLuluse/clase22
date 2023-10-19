import passport from "passport";
import jwt from 'passport-jwt'

const JWTStrategy = jwt.Strategy

const cookieExtractor = req => {
    const token = (req && req.signedCookies) ? req.signedCookies['jwt-coder'] : null
    return token
}

const initializePassport = () =>{
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]), //funcion de donde se va a extraer el token (cookie en este caso)
        secretOrKey: 'secret'
    }, async(jwt_payload, done) => {   //aca el passport recibe el payload del token  en este middleware hace la modificacion para el admin
        try {
            if (jwt_payload.user.role === 'admin')  return done(null, jwt_payload)
            else return done(null, 'error')
        } catch(error) {
            return done(error)
        }
    }))

}

export default initializePassport