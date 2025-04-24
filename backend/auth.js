const mysql = require ('mysql2')
const express = require ('express')
const bcrypt = require ('bcryptjs')

const router = express.Router()

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '8708',
    database: 'chat_app'
})

db.connect((error)=>{
    if (error) throw error
    console.log("Conectado ao mySql2")
})

router.post('/cadastrar', (req, res) => {
    const {usuario, email, senha} = req.body
    if(!usuario || !email || !senha){
        return res.status(400).json({ msg: "Preencha todos os campos" })
    }

    const senhaHash = bcrypt.hashSync(senha, 10)

    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)"

    db.query(sql, [usuario, email, senhaHash], (err, result) => {
        if(err){
            if(err.code === 'ER_DUP_ENTRY'){
                return res.status(400).json({ msg: "Email ou usúario ja cadastrado" })   
            }
            return res.status(500).json({ msg: "Erro ao cadastrar" })
        }
        return res.status(201).json({ msg: "Usuário cadastrado com sucesso" })
    })
})
module.exports =  router