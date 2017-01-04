/* eslint-disable import/first */
process.env.VUE_ENV = 'server'

import express from 'express'

const server = express()
server.use(express.static(`/app`))

/* eslint-disable no-console */
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}/`)
})
