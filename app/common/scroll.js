
// 监听滚动条是否

let list = []
let $window = $(window)
let $document = $(document)

$window.scroll(function(){
  if ($document.scrollTop() + $window.height() >= $document.height() - 150) {
    for (let i = 0, max = list.length; i < max; i++) {
      list[i].callback()
    }
  }
})

export const add = (name, fn) => {
  list.push({ name: name, callback: fn })
  return
}

export const remove = (name)=>{

  for (let i = 0, max = list.length; i < max; i++) {
    if (list[i].name == name) {
      list.splice(i, 1);
    }
  }
}
