import * as functions from 'firebase-functions'
import rp from 'request-promise'
import cheerio from 'cheerio'
import { IGetAmazonDetails } from '../../models/functions/getAmazonDetails'

module.exports = functions
  .region('asia-northeast1')
  .https.onCall((data: IGetAmazonDetails, context) => {
    if (
      typeof context.auth !== 'object' ||
      typeof context.auth.uid !== 'string' ||
      typeof data.items !== 'object' ||
      data.items.length === 0
    ) {
      throw new Error('bad request')
    }

    return Promise.all(
      data.items.map((item) => {
        return rp(`https://www.amazon.co.jp/dp/${item}`)
      })
    ).then((responses) => {
      return responses.map((response, index) => {
        return {
          id: data.items[index],
          title: cheerio
            .load(response)('#productTitle')
            .text()
            .replace(/\n| {2}/g, ''),
          price: Number(
            cheerio
            .load(response)('#price_inside_buybox')
            .text()
            .replace(/\n| |￥|,/g, '')
          )
        }
      })
    })
  })
