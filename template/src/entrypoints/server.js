import { vm, router, store } from 'app'

export default (context) => {
    router.push(context.url)

    /* eslint-disable array-callback-return */
    /* eslint-disable consistent-return */
    return Promise.all(router.getMatchedComponents().map((component) => {
        if (component) {
            // Look into exactly how....
            if (component.meta) {
                const meta = component.meta()
                context.meta = meta
            }

            if (component.preFetch) {
                return component.preFetch(store)
            }
        }
    })).then(() => {
        context.initialState = store.state
        // context.meta = store.meta

        return vm
    })
}
