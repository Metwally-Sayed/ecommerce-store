// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { extractSheets } from "spreadsheet-to-json";
import { Collection } from 'types';




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
      sheetsToExtract: ["collections"]

    },
    function (err: any, data: { collections: Collection[] }) {
      const collection = data.collections
      res.status(200).send(collection);
    }
  );

}


