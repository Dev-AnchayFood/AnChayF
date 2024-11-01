import getLastNewsService from "../service/getLastNewsService";

const getLastNews = async (req, res) => {
  try {
    const requestedDate = req.params.id;
    const dataNews = await getLastNewsService(requestedDate);

    if (dataNews.length > 0) {
      res.json(dataNews);
    } else {
      res.json({ message: "No data" });
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getLastNews };
