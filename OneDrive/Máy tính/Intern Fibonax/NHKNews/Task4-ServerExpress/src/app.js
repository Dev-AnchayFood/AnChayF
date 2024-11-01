import express, { json } from "express";
import router from "./routes/index";
import scheduleCronJob from "./crondJobs/cronJobs";
const app = express();

app.use(express.json());

const PORT = 3001;

app.use("/", router);
app.get("/", async (req, res) => {
  res.json({ status: true, message: "Our node.js app works" });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
  scheduleCronJob();
});
