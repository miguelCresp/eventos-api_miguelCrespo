const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json(), cors());

// Base de datos simulada
let tareas = [
  {
    id: 1,
    title: "Aprender Node.js",
    description: "Completar el curso de Node.js y hacer ejercicios prácticos",
    category: "Educación",
    imgUrl:
      "https://images.unsplash.com/photo-1762119594508-b9be29cd513d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2006",
    dateTime: "2026-10-25 10:00:00",
  },
  {
    id: 2,
    title: "Comprar víveres",
    description: "Ir al supermercado y comprar frutas, verduras y lácteos",
    category: "Personal",
    imgUrl:
      "https://images.unsplash.com/photo-1762036997158-50fa6e41ecbd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    dateTime: "2026-10-24 18:30:00",
  },
  {
    id: 3,
    title: "Lo que sea",
    description: "Ir al supermercado y comprar frutas, verduras y lácteos",
    category: "Personal",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1761478618389-f48b4b981d29?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=685",
    dateTime: "2025-10-24 18:30:00",
  },
];

// GET - Obtener todas las tareas
app.get("/api/tareas", (req, res) => {
  res.json(tareas);
});

// GET - Obtener una tarea por ID
app.get("/api/tareas/:id", (req, res) => {
  const tarea = tareas.find((t) => t.id === parseInt(req.params.id));
  if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
  res.json(tarea);
});

// POST - Crear una nueva tarea
app.post("/api/tareas", (req, res) => {
  const { title, description, category, imgUrl, dateTime } = req.body;

  if (!title || !description || !category) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  const nuevaTarea = {
    id: tareas.length > 0 ? Math.max(...tareas.map((t) => t.id)) + 1 : 1,
    title,
    description,
    category,
    imgUrl: imgUrl || "",
    dateTime: dateTime || new Date().toISOString(),
  };

  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// PUT - Actualizar una tarea
app.put("/api/tareas/:id", (req, res) => {
  const indice = tareas.findIndex((t) => t.id === parseInt(req.params.id));
  if (indice === -1) return res.status(404).json({ error: "Tarea no encontrada" });

  const { title, description, category, imgUrl, dateTime } = req.body;

  tareas[indice] = {
    ...tareas[indice],
    title: title || tareas[indice].title,
    description: description || tareas[indice].description,
    category: category || tareas[indice].category,
    imgUrl: imgUrl !== undefined ? imgUrl : tareas[indice].imgUrl,
    dateTime: dateTime || tareas[indice].dateTime,
  };

  res.json(tareas[indice]);
});

// DELETE - Eliminar una tarea
app.delete("/api/tareas/:id", (req, res) => {
  const indice = tareas.findIndex((t) => t.id === parseInt(req.params.id));
  if (indice === -1) return res.status(404).json({ error: "Tarea no encontrada" });

  const tareaEliminada = tareas.splice(indice, 1);
  res.json({ mensaje: "Tarea eliminada", tarea: tareaEliminada[0] });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
