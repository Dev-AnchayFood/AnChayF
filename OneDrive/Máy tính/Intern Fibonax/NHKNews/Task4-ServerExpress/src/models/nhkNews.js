import { DataTypes } from "sequelize";
import sequelize from "../connection/connection";

const NhkNews = sequelize.define("nhk_news", {
  news_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  title_with_kanji: DataTypes.STRING,
  news_post_date: DataTypes.STRING,
  news_web_image_uri: DataTypes.STRING,
  news_web_easy_url: DataTypes.STRING,
  content: DataTypes.TEXT,
  content_with_kanji: DataTypes.TEXT,
  dictionary: DataTypes.TEXT,
  news_publication_time: DataTypes.STRING,
});

export default NhkNews;
