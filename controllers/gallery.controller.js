import cloudinary from '../utils/cloudinary.js';
 import streamifier from 'streamifier';

export const uploadImage = async (req, res) => {
  try {
    const year = req.params.year;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ message: 'No se subió ninguna imagen.' });
    }

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder: `galeria/${year}` },
        (error, result) => {
          if (error) {
            console.error('Error al subir a Cloudinary:', error);
            return reject(error);
          }
          resolve(result);
        }
      );

      streamifier.createReadStream(file.buffer).pipe(stream);
    });

    res.status(200).json({
      message: 'Imagen subida correctamente.',
      url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    console.error('Error general:', error);
    res.status(500).json({ message: 'Error al subir la imagen.' });
  }
};