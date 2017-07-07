import request from 'superagent'
{{#unless_eq setup 'nothing'}}
import _ from 'lodash'
import mock from './mock/index'

const server = '/'

// setup mocked endpoints
mock.get(`${server}site`, mock.data.site)
mock.get(`${server}pages/:id`)

const headers = {
    Accept: 'application/json',
}


function fetch(path, query) {
    const q = query || {}
    return new Promise((resolve, reject) => {
        // do not prepend server to path if path is absolute.
        const url = path.match(/^http/g) ? path : `${server}${path}`
        debug('app:api')('fetching url: %s', url)
        request.get(url).set(headers).query(q).then(
            (res) => {
                // success
                resolve(res)
            },
            (res) => {
                // failure
                debug('app:api')('fetch: %s failure', path)
                debug('app:api')('%o', res)
                resolve(res)
            },
        )
    })
}

export function fetchSite() {
    return fetch('site')
}

export function fetchPage(id, query) {
    return fetch(`pages/${id}`, query)
}
{{/unless_eq}}
