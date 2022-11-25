// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from "googleapis"
import { extractSheets } from "spreadsheet-to-json";
import { Image, Collection, Product } from 'types';


// type Data = {
//   data: string
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const auth = new google.auth.GoogleAuth({
  //   keyFile: "credentials.json",
  //   scopes: "https://www.googleapis.com/auth/spreadsheets",
  // });


  // const client = await auth.getClient()


  // const googleSheets = google.sheets({ version: "v4", auth: client });


  // const spreadsheetId = "1tBKcuCiJc5A7i3jWXKDIQYsR1zJFYPG4tZT-QTioWCk"


  // const metaData = await googleSheets.spreadsheets.get({
  //   auth,
  //   spreadsheetId,
  // })

  // const getRows = await googleSheets.spreadsheets.values.get({
  //   auth,
  //   spreadsheetId,
  //   range: "Products"
  // })


  extractSheets(
    {
      // my google spreadhsheet key
      spreadsheetKey: "1tBKcuCiJc5A7i3jWXKDIQYsR1zJFYPG4tZT-QTioWCk",
      // my google oauth credentials or API_KEY
      credentials: require("../../product-360416-2ba1dc1ac4a2.json"),
      // optional: names of the sheets i wanted to extract
      sheetsToExtract: ["Products", "images", "collections"]

    },
    function (err: any, data: { Products: Product[], images: Image[], collections: Collection[] }) {
      const productInfo = data.Products.map((product: Product) => {
        const images = data.images.filter((image: Image) => image.productId === product.id)
        const collections = data.collections.find((collection: Collection) => collection.id === product.collectionsId)
        return { ...product, trending: product.trending === "TRUE" ? true : false, images, collections }
      })
      res.status(200).send(productInfo);
    }
  );


}


