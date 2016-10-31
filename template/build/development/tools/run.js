function run(task, options) {
    const logger = require('./logger')
    const start = new Date()

    logger.log('info', `starting '${task.name}'...`)

    return task(options).then(() => {
        const end = new Date()
        const time = end.getTime() - start.getTime()

        logger.log('info', `finished '${task.name}' after ${time} ms`)
    })
}

if(process.mainModule.children.length === 0 && process.argv.length > 2) {
    delete require.cache[__filename]

    const module = require(`${process.argv[2]}`)
    run(module).catch(err => console.error(err.stack))
}

export default run
