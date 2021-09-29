mapToZohoProduct = bdiProduct => {
  if (!bdiProduct) throw new Error('Error on mapToZohoProduct: bdiProduct is undefined')
  return {
    Product_Code: !bdiProduct.USR_STINTE_INDCOD ? '' : bdiProduct.USR_STINTE_INDCOD,
    Product_Name: !bdiProduct.USR_STINTE_ARTCOD ? '' : bdiProduct.USR_STINTE_ARTCOD,
    Description: !bdiProduct.USR_STINTE_DESCR ? '' : bdiProduct.USR_STINTE_DESCR,
    Qty_in_Stock: !bdiProduct.USR_STINTE_STOCKS ? 0 : bdiProduct.USR_STINTE_STOCKS,
  }
}

module.exports = mapToZohoProduct