import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());

// ✅ Rota simples só para teste no navegador
app.get("/", (req, res) => {
  res.send("🚀 Servidor Socket.IO rodando com sucesso no Render!");
});

// === Servidor HTTP + Socket.IO ===
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // 🔥 permite conexões do seu frontend (Vercel)
    methods: ["GET", "POST"],
  },
});

let usuariosOnline = {}; // { socket.id: "Nome" }

io.on("connection", (socket) => {
  console.log("🟢 Novo cliente conectado:", socket.id);

  socket.on("userOnline", (nomeUsuario) => {
    usuariosOnline[socket.id] = nomeUsuario;
    console.log("✅ Usuário logado:", nomeUsuario);
    io.emit("usersOnline", Object.values(usuariosOnline));
  });

  socket.on("novaMensagem", (msg) => {
    console.log("💬 Nova mensagem recebida:", msg);

    // 🔁 Envia para o destinatário, se estiver online
    const destinatario = Object.entries(usuariosOnline).find(
      ([, nome]) => nome === msg.para
    );

    if (destinatario) {
      io.to(destinatario[0]).emit("novaMensagem", msg);
    }

    // 🔁 Envia também de volta para o remetente
    io.to(socket.id).emit("novaMensagem", msg);
  });

  socket.on("disconnect", () => {
    const nomeUsuario = usuariosOnline[socket.id];
    console.log("🔴 Usuário desconectou:", nomeUsuario);
    delete usuariosOnline[socket.id];
    io.emit("usersOnline", Object.values(usuariosOnline));
  });
});

// ✅ Usa a porta do Render ou 3001 local
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
