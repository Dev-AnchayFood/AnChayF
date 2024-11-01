import { Client } from "pg";
import { Pool } from "pg";
import fetch from "node-fetch";
import getData from "./webScrapping";
import dotenv from "dotenv";
dotenv.config();

const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbDatabase = process.env.DB_DATABASE;
const port = process.env.PORT;

const connectionParams = {
  user: `${dbUser}`,
  host: `${dbHost}`,
  database: `${dbDatabase}`,
  password: `${dbPassword}`,
  port: `${port}`,
};

const pool = new Pool(connectionParams);

const client = new Client(connectionParams);
client.connect();

let databaseNewsIds = [];
let urlNewsIds = [];

async function newsIdsDatabase() {
  try {
    const res = await client.query(`SELECT news_id FROM nhk_news`);
    databaseNewsIds = res.rows.map((row) => row.news_id);
  } catch (err) {
    console.error("Error fetching data from database:", err);
  }
}

async function newsIdsNHK() {
  try {
    const response = await fetch(
      "https://www3.nhk.or.jp/news/easy/news-list.json"
    );
    const data = await response.json();

    for (const [key, value] of Object.entries(data[0])) {
      const dataByDate = value;
      for (const dataItem of dataByDate) {
        for (const [innerKey, innerValue] of Object.entries(dataItem)) {
          if (innerKey === "news_id") {
            urlNewsIds.push(innerValue);
          }
        }
      }
    }
  } catch (error) {
    console.error("Error fetching data from URL:", error);
  }
}

// Hàm so sánh hai mảng
function compareNewsIds() {
  const differentElements = urlNewsIds.filter(
    (id) => !databaseNewsIds.includes(id)
  );
  return differentElements;
}

async function fetchData() {
  // Gọi hàm lấy data
  await newsIdsDatabase();
  await newsIdsNHK();

  // Gọi hàm so sánh 2 mảng
  const differentIds = compareNewsIds();
  if (differentIds.length > 0) getData();
  else console.log("There is no new news_id");
}

export default fetchData;
