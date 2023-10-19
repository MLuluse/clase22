//archivo helper
import jwt from 'jsonwebtoken'
 
//helper function--->genera el token que se identifica (user)   (ENCRIPTO)
export const generateToken = (user) => jwt.sign({user}, 'secret', {expiresIn: '24h'})  //---lo transforma a travez de la libreria quecon lo que queremos transformar sign 'user', le damos una palabra secreta 'clave' y le decimos que el token sea valido por 24 hs
//sign digo que data guardar, la firmo con la clave y le doy durabilidad para la validez

////helper function  este va a ser un middleware  (DESENCRIPTO)
export const authToken = (req, res, next) => {  
   // const token = req.headers.auth    //se le da el token--- ejemplo donde accedia directamenta ala cookie
   const token = req.signedCookies['jwt-coder'] // aca es cuando se accede desde la cookie firmada que nombre antes
    if (!token) return res.status(401).send({error:'Not Auth'})
    jwt.verify(token, 'secret', (error, credentials) => {  //verifica el token con la palabra secreta
        if(error) return res.status(403).send({error: 'Not Authorized'}) // si hay error entra aca
        req.user = credentials.user  //si no hay error entra en las credenciales te dan los datos
        next() //esto lo meto en la request sigo
    })

}

//CREDENTIALS ES EL OBJETO AL QUE LE ESTOY PASANDO ARRIBA EN EL SIGN EL {USER}....ACA SE GUARDAN LAS CREDENTIALS UN OBJETO CON OBJETOS ---ACA ESTA EL PAYLOAD
//Para verificar, verify toma el algoritmo del header (lo que mostró en rojo el profe, al principio del hash) y la clave secreta que le pasas como segundo argumento para controlar que el token haya sido generado con esa clave y ese algoritmo.
//No compara contra información de usuarios, simplemente está controlando la integridad del token.