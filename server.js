import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Servir os arquivos do build (frontend)
app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// === Servidor HTTP + Socket.IO ===
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
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
    const destinatario = Object.entries(usuariosOnline).find(
      ([, nome]) => nome === msg.para
    );
    if (destinatario) {
      io.to(destinatario[0]).emit("novaMensagem", msg);
    }
    io.to(socket.id).emit("novaMensagem", msg);
  });

  socket.on("disconnect", () => {
    const nomeUsuario = usuariosOnline[socket.id];
    console.log("🔴 Usuário desconectou:", nomeUsuario);
    delete usuariosOnline[socket.id];
    io.emit("usersOnline", Object.values(usuariosOnline));
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
