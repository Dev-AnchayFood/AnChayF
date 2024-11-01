import { DataTypes } from "sequelize";
import sequelize from "../connection/connection";

const Translation = sequelize.define(
  "translations",
  {
    id: {
      type: DataTypes.INTEGER,

      primaryKey: true,
      autoIncrement: true,
    },
    news_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    des_lang_id: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter language.",
        },
      },
    },
    content_translate: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter translation content.",
        },
      },
    },
    contributed_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { timestamps: false }
);
export default Translation;
