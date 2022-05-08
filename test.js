const category = {}

const arr = [
  {title:"1", category:"a", link:"link/1"},
  {title:"2", category:"a", link:"link/2"},
  {title:"3", category:"a", link:"link/3"},
  {title:"4", category:"a", link:"link/4"},
  {title:"5", category:"a", link:"link/5"},
  {title:"1", category:"b", link:"link/1"},
  {title:"2", category:"b", link:"link/2"},
  {title:"3", category:"b", link:"link/3"},
  {title:"4", category:"b", link:"link/4"},
  {title:"5", category:"b", link:"link/5"},
  {title:"1", category:"c", link:"link/1"},
  {title:"2", category:"c", link:"link/2"},
  {title:"3", category:"c", link:"link/3"},
  {title:"4", category:"c", link:"link/4"},
  {title:"5", category:"c", link:"link/5"}
]

let categoryObj = []
arr.forEach(item=>{
  const {title, link} = item
  if (!(categoryObj.hasOwnProperty(item.category))) categoryObj[item.category] = []
  categoryObj[item.category].push({title, link})
})

console.log(categoryObj)