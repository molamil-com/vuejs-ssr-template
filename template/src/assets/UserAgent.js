/* eslint-disable no-unused-vars, max-len, no-undef, no-useless-escape, quote-props, no-nested-ternary */

import _ from 'lodash'

let ua = false

const PREFIX = ' ua-'
const rPlatform = /\s*([\-\w ]+)[\s\/\:]([\d_]+\b(?:[\-\._\/]\w+)*)/
const rVersion = /([\w\-\.]+[\s\/][v]?[\d_]+\b(?:[\-\._\/]\w+)*)/g
const rBlackBerry = /\b(?:(blackberry\w*|bb10)|(rim tablet os))(?:\/(\d+\.\d+(?:\.\w+)*))?/
const rSilk = /\bsilk-accelerated=true\b/
const rFluidApp = /\bfluidapp\b/
const rDesktop = /(\bwindows\b|\bmacintosh\b|\blinux\b|\bunix\b)/
const rMobile = /(\bandroid\b|\bipad\b|\bipod\b|\bwindows phone\b|\bwpdesktop\b|\bxblwp7\b|\bzunewp7\b|\bwindows ce\b|\bblackberry\w*|\bbb10\b|\brim tablet os\b|\bmeego|\bwebos\b|\bpalm|\bsymbian|\bj2me\b|\bdocomo\b|\bpda\b|\bchtml\b|\bmidp\b|\bcldc\b|\w*?mobile\w*?|\w*?phone\w*?)/
const rGame = /(\bxbox\b|\bplaystation\b|\bnintendo\s+\w+)/

function init() {
    if (ua) {
        return ua
    }
    // setup our useragent object (aka ua)
    ua = {
        standalone: navigator.standalone,
    }
    const uaStr = navigator.userAgent.toLowerCase()
    if (!uaStr) {
        return ua
    }

    ua.string = uaStr

    const raws = ua.string.split(/[()]/)
    _.each(raws, (raw, rawIndex) => {
        // debug('app:ua')('raw: %s', raw)
        if (rawIndex % 2) {
            // inside parens covers platform identifiers
            const platforms = raw.toLowerCase().split(';')
            _.each(platforms, (platform, platformIndex) => {
                if (rPlatform.exec(platform)) {
                    const key = RegExp.$1.split(' ').join('_')
                    const val = RegExp.$2
                    // if duplicate entries favor highest version
                    // debug('app:ua')('key: %s, ua[key]: %s, val: %s', key, ua[key], parseFloat(val))
                    if ((!ua[key] || parseFloat(ua[key]) < parseFloat(val))) {
                        ua[key] = val
                    }
                }
            })
        } else {
            // outside parens covers most version identifiers
            const versionIdentifiers = raw.toLowerCase().match(rVersion)
            _.each(versionIdentifiers, (vid, vidIndex) => {
                const parts = vid.split(/[\/\s]+/)
                if (parts.length && parts[0] !== 'mozilla') {
                    ua[parts[0].split(' ').join('_')] = parts.slice(1).join('-')
                }
            })
        }
    })
    if (rMobile.exec(uaStr)) {
        // mobile device indicators
        ua.mobile = RegExp.$1
        if (rBlackBerry.exec(uaStr)) {
            delete ua[ua.mobile]
            ua.blackberry = ua.version || RegExp.$3 || RegExp.$2 || RegExp.$1
            if (RegExp.$1) {
                // standardize non-tablet blackberry
                ua.mobile = 'blackberry'
            } else if (ua.version === '0.0.1') {
                // fix playbook 1.0 quirk
                ua.blackberry = '7.1.0.0'
            }
        }
    } else if (rGame.exec(uaStr)) {
        // game console indicators
        ua.game = RegExp.$1
        const game = ua.game.split(' ').join('_')

        if (ua.version && !ua[game]) {
            ua[game] = ua.version
        }
    } else if (rDesktop.exec(uaStr)) {
        // desktop OS indicators
        ua.desktop = RegExp.$1
    }

    // platform naming standardizations
    if (ua.intel_mac_os_x) {
        ua.mac_os_x = ua.intel_mac_os_x.split('_').join('.')
        delete ua.intel_mac_os_x
    } else if (ua.cpu_iphone_os) {
        ua.ios = ua.cpu_iphone_os.split('_').join('.')
        delete ua.cpu_iphone_os
    } else if (ua.cpu_os) {
        ua.ios = ua.cpu_os.split('_').join('.')
        delete ua.cpu_os
    } else if (ua.mobile === 'iphone' && !ua.ios) {
        ua.ios = '1'
    }
    // UA naming standardizations
    if (ua.opera && ua.version) {
        ua.opera = ua.version
        // version/XXX refers to opera
        delete ua.blackberry
    } else if (rSilk.exec(uaStr)) {
        ua.silk_accelerated = true
    } else if (rFluidApp.exec(uaStr)) {
        ua.fluidapp = ua.version
    }
    if (ua.edge) {
        delete ua.applewebkit
        delete ua.safari
        delete ua.chrome
        delete ua.android
    }
    if (ua.applewebkit) {
        ua.webkit = ua.applewebkit
        delete ua.applewebkit
        if (ua.opr) {
            ua.opera = ua.opr
            delete ua.opr
            delete ua.chrome
        }
        if (ua.safari) {
            if (ua.chrome || ua.crios || ua.fxios || ua.opera || ua.silk || ua.fluidapp || ua.phantomjs || (ua.mobile && !ua.ios)) {
                delete ua.safari

                if (ua.vivaldi) {
                    delete ua.chrome
                }
            } else if (ua.version && !ua.rim_tablet_os) {
                ua.safari = ua.version
            } else {
                ua.safari = ({
                    '419': '2.0.4',
                    '417': '2.0.3',
                    '416': '2.0.2',
                    '412': '2.0',
                    '312': '1.3',
                    '125': '1.2',
                    '85': '1.0',
                })[parseInt(ua.safari, 10)] || ua.safari
            }
        }
    } else if (ua.msie || ua.trident) {
        if (!ua.opera) {
            // standardize Internet Explorer
            ua.ie = ua.msie || ua.rv
        }
        delete ua.msie
        delete ua.android

        if (ua.windows_phone_os) {
            // standardize window phone
            ua.windows_phone = ua.windows_phone_os
            delete ua.windows_phone_os
        } else if (ua.mobile === 'wpdesktop' || ua.mobile === 'xblwp7' || ua.mobile === 'zunewp7') {
            ua.mobile = 'windows desktop'
            ua.windows_phone = (+ua.ie < 9) ? '7.0' : (+ua.ie < 10) ? '7.5' : '8.0'
            delete ua.windows_nt
        }
    } else if (ua.gecko || ua.firefox) {
        ua.gecko = ua.rv
    }
    if (ua.rv) {
        delete ua.rv
    }
    if (ua.version) {
        delete ua.version
    }
    // if possible add css classes to document
    if (typeof document.documentElement !== 'undefined') {
        let css = ' '
        _.forIn(ua, (value, key) => {
            if (value && key !== 'string' && _.isString(value)) {
                // format to css valid classes
                // debug('app:ua')('value: %s, key: %s', value, key)
                // only include major version. ex 10.11.6 => 10
                css = `${css}${key} ${key}-${value.split('.')[0]} `
            }
        })
        // make sure the classes are valid
        css = css.replace(/_|\./g, '_')
        // append CSS classes to HTML node
        if (document.documentElement.className) {
            document.documentElement.className = document.documentElement.className.replace(/\bno-js\b/g, '') + css
        } else {
            document.documentElement.className = css.substr(1)
        }
        // window.ua = ua
        // display the classes added. Useful for debugging.
        // const output = document.createElement('div')
        // output.style.position = 'absolute'
        // output.style.width = '100%'
        // output.style.height = '100%'
        // output.style.zIndex = 999
        // output.style.padding = '10px'
        // output.style.top = 0
        // output.style.backgroundColor = 'rgba(0,0,0,0.5)'
        // document.body.appendChild(output)
        // const text = document.createElement('h1')
        // text.innerText = css
        // output.appendChild(text)
    }

    return ua
}

export default init
