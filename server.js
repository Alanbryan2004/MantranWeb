import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Endpoint simples para testar
app.get("/", (req, res) => {
  res.send("✅ Servidor Socket.io está rodando!");
});

// === Servidor HTTP + Socket.IO ===
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*", // ou seu domínio da Vercel
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

  // Garante que os nomes não diferenciem maiúsculas/minúsculas
  const destinatario = Object.entries(usuariosOnline).find(
    ([, nome]) => nome.toLowerCase() === msg.para.toLowerCase()
  );

  const remetente = Object.entries(usuariosOnline).find(
    ([, nome]) => nome.toLowerCase() === msg.de.toLowerCase()
  );

  // ✅ Envia apenas para o destinatário e para o remetente
  if (destinatario) {
    io.to(destinatario[0]).emit("novaMensagem", {
      ...msg,
      recebido: true, // indica que foi recebido
    });
  }

  if (remetente) {
    io.to(remetente[0]).emit("novaMensagem", {
      ...msg,
      enviado: true, // indica que foi enviado
    });
  }
});



  socket.on("disconnect", () => {
    const nomeUsuario = usuariosOnline[socket.id];
    console.log("🔴 Usuário desconectou:", nomeUsuario);
    delete usuariosOnline[socket.id];
    io.emit("usersOnline", Object.values(usuariosOnline));
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
