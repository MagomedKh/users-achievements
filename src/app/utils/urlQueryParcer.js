function parcer(params) {
   if (params) {
      const arr = params.split('&')
      const result = {}
      arr.forEach(param => {
         result[param.split('=')[0]] = param.split('=')[1].split('+')
      })
      return result
   }
}

const urlQuery = {
   parce: parcer
}

export default urlQuery