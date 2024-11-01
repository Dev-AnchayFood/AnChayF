import { v4 as uuidv4 } from "uuid";
import Translation from "../models/translation";
import NhkNews from "../models/nhkNews";

const getLastNewsService = async () => {
  const result = [];
  const newsData = await NhkNews.findAll({
    attributes: [
      "news_id",
      "title_with_kanji",
      "content",
      "content_with_kanji",
      "dictionary",
      "news_web_image_uri",
      "news_web_easy_url",
    ],
    order: [["news_publication_time", "DESC"]],
    limit: 5,
  });

  const newsIds = newsData.map((item) => item.news_id);
  const dataTrans = await Translation.findAll({
    attributes: [
      "news_id",
      "content_translate",
      "des_lang_id",
      "contributed_id",
    ],
    where: { news_id: newsIds },
  });

  result.push(newsData);
  result.push(dataTrans);

  return result;
};

export default getLastNewsService;
