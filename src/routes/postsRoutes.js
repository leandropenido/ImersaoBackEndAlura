import express from 'express';
import multer from 'multer';
import {
  listarPosts,
  criarNovoPost,
  uploadImagem,
  atualizarNovoPost,
} from '../controllers/postsController.js';
import cors from 'cors';

const corsOptions = {
  origin: 'http://localhost:8000',
  optionSuccessStatus: 200,
};

// Configura o armazenamento do Multer para uploads de imagens
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Especifica o diretório para armazenar as imagens enviadas
    cb(null, 'uploads/'); // Substitua por seu caminho de upload desejado
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const routes = (app) => {
  app.use(express.json());
  app.use(cors(corsOptions));
  app.get('/posts', listarPosts);
  app.post('/posts', criarNovoPost);
  app.post('/upload', upload.single('imagem'), uploadImagem);

  app.put('/upload/:id', atualizarNovoPost);
};

export default routes;
