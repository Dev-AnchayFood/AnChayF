import Translation from "../models/translation";
import NhkNews from "../models/nhkNews";

const getByIdService = async (requesteId) => {
  const result = [];
  const dataId = await NhkNews.findAll({
    attributes: [
      "news_id",
      "title_with_kanji",
      "content",
      "content_with_kanji",
      "dictionary",
      "news_web_image_uri",
      "news_web_easy_url",
      "news_post_date",
    ],
    where: {
      news_id: requesteId,
    },
  });

  const dataTransById = await Translation.findAll({
    attributes: ["content_translate"],
    where: { news_id: requesteId },
  });

  result.push(dataId);
  result.push(dataTransById);
  return result;
};

export default getByIdService;
