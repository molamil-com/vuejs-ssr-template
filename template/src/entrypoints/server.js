import { vm, router, store } from 'app'

export default (context) => {
    router.push(context.url)
    /* eslint-disable array-callback-return, consistent-return */
    return Promise.all(router.getMatchedComponents().map((component) => {
        if (component) {
            if (component.serverData) {
                return component.serverData(store)
            }
        }
    })).then(() => {
        context.initialState = store.state
        context.meta = store.state.meta
        return vm
    })
}
