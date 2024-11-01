import Translation from "../models/translation";
import NhkNews from "../models/nhkNews";

const getNewsByDateService = async (requestedDate) => {
  const result = [];
  const newsByDate = await NhkNews.findAll({
    attributes: [
      "news_id",
      "title_with_kanji",
      "content",
      "content_with_kanji",
      "dictionary",
      "news_web_image_uri",
      "news_web_easy_url",
    ],
    where: {
      news_post_date: requestedDate,
    },
  });
  const newsIds = newsByDate.map((item) => item.news_id);
  const dataTransByDay = await Translation.findAll({
    attributes: [
      "news_id",
      "content_translate",
      "des_lang_id",
      "contributed_id",
    ],
    where: { news_id: newsIds },
  });
  result.push(newsByDate);
  result.push(dataTransByDay);

  return result;
};

export default getNewsByDateService;
