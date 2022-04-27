const arr = ["1","2","3"]

const result = arr.reduce((str, a)=>str+`${a}\n`,"")
console.log(result)