import path from 'path'
import express from 'express'
import Twig from 'twig'
import serialize from 'serialize-javascript'
// import favicon from 'serve-favicon'

const fs = require('fs')
const vueServerRenderer = require('vue-server-renderer')

process.env.VUE_ENV = 'server'
// const resolve = file => path.resolve(__dirname, file)

const server = express()

const template = process.env.NODE_ENV === 'development' ?
      Twig.twig({ data: process.env.TEMPLATE }) :
      Twig.twig({ data: fs.readFileSync(`${path.join(__dirname, './app')}/index.twig`, 'utf8') })

const serverBundlePath = path.join(__dirname, './bundle.server.js')
const serverBundle = fs.readFileSync(serverBundlePath, 'utf8')

const bundleRenderer = vueServerRenderer.createBundleRenderer(serverBundle)

// server.use(favicon(__dirname + '/app/favicon.ico'));
server.use(express.static(`${__dirname}/app`))

server.get('*', (req, res) => {
    const context = { url: req.url }

    bundleRenderer.renderToString(context, (err, app) => {
        if (err) {
            // what to do here???
            res.status(500).send(`
                        <h1>Error: ${err.message}</h1>
                        <pre>${err.stack}</pre>
                        `)
        }

        const initialState = serialize(context.initialState, { isJSON: true })
        res.send(template.render({
            app,
            initialState,
            context,
        }))
    })
})

/* eslint-disable no-console */
const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`The server is running at http://localhost:${PORT}/`)
})
