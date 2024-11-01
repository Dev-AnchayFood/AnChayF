import Translation from "../models/translation";
const translationService = async ({
  newsId,
  desLangId,
  contentTranslate,
  contributedId,
}) => {
  console.log({ newsId, desLangId, contentTranslate, contributedId });
  const translation = await Translation.create({
    news_id: newsId,
    des_lang_id: desLangId,
    content_translate: contentTranslate,
    contributed_id: contributedId,
  });

  return translation;
};

export default translationService;
