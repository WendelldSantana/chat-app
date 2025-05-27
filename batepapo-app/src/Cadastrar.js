import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cadastrar.css";

const Cadastrar = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const navigate = useNavigate();

  const resetFields = () => {
    setUsuario("");
    setEmail("");
    setSenha("");
    setMensagem("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !senha || (!isLogin && !usuario)) {
      setMensagem("Preencha todos os campos");
      return;
    }

    const endpoint = isLogin ? "login" : "cadastrar";

    fetch(`http://localhost:3001/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        isLogin ? { email, senha } : { usuario, email, senha }
      ),
    })
      .then((res) => res.json().then((data) => ({ status: res.status, body: data })))
      .then(({ status, body }) => {
        setMensagem(body.msg);
        if (status >= 200 && status < 300) {
          const nomeUsuario = isLogin ? body.usuario : usuario;
          localStorage.setItem("usuario", nomeUsuario);
          resetFields();
          navigate("/chat");
        }
      })
      .catch(() => setMensagem("Erro ao conectar com o servidor"));
  };

  return (
    <div className="tela-fundo">
      <div className="cartao-login">
        {/* Esquerda - Formulário */}
        <div className="formulario">
          <h1>Bem Vindo <span>✌️</span></h1>

          <div className="tabs">
            <button
              className={isLogin ? "ativo" : ""}
              onClick={() => {
                setIsLogin(true);
                resetFields();
              }}
            >
              Login
            </button>
            <button
              className={!isLogin ? "ativo" : ""}
              onClick={() => {
                setIsLogin(false);
                resetFields();
              }}
            >
              Cadastro
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="Nome do usuário"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
              />
            )}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />

            <button type="submit" className="btn-laranja">
              {isLogin ? "Entrar" : "Cadastrar"}
            </button>
          </form>

          {mensagem && <p className="mensagem">{mensagem}</p>}
        </div>

        {/* Direita - Imagem lateral */}
        <div className="imagem-lateral">
          <img src="/astronauta.jpg" alt="Imagem lateral" />
        </div>
      </div>
    </div>
  );
};

export default Cadastrar;