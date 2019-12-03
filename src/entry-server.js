import {
  createApp
} from './app'

export default context => {
  return new Promise((resolve, reject) => {
    const {
      app,
      router
    } = createApp()

    // 设置服务端 router 的位置
    router.push(context.url)

    // 等到 router 将可能的异步组件和钩子函数解析完
    router.onReady(() => {
      // https://router.vuejs.org/zh/api/#router-getmatchedcomponents
      // 返回目标位置或是当前路由匹配的组件数组
      const matchedComponents = router.getMatchedComponents()
      // 匹配不到的路由，执行 reject 函数，并返回404
      if (!matchedComponents.length) {
        return reject({code: 404})
      }
      
      // resolve应用实例，渲染
      resolve(app)
    }, reject)
  })
}
