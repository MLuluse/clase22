import { Router } from "express";
import cookieParse from "cookie-parser";
import { generateToken, authToken } from "../utils.js";
import passport from "passport";

const router = Router()

const users = [{email: 'lulu@gmail.com', password: 'secret', role: 'user'}, 
               {email: 'admin@gmail.com', password: 'secret', role: 'admin'},
            ]

router.post('./register', (req, res) => {
    const user = req.body
    if(users.find ( u => u.email === u.email)){ // si encuentra un usuario con esos datos no puedo registrar otro con la misma data
        return res.status(400).send({status: 'error', error: 'User already exists'})
    }
    user.push(user)
    const access_token = generateToken(user)
    res.status({status: 'success', access_token})

})

router.post('/login', (req, res) => {
    const { email, password } = req.body
    const user = users.find( u => u.email === email && u.password === password )  //busca el user en db o aca en el archivo
    if(!user) return res.status(400).send({status: 'error', error: 'Invalid credentials'}) // si no encuentra al user error
    const access_token = generateToken(users) // si lo encuentra genera el token
   // res.send({status: 'success', access_token})  // aca  se lo envio al cliente
   res.cookie('jwt-coder', access_token, {signed: true}).send({ status: 'success' })
})

// router.get('/private', authToken, (req, res) => {  //aca van los datos del usuario logeado
//     res.send({ status: 'success', payload: req.user })    // va a tener payload solo si pasa por la lectura del token en la funcion helper authToken --- la info solo existe si existe un token
// })
router.get('/private', passport.authenticate('jwt', {session: false}), (req, res) => {  
    //res.send({ status: 'success', payload: req.user })
    console.log(users)
    if (req.user === 'error') return res.send({status: 'error', error: 'Not authorized'})
    res.send({ status: 'success', message:'Welcome!' })    
})

export default router