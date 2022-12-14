// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from "googleapis"
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { uuid } from "uuidv4"
import { buffer, json } from 'stream/consumers';



export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  // Initialize the sheet - doc ID is the long id in the sheets URL
  const doc = new GoogleSpreadsheet('1tBKcuCiJc5A7i3jWXKDIQYsR1zJFYPG4tZT-QTioWCk');
  // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication

  const deCoded = JSON.parse(Buffer.from(process.env.GOOGLE_ENCODED!, "base64").toString())

  await doc.useServiceAccountAuth({
    // env var values are copied from service account credentials generated by google
    // see "Authentication" section in docs for more info
    client_email: deCoded.client_email,
    private_key: deCoded.private_key,
  });


  await doc.loadInfo() // loads document properties and worksheets
  //await doc.updateProperties({ title: 'renamed doc' });
  //  const values 

  const {
    firstName,
    lastName,
    company,
    address,
    city,
    apartmen,
    country,
    state,
    postalCode,
    phone,
    email,
    selectedPaymentMethod,
    selectedDeliveryMethod,
    cartItems,
  } = req.body


  try {
    const orderSheet = doc.sheetsByTitle["Order"]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    const orderLineSheet = doc.sheetsByTitle["Orderline"]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]
    const headerId = uuid()
    const headerRow = await orderSheet.addRow(
      {
        id: uuid(),
        firstName,
        lastName,
        company,
        address,
        city,
        apartmen,
        country,
        state,
        postalCode,
        phone,
        selectedPaymentMethod,
        selectedDeliveryMethod,
        email,
      }
    );



    for (let i = 0; i < cartItems.length; i++) {

      const orderLineRows = await orderLineSheet.addRow(
        {
          id: uuid(),
          productId: cartItems[i].id,
          orderId: headerId,
          quantity: cartItems[i].quantity

        }
      )
    }


    res.send("OrderCreate")
  } catch (error) {
    res.status(500).send(error)
  }



}

// const auth = new google.auth.GoogleAuth({
//   keyFile: "credentials.json",
//   scopes: "https://www.googleapis.com/auth/spreadsheets",
// });

// const client = await auth.getClient()
// const googleSheets = google.sheets({ version: "v4", auth: client });
// const response = await googleSheets.spreadsheets.values.append({
//   spreadsheetId: "1tBKcuCiJc5A7i3jWXKDIQYsR1zJFYPG4tZT-QTioWCk",
//   valueInputOption: "USER_ENTERED",
//   range: "Order!A1:B1",
//   requestBody: {
//     values: [
//       [

//         //body.Products
//       ]
//     ]
//   }
// })

// res.send(response.data)

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





