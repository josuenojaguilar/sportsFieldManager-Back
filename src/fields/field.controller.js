import Field from "./field.model.js";

export const addField = async (req, res) => {
  try {
    const data = req.body;

    if (req.file) {
      data.photo = req.file.filename;
    }

    const field = new Field(data);
    await field.save();

    res.status(200).json({
      message: "Cancha agregado exitosamente!",
      field,
    });
  } catch (e) {
    console.error(e);
    return res
      .status(500)
      .send("Algo salió mal al agregar el campo a la base de datos");
  }
};

export const listFields = async (req, res) => {
  try {
    const fieldsDetails = await Field.find({});
    res.status(200).json({ fields: fieldsDetails });
  } catch (e) {
    return res.status(500).send("Algo salió mal al listar las canchas");
  }
};
