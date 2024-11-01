import translationService from "../service/addTranslationService";

const addTranslation = async (req, res) => {
  try {
    console.log(req.body);
    const translation = await translationService(req.body);

    res.json({ message: "Translation added successfully.", translation });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return res.status(400).json({ errors: validationErrors });
    }
    console.error("Error adding translation:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { addTranslation };
