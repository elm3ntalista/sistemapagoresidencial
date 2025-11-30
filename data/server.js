import express from "express";
import cors from "cors";
import { addResidente, getAllResidentes, getTotalResidentes, getTotalDeuda, actualizarResidente } from "./models/modelResidente.js";
import { addPago, getAllPagos, getTotalPagos } from "./models/modelpago.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/obtener-residentes", async (req, res) => {
  try {
    const resultado = await getAllResidentes();
    return res.send(resultado);
  }
  catch (error) {
    res.status(500).send(error.message);
    return res.send("");
  }
});

app.post("/agregar-residentes", async (req, res) => {
  const { apartamento, nombre, telefono, email } = req.body;
  try {
    await addResidente({ apartamento, nombre, telefono, email });
    return res.status(201).json({ message: "Residente agregado con éxito." });
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
});

app.patch("/actualizar-residente", async (req, res) => {
  const { apt, deuda } = req.body;
  try {
    await actualizarResidente(apt, deuda);
    return res.status(201).json({ message: "Residente actualizado con éxito." });
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/obtener-estadisticas", async (req, res) => {
  try {
    const totalResidentes = await getTotalResidentes();
    const totalPagos = await getTotalPagos();
    const totalDeuda = await getTotalDeuda();

    const resultado = { totalResidentes, totalPagos, totalDeuda };
    return res.status(201).json(resultado);
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/obtener-pagos", async (req, res) => {
  try {
    const resultado = await getAllPagos();
    return res.status(201).json(resultado);
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
});

app.get("/obtener-pagos-recientes", async (req, res) => {
  try {
    const resultado = await getAllPagos(true);
    return res.status(201).json(resultado);
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
});

app.post("/agregar-pagos", async (req, res) => {
  const { apartamento, nombre, fecha, monto } = req.body;
  try {
    await addPago({ apartamento, nombre, fecha, monto });
    return res.status(201).json({ message: "Pago agregado con éxito." });
  }
  catch (error) {
    return res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});