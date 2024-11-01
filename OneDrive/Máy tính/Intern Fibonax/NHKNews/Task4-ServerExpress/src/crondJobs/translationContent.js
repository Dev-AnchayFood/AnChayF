// import { Pool } from "pg";
// import dotenv from "dotenv";
// dotenv.config();
// const API_KEY = process.env.API_KEY;
// const dbHost = process.env.DB_HOST;
// const dbUser = process.env.DB_USER;
// const dbPassword = process.env.DB_PASSWORD;
// const dbDatabase = process.env.DB_DATABASE;
// const port = process.env.PORT;

// const connectionParams = {
//   user: `${dbUser}`,
//   host: `${dbHost}`,
//   database: `${dbDatabase}`,
//   password: `${dbPassword}`,
//   port: `${port}`,
// };

// const pool = new Pool(connectionParams);

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// // Function to handle database queries
// const executeQuery = async (query, parameter = []) => {
//   try {
//     const result = await pool.query(query, parameter);
//     return result.rows;
//   } catch (err) {
//     console.error("Database query error:", err);
//     throw err;
//   }
// };

// /**
//  *
//  * @param {'Mã của ngôn ngữ cần dịch'} des_lang_id
//  * @param {'Nội dung cần dịch'} inputStr
//  * @returns Đoạn text đã được dịch
//  */
// const translateContent = async (des_lang_id, inputStr) => {
//   let result;
//   const languageCodes = {
//     en: "english",
//     vi: "vietnamese",
//   };

//   const targetLanguage = languageCodes[des_lang_id];
//   if (!targetLanguage) {
//     throw new Error("Invalid target language.");
//   }
//   const prompt = `Translate the following text from Japanese to ${targetLanguage} with the style of a news article: ${inputStr}`;

//   try {
//     const response = await fetch(
//       "https://api.openai.com/v1/engines/text-davinci-003/completions",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${API_KEY}`,
//         },
//         body: JSON.stringify({
//           prompt: prompt,
//           max_tokens: 2000,
//         }),
//       }
//     );

//     if (response.ok) {
//       const data = await response.json();
//       result = data.choices[0].text;
//       return result.trim();
//     } else if (response.status === 429) {
//       // Gặp lỗi gửi quá nhiều yêu cầu thì đợi 5 giây rồi gửi lại
//       console.log("Waiting to request chatgpt again!");
//       await delay(5000);
//       return translateContent(des_lang_id, inputStr);
//     } else {
//       console.error("Error translating content:", response.statusText);
//       return "Error: Unable to process your request.";
//     }
//   } catch (error) {
//     console.error("Error translating content:", error.message);
//     return "Error: Unable to process your request.";
//   }
// };

// // Hàm gửi yêu cầu dịch và lưu kết quả vào database
// const getContentTranslate = async () => {
//   try {
//     const listToTranslate = await executeQuery(`
//             SELECT
//                 nhk_news.news_id,
//                 nhk_news.content,
//             CASE
//                 WHEN COUNT(CASE WHEN translations.des_lang_id = 'vi' THEN 1 END) > 0
//                     AND COUNT(CASE WHEN translations.des_lang_id = 'en' THEN 1 END) = 0
//                 THEN 'en'
//                 WHEN COUNT(CASE WHEN translations.des_lang_id = 'en' THEN 1 END) > 0
//                     AND COUNT(CASE WHEN translations.des_lang_id = 'vi' THEN 1 END) = 0
//                 THEN 'vi'
//                 WHEN COUNT(CASE WHEN translations.des_lang_id = 'vi' THEN 1 END) > 0
//                     AND COUNT(CASE WHEN translations.des_lang_id = 'en' THEN 1 END) > 0
//                 THEN 'none'
//                 ELSE 'all'
//             END AS missing_lang
//             FROM
//                 nhk_news
//             LEFT JOIN
//                 translations
//             ON
//                 nhk_news.news_id = translations.news_id
//             GROUP BY
//                 nhk_news.news_id, nhk_news.content;
//         `);

//     const queries = [];

//     for (const item of listToTranslate) {
//       try {
//         const { news_id, content, missing_lang } = item;
//         let langValues = [];
//         let langIds = [];

//         if (missing_lang == "all") {
//           langValues = [
//             await translateContent("vi", content),
//             await translateContent("en", content),
//           ];
//           langIds = ["vi", "en"];
//         } else if (missing_lang !== "none") {
//           langValues = [await translateContent(missing_lang, content)];
//           langIds = [missing_lang];
//         }

//         if (langValues.length > 0 && langIds.length > 0) {
//           const saveTranslationQuery = `
//                         INSERT INTO translations (news_id, des_lang_id, content_translate, contributed_id)
//                         VALUES ${langIds
//                           .map(
//                             (_, index) =>
//                               `($1, $${index + 2}, $${index + 3}, 'chatgpt')`
//                           )
//                           .join(", ")}
//                     `;

//           const values = [news_id, ...langIds, ...langValues];
//           queries.push({
//             query: saveTranslationQuery,
//             values,
//             message: `Translation saved for news_id ${news_id} with missing_lang ${langIds.join(
//               " and "
//             )}.`,
//           });
//         }
//       } catch (err) {
//         console.log(err);
//       }
//     }

//     for (const queryData of queries) {
//       const { query, values, message } = queryData;
//       await executeQuery(query, values);
//       console.log(message);
//     }
//     console.log("All translations completed.");
//   } catch (err) {
//     console.error("Database query error:", err);
//     throw err;
//   }
// };

// // Run:
// const translationContent = async () => {
//   try {
//     const translatedContent = await getContentTranslate();
//   } catch (error) {
//     console.error("Error:", error.message);
//   }
// };

// export default translationContent;

// //
