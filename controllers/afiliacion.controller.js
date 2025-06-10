import { Afiliacion } from '../models/index.js';

export const registrarAfiliacion = async (req, res) => {
  const { hijos } = req.body;
  const userId = req.user.id;

  try {
    // Validar si ya existe una afiliación para este usuario
    const existe = await Afiliacion.findOne({ where: { userId } });
    if (existe) {
      return res.status(400).json({ message: 'Ya tienes una afiliación registrada.' });
    }

    const nuevaAfiliacion = await Afiliacion.create({
      userId,
      hijos,
      estado: 'pendiente_pago',
    });

    res.status(201).json({
      message: 'Afiliación registrada correctamente',
      afiliacion: nuevaAfiliacion,
    });
  } catch (error) {
    console.error('Error al registrar afiliación:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};


export const confirmarPago = async (req, res) => {
  const { id } = req.params;

  try {
    const afiliacion = await Afiliacion.findByPk(id);

    if (!afiliacion) {
      return res.status(404).json({ message: 'Afiliación no encontrada' });
    }

    afiliacion.estado = 'pagado';
    await afiliacion.save();

    res.status(200).json({ message: 'Pago confirmado ✅', afiliacion });
  } catch (error) {
    console.error('Error al confirmar pago:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
}
