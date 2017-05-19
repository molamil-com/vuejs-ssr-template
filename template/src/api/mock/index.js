import request from 'superagent'
import mock from 'superagent-mocker'
import debug from 'debug'
import frontpage from './data.frontpage'
import defaultData from './data.default'


function setMock(endpoint, data) {
    mock.get(endpoint, function get(req) {
        debug('app')('mock get: %s', req.url)
        return {
            id: req.params.id,
            text: JSON.stringify(data),
            headers: req.headers,
        }
    })
}
const api = {
    setup(endpoints) {
        endpoints = endpoints || ['']
        for (const endpoint of endpoints) {
            setMock(`${endpoint}info/default`, defaultData)
            // setMock(`${endpoint}pages/frontpage`, frontpage)
            // setMock(`${endpoint}programs/:program_id`, 'data.program')
            // setMock(`${endpoint}programs`, 'data.programs')
            // setMock(`${endpoint}stories`, 'data.stories')


            // TODO: podcasts for program page. and other stuff (like podcast tree).
            // http://api.radio24syv.dk/podcasts/program/3843145?size=x

            // TODO promo for program returns same as podcast
            // http://api.radio24syv.dk/podcasts/promo/:id
            // id = videoProgramId

            // TODO: single podcast
            // http://api.radio24syv.dk/podcasts/:id

            // TODO: podcast sections for drawer
            // id = "videoPodcastId": 15085019,
            // token = "oauthToken": "5f5a7abc5343fcdef0e0ed9a2a6af084",
            // /podcasts/sections/:id/:token

            // TODO: newsarticles for "nyhedsarkiv" limit default is 12
            // /stories?limit=10&page=1
            // TODO: get latest and next news broadcast podcast for use on "Nyhedsarkiv" page

            // TODO: single newsarticle for drawer. Use slug from /stories item
            // /stories/syge-danske-soldater-sendes-i-krig

            // TODO: Broadcast (live) for BroadcastSchedule, BroadcastScheduleLite and the playlist live list.
            // /broadcasts/next/12/0 //get 12 with 0 offset.
            // Theres a new feature on the new api
            // /broadcasts/timeframe?start=:isoDateStart&end=:isoDateEnd
        }
        mock.timout = function mocktimeout() {
            return Math.random() * 400 | 0
        }
        mock(request)
    },
}


export default api
