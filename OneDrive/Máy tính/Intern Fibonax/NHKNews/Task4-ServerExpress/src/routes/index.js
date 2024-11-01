import express from "express";
const router = express.Router();

import { addTranslation } from "../controllers/addTranslationControllers";
import { getNewsByDate } from "../controllers/getByDayController";
import { getById } from "../controllers/getByIdController";
import { getLastNews } from "../controllers/getLastNewsController";

router.post("/add-translation", addTranslation);
router.get("/get-lastest-news", getLastNews);
router.get("/get-news-by-date/:data", getNewsByDate);
router.get("/get-news-by-id/:id", getById);

export default router;
