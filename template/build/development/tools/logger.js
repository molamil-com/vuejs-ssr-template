const winston = require('winston')

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)( {
            'timestamp': () => {
                const time = new Date()
                return `[${time.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, '$1')}]`
            }
        })
    ]
});

export default logger
