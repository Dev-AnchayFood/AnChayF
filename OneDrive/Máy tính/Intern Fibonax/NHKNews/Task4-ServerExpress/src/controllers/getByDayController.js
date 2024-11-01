import getNewsByDateService from "../service/getByDayService";

const getNewsByDate = async (req, res) => {
  try {
    const requestedDate = req.params.data;
    const newsByDate = await getNewsByDateService(requestedDate);

    if (newsByDate.length > 0) {
      res.json(newsByDate);
    } else {
      res.json({ message: "There is no news for this date" });
    }
  } catch (error) {
    console.error("Error fetching news by date:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getNewsByDate };
