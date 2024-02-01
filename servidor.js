import express from 'express'
import bcrypt from 'bcrypt'
import 'dotenv/config'
import { initializeApp } from "firebase/app";
import { collection, doc, getFirestore, getDoc, setDoc, getDocs, deleteDoc } from 'firebase/firestore'

//conexion a la base de datos

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: "crud-practica-1-207ad.firebaseapp.com",
    projectId: "crud-practica-1-207ad",
    storageBucket: "crud-practica-1-207ad.appspot.com",
    messagingSenderId: "273331647195",
    appId: "1:273331647195:web:16659c47013d6117d4d2fe"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig); //me conecta a mi abse de datos con mis credenciales 
const db = getFirestore()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Respuesta de la raiz mimida')
})

app.post('/signup', (req, res) => {
    const { nombre, apaterno, amaterno, telefono, usuario, password } = req.body
    // console.log('@@ en el body', req.body)
    if (nombre.lenght < 3) {
        res.json({
            'alerta': 'el nombre debe contener 3 letras'
        })
    } else if (!apaterno.length) {
        res.json({ 'alerta': 'el apellido paterno no puede estar vacio' })
    } else if (!usuario.length) {
        res.json({ 'alerta': 'el usuario no puede estar vacio' })
    } else if (password.length < 6) {
        res.json({ 'alerta': 'la contraseña requiere 6 caracteres' })
    } else {
        //Guardar en la base de datos
        const usuarios = collection(db, 'usuarios')
        getDoc(doc(usuarios, usuario)).then(user => {
            if (user.exists()) {
                res.json({ 'alerta': 'This user is already used' })
            } else {
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash (password, salt, (err, hash) => {
                            req.body.password = hash

                            setDoc (doc(usuarios, usuario ), req.body )
                            .then (registered => {
                                res.json({
                                    'alert': ' Success',
                                    registered
                                })
                            })
                        })
                    })
            }
        })
    }

})

app.post ('/login', (req, res)=> {
    const  { usuario, password } = req.body
    if (!usuario, length || !password.length) {
        res.json ({'alerta ': 'añgunos campos estan vacios'})
    }
    const usuarios = collection(db, 'usuarios')
getDoc(doc(usuarios, usuario))
    .then(user => {
        if(!user.exists()) {
            res.json({
                'alerta': ' el usuario no existe '
            })
        } else {
            bcrypt.compare(password, user.data().password, (err, result) => {
                if (result) {
                    let userFound = user.data()
                    res.json ({
                        'alert': 'success', 
                        'usuario': {
                            'nombre': userFound.nombre,
                            'apaterno': userFound.apaterno,
                            'amaterno': userFound.amaterno,
                            "usuario": userFound.usuario,
                            "telefono": userFound.telefono
                        }
                    })
                } else {
                    res.json({
                        'alerta': 'las contraselas no coinciden'
                    })
                }
            } )
        }
    })

})

app.get('/get-all', async (req, res) => {
    const usuarios = collection(db, 'usuarios')
    const docsUsuarios = await getDocs(usuarios)
    const arrayUsuarios = []

    docsUsuarios.forEach((usuario) => {
        const obj  = {
            nombre: usuario.data().nombre,
            apaterno: usuario.data().apaterno,
            amaterno: usuario.data().amaterno,
            usuario: usuario.data().usuario,
            telefono: usuario.data().telefono
        }

        arrayUsuarios.push(obj)
    })

    if (arrayUsuarios.length > 0) {
        res.json({
            'alerta': 'success',
            'data': arrayUsuarios
        })
    } else {
        res.json({
            'alerta': 'error',
            'message': 'No hay usuarios en la base de datos'
        })
    }
})
    

app.post ('/delete-user', (req, res) => {
    const { usuario} = req.body
    deleteDoc(doc(collection(db, 'usuarios'), usuario))
    .then(data => {
        console.log(data)
        if(data){
            res.json({
                'alerta': 'usuario fue borrado'
            })
        } else {
        res,json({
            'alerta':'el usuario no existe en la basee de datos'
        })
    }
    }).catch(err => {
        res.json({
            'alerta': 'fallo',
            'message': err
        })
    })
})


const port = process.env.PORT || 6000

app.listen(port, () => {
    console.log('servidor trabajando:', port)
})