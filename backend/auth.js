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

//Rota de Cadastro
router.post('/cadastrar', (req, res) => {
    const {usuario, email, senha} = req.body

    //Verifica se enviou os campos
    if(!usuario || !email || !senha){
        return res.status(400).json({ msg: "Preencha todos os campos" })
    }

    //Criptografar a senha que o usuário inseriu com {bcript} com um hash de 10 saltos (Quanto maior o salto, mais lento ele pode ficar)
    const senhaHash = bcrypt.hashSync(senha, 10)

    //Inserindo os dados para armazenar no banco
    const sql = "INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)"
    db.query(sql, [usuario, email, senhaHash], (err, results) => {
        if(err){
            if(err.code === 'ER_DUP_ENTRY'){ //verificação da duplicação de email
                return res.status(400).json({ msg: "Email ou usúario ja cadastrado" })   
            }
            return res.status(500).json({ msg: "Erro ao cadastrar" })
        }
        return res.status(201).json({ msg: "Usuário cadastrado com sucesso" })
    })
})

//Rota de Login
router.post('/login', (req, res) => {
    const { email, senha } = req.body

    //Verifica se enviou os campos
    if(!email || !senha ){
        return res.status(400).json( {msg:"Preencha todos os campos "})
    }

    //Busca o usuário pelo email
    const sql = "SELECT * FROM usuarios WHERE email = ? ";
    db.query(sql, [email], (err, results) => {
        if(err) return res.status(500).json({ msg:"Erro no Servidor"})
            
            //Verifica se o email está cadastrado |EX: if(!result.length)
            if(results.length === 0) return res.status(401).json({ msg: "Email não cadastrado" })
    

    const usuario = results[0]

    //Verificar senha
    const senhaCorreta = bcrypt.compareSync(senha, usuario.senha)
    if(!senhaCorreta){
        return res.status(401).json({ msg:"Senha Incorreta"})
    } 

    //Sucesso no Login
    return res.status(200).json({ msg: "Login realizado com sucesso", usuario: usuario.nome})
    })
})
module.exports =  router