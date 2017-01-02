/* eslint-disable import/first */
process.env.VUE_ENV = 'server'

import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'

const fs = require('fs')
const server = express()

server.use(express.static(`/app`))
// server.use(favicon('/app/static/images/favicons/favicon.ico'))

/* eslint-disable no-console */
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}/`)
})
