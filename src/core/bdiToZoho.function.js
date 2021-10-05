mapToZohoProduct = bdiProduct => {
  if (!bdiProduct) throw new Error('Error on mapToZohoProduct: bdiProduct is undefined')
  return {
    Product_Code: bdiProduct.USR_STINTE_ARTCOD,
    Product_Name: bdiProduct.USR_STINTE_ARTCOD,
    Description: bdiProduct.USR_STINTE_DESCRP,
    Qty_in_Stock: bdiProduct.USR_STINTE_STOCKS,
  }
}

module.exports = mapToZohoProduct