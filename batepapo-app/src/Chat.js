import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import './App.css';
import './chat.css';

const nomeUsuario = localStorage.getItem('usuario') || 'usuario';

const socket = io("http://localhost:3001");

const Chat = () => {
  const [mensagem, setMensagem] = useState("");
  const [mensagens, setMensagens] = useState([]);
  const containerRef = useRef(null);  // ref para o container de mensagens

  const enviarMensagem = () => {
    if (mensagem.trim()) {
      const novaMensagem = {
        autor: nomeUsuario,
        texto: mensagem,
        horario: new Date().toLocaleTimeString(),
      };

      socket.emit("mensagem", novaMensagem); // Enviar mensagem para o servidor
      setMensagem("");
    }
  };

  useEffect(() => {
    console.log("Tentando conectar ao socket...");
    socket.on("connect", () => {
      console.log("Conectado ao servidor!");
    });

    socket.on("mensagem", (data) => {
      console.log(data);
      setMensagens((prev) => [...prev, data ]); // Adicionando nova mensagem
    });

    return () => socket.off("mensagem"); // Limpar o ouvinte de evento
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight; // Rolagem para o final
    }
  }, [mensagens]); // Executa toda vez que as mensagens mudarem

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div className="sidebar">
        <h2>TalkHub</h2>
        <ul>
          <li>🌍 Conexões</li>
          <li>👥 Grupo</li>
          <li>🛠️ Suporte </li>
        </ul>
      </div>
  
      {/* Área do chat */}
      <div className="chat-area">
        {/* Cabeçalho do chat */}
    
  
        {/* Mensagens */}
        <div className="chat-messages" ref={containerRef}>
          {mensagens.map((msg, index) => (
            <div
              key={index}
              className={`mensagem-texto ${msg.autor === nomeUsuario ? 'minha-mensagem' : 'mensagem-outro'}`}
            >
              <div className="msg-autor">
                {msg.autor}
              </div>
              <div className="msg-texto">
                {msg.texto}
              </div>
              <div className="msg-horario">
                {msg.horario}
              </div>
            </div>
          ))}
        </div>
  
        {/* Input de mensagem */}
        <div className="chat-input">
          <input
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Digite uma mensagem..."
          />
          <button onClick={enviarMensagem}>Enviar</button>
        </div>
      </div>
    </div>
  );
  
};

export default Chat;