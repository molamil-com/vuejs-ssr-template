import fs from 'fs-extra'
import config from '../../../config/config'

switch(process.argv[2]) {
case 'render':
    if( fs.existsSync(config.path.static) ) {
        fs.removeSync(config.path.static)
    }
    break
default:
    if( fs.existsSync(config.path.app) ) {
        fs.removeSync(config.path.app)
    }
}
