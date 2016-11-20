
// 到达页尾事件
const arriveFooter = (function(){

  let list = []
  let clientHeight = document.documentElement.clientHeight

  window.addEventListener('resize', (e)=>{
    clientHeight = document.documentElement.clientHeight
  }, false)

  window.addEventListener('scroll', (e)=>{

    let scrollTop = document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset || 0
    let scrollHeight = document.body.scrollHeight || document.documentElement.scrollTop

    if (scrollTop + clientHeight >= scrollHeight - 150) {
      list.map((val)=>{ val.callback() })
    }

  }, false)

  return {
    add: (name, fn)=>{
      list.push({ name: name, callback: fn })
    },
    remove: (name)=>{
      for (let i = 0, max = list.length; i < max; i++) {
        if (list[i].name == name) {
          list.splice(i, 1);
          break
        }
      }
    }
  }

}())

export default arriveFooter
