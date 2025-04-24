# 💬 **Chat App - Sistema de Bate-Papo em Tempo Real**

## 🚧 **Status do Projeto**
- 🔧 **Em desenvolvimento**: A funcionalidade básica de chat e cadastro de usuários está implementada.
- 🚀 **Próximos passos**: Implementar autenticação, salvar mensagens no banco de dados, enviar emojis, imagens e outras melhorias.

## 📝 **Funcionalidades**

- ✅ **Chat em tempo real**: Comunicação instantânea entre os usuários.
- ✅ **Cadastro de usuário**: Usuários podem se cadastrar com e-mail, nome e senha.
- ✅ **Criptografia de senha**: Senha do usuário armazenada de forma segura no banco de dados.
- ✅ **Envio de mensagens**: Mensagens enviadas em tempo real para todos os usuários conectados.

## 📡 **Tecnologias utilizadas**
- **Frontend**: React, React Router
- **Backend**: Node.js, Express, WebSocket (Socket.io)
- **Banco de Dados**: MySql
- **Autenticação**: bcrypt (sem JWT no momento)

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    cd seu-repositorio
    ```

2. **Instale as dependências do back-end**:

    ```bash
    cd backend
    npm install
    ```

3. **Instale as dependências do front-end**:

    ```bash
    cd frontend
    npm install
    ```

4. **Crie o banco de dados no MySQL**:
   
    Crie um banco de dados chamado `chat_app` no MySQL ou configure a string de conexão no arquivo `server.js` (backend).

5. **Inicie o back-end**:

    ```bash
    cd backend
    npm start
    ```

6. **Inicie o front-end**:

    ```bash
    cd frontend
    npm start
    ```

    Acesse o front-end no seu navegador em: `http://localhost:3000`

Agora, o projeto está rodando localmente!