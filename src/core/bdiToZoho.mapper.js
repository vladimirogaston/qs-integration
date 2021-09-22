mapToZohoProduct = bdiProduct => {
    if (!bdiProduct) throw new Error('Error on mapToZohoProduct: bdiProduct is undefined')
    return {
      Product_Code: !bdiProduct.code ? '' : bdiProduct.code,
      Product_Name: !bdiProduct.name ? '' : bdiProduct.name,
      Description: !bdiProduct.desc ? '' : bdiProduct.desc,
      Qty_in_Stock: !bdiProduct.stock ? 0 : bdiProduct.stock,
    }
  }

  module.exports = mapToZohoProduct