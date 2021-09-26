delay = async (n) =>{
  if(n <= 0) {
    throw new Error('Delay cannot be less than 0')
  }
  return new Promise(function(resolve){
    setTimeout(resolve, n);
  })
}

module.exports = delay