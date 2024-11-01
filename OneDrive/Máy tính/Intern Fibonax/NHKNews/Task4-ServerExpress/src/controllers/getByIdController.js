import getByIdService from "../service/getByIdService";

const getById = async (req, res) => {
  try {
    const requestId = req.params.id;
    const dataById = await getByIdService(requestId);

    if (dataById.length > 0) {
      res.json(dataById);
    } else {
      res.json({ message: "No data" });
    }
  } catch (error) {
    console.error("Error fetching news by id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getById };
