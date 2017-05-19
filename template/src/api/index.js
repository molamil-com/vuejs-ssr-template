import request from 'superagent'
import _ from 'lodash'
import mock from './mock/index'

// on client we can do without protocol. But serverside we need it.
const protocol = (typeof window === 'undefined') ? 'http:' : ''
const server = `${protocol}//api.radio24syv.dk/v2/`

// mock.setup([`${protocol}//api.radio24syv.dk/`, `${protocol}//r24syv-backend-staging-v2.herokuapp.com/v2/`])

const headers = {
    Accept: 'application/json',
}


function fetch(path, query) {
    const q = query || {}
    return new Promise((resolve, reject) => {
        // do not prepend server to path if path is absolute.
        const url = path.match(/^http/g) ? path : `${server}${path}`
        request.get(url).set(headers).query(q).then(
            function success(res) {
                debug('app:api')('%s', JSON.stringify(res))
            },
            function failure(res) {
                debug('app:api')('fetch: %s failure', path)
                debug('app:api')('%s', JSON.stringify(res))
            },
        )
    })
}
