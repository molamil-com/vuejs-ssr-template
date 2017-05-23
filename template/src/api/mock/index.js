import request from 'superagent'
import _ from 'lodash'

import menu from './data.menu'
import footer from './data.footer'

const mock = require('superagent-mocker')(request)

mock.timeout = function timeout() {
    return Math.random() * 200
}

function defaultGetResult(req) {
    debug('app:info')('mock : %o', req)
    const res = {
        id: req.params.id,
        text: 'hello world',
        headers: req.headers,
    }
    debug('app:info')('mock: %o', res)
    return res
}
function defaultPostResult(req) {
    debug('app:info')('mock : %o', req)
    return {
        id: req.params.id,
        text: JSON.stringify(data),
        headers: req.headers,
    }
}

const api = {
    get(endpoint, result) {
        debug('app:mock')('mock setup : %s', endpoint)
        const res = result || defaultGetResult
        mock.get(endpoint, res)
    },
    del(endpoint, result) {
        const res = result || defaultGetResult
        mock.del(endpoint, res)
    },
    post(endpoint, result) {
        const res = result || defaultPostResult
        mock.post(endpoint, res)
    },
    patch(endpoint, result) {
        const res = result || defaultPostResult
        mock.batch(endpoint, res)
    },
    data: {
        site(req) {
            return {
                meta: {
                    title: 'Awesome page title',
                    tags: [
                        {
                            name: 'property',
                            nameValue: 'og:title',
                            content: 'Example title for facebook',
                        },
                        {
                            name: 'property',
                            nameValue: 'og:description',
                            content: 'Example description for facebook',
                        },
                        {
                            name: 'name',
                            nameValue: 'description',
                            content: 'Page description. No longer than 155 characters.',
                        },
                        {
                            name: 'name',
                            nameValue: 'twitter:title',
                            content: 'Example title for twitter',
                        },
                    ],
                },
                footer,
                menu,
            }
        },
    },
}

export default api
