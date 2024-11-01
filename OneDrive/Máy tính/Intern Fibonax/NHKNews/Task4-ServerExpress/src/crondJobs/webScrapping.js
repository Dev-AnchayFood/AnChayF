import { Client } from "pg";
import { Pool } from "pg";
import cheerio from "cheerio";
import axios from "axios";
import puppeteer from "puppeteer";
import dotenv from "dotenv";
import translationContent from "./translationContent";
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

//////////ANPHAM/////////////////
async function getData() {
  try {
    const jsonURL = "https://www3.nhk.or.jp/news/easy/news-list.json";
    const response = await axios.get(jsonURL);
    const jsonData = response.data;

    for (const [key, value] of Object.entries(jsonData[0])) {
      const postDate = key;
      const dataByDate = value;

      for (const data of dataByDate) {
        let isExisted = await checkExist(data.news_id);
        if (isExisted) {
        } else {
          try {
            // Lấy dữ liệu từ json
            let titleWithKanji = data.title_with_ruby.replace(
              /<ruby>(.+?)<rt>(.+?)<\/rt><\/ruby>/g,
              "[$1|$2]"
            );
            let newsEasyUrl =
              "https://www3.nhk.or.jp/news/easy/" +
              data.news_id +
              "/" +
              data.news_id +
              ".html";

            // Lấy dữ liệu từ news easy url
            let textContent = await getTextContent(newsEasyUrl);

            // Tạo query
            const insertQuery = `INSERT INTO nhk_news(
                                news_id, 
                                title, 
                                title_with_kanji, 
                                news_post_date, 
                                news_web_image_uri, 
                                news_web_easy_url, 
                                content, 
                                content_with_kanji, 
                                dictionary
                            ) VALUES(
                                '${data.news_id}', 
                                '${data.title}',
                                '${titleWithKanji}',
                                '${postDate}',
                                '${data.news_web_image_uri}', 
                                '${newsEasyUrl}', 
                                '${textContent.content}', 
                                '${textContent.contentWithKanji}',
                                '${textContent.dictionaryBox}'
                            )`;

            // // Chạy query
            try {
              const result = await pool.query(insertQuery);
              console.log("Data inserted successfully");
              // translationContent();
            } catch (error) {
              console.log(error);
            }
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

/**
 * Scrape text content, content cùng kanji và dictionary từ url
 * @param {*} url url dẫn tới bài viết để lấy content
 * @returns một object có 3 key là content, contentWithKanji và dictionary
 */
async function getTextContent(url) {
  try {
    let response = await axios.get(url);
    let $ = cheerio.load(response.data);

    // Get content
    let content = [];
    $("#js-article-body > p").each((index, element) => {
      let contentText = $(element).clone().find("rt").remove().end().text();
      content.push(contentText);
    });

    // Get content with kanji
    let contentWithKanji = [];
    $("#js-article-body > p").each((index, element) => {
      let contentRawHtml = $(element).html();
      let contentTextKanji = contentRawHtml
        .replace(/<ruby>(.+?)<rt>(.+?)<\/rt><\/ruby>/g, "[$1|$2]")
        .replace(/<[^>]+>/g, "");
      contentWithKanji.push(contentTextKanji);
    });

    // Get dictionary
    let dictionary = [];
    let linkTags = $("#js-article-body > p > a");

    // Khởi tạo trình duyệt Puppeteer
    let browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    let page = await browser.newPage();

    // Navigate tới trang web
    await page.goto(url);
    for (linkElement of linkTags) {
      let id = $(linkElement).attr("id");

      // Hover vào thẻ a để kích hoạt hover
      let selector = `a[id="${id}"]`;
      await page.hover(selector);

      // Chờ cho box hiển thị sau khi hover
      let divSelector = "#js-dictionary-box";
      await page.waitForSelector(divSelector);

      // Lấy outerHTML của div
      let html = await page.$eval(divSelector, (el) => el.outerHTML);

      // Xử lý HTML để lấy text
      let htmlNoRt = html.replace(/<rt>(.+?)<\/rt>/g, "");
      let text = htmlNoRt.replace(/<[^>]+>/g, "").replace(/(1\s?）)/g, ":$1");
      dictionary.push(text);
    }
    await browser.close();

    return {
      content,
      contentWithKanji,
      dictionary,
    };
  } catch (error) {
    console.log(error);
    return {};
  }
}

/**
 * Kiểm tra bài báo đã tồn tại trong database hay chưa
 * @param {*} id id của bài báo
 * @returns true nếu bài báo tồn tại và ngược lại
 */
async function checkExist(id) {
  try {
    const checkQuery = "SELECT * FROM nhk_news WHERE news_id = $1";
    const result = await pool.query(checkQuery, [id]);
    return result.rowCount > 0;
  } catch (error) {
    console.error("Error:", error.message);
    return false;
  }
}

// Update news publication time
async function updateData() {
  try {
    const jsonURL = "https://www3.nhk.or.jp/news/easy/news-list.json";
    const response = await axios.get(jsonURL);
    const jsonData = response.data;

    for (const [key, value] of Object.entries(jsonData[0])) {
      const postDate = key;
      const dataByDate = value;

      for (const data of dataByDate) {
        let isExisted = await checkExist(data.news_id);
        if (isExisted) {
          const updateQuery = `UPDATE nhk_news SET news_publication_time='${data.news_publication_time}' WHERE news_id = $1`;
          pool.query(updateQuery, [data.news_id], (error, results) => {
            if (error) {
              console.log(error);
            } else {
              console.log("Data updated successfully");
            }
          });
        } else {
          console.log("Id is not existed");
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

export default getData;
