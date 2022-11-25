// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from "googleapis"
import { extractSheets } from "spreadsheet-to-json";
import { Image, Product } from 'types';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {





  extractSheets(
    {
      // my google spreadhsheet key
      spreadsheetKey: "1tBKcuCiJc5A7i3jWXKDIQYsR1zJFYPG4tZT-QTioWCk",
      // my google oauth credentials or API_KEY
      credentials: require("../../product-360416-2ba1dc1ac4a2.json"),
      // optional: names of the sheets i wanted to extract
      sheetsToExtract: ["Products", "images"],

    },
    function (err: any, data: { Products: Product[], images: Image[] }) {

      let product = data.Products.find((product: Product) => product.id === req.query.id)
      let productImages = data.images.filter((image: Image) => image.productId === product?.id)
      const productData = {
        ...product, productImages
      }

      res.status(200).send(productData);
    }
  );







}


