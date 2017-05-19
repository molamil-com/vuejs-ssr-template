module.exports = {
    "prompts": {
        "name": {
            "type": "string",
            "required": true,
            "message": "Project name",
        },
        "description": {
            "type": "string",
            "required": false,
            "message": "Project description",
            "default": "A Molamil Vue.js project",
        },
        "template": {
            "type": "list",
            "message": "Which base template?",
            "choices": [
                {
                    "name": "Vue Basic",
                    "value": "basic",
                    "short": "Basic",
                },
                {
                    "name": "Vue SSR",
                    "value": "ssr",
                    "short": "SSR",
                },
            ]
        },
        "vuex": {
            "type": "confirm",
            "message": "Use VueX?",
            "default": true,
        },
        "susy": {
            "type": "confirm",
            "message": "Add Susy?",
            "default": true,
        },
        "setup": {
            "type": "list",
            "message": "Boilerplate setup",
            "choices": [
                {
                    "name": "Full site with libs and utils",
                    "value": "full",
                    "default": true, 
                },
                {
                    "name": "Boilerplate examples only",
                    "value": "examples",
                    "default": false, 
                },
                {
                    "name": "Libs and utils only",
                    "value": "libs",
                    "default": false, 
                },
                {
                    "name": "Nothing.",
                    "value": "nothing", 
                },

            ],
        },
    },
    "helpers": {
        str: (str) => {
            return str
        },
    },
    "skipInterpolation": "src/components/**/*.+(vue|js)",
    "filters": {
        "src/components/**/*.+(vue|scss|js)": "setup == 'full' || setup == 'examples'",
        "src/api/**/*.js": "setup == 'full' || setup == 'examples'",
        "src/assets/styles/common/_susy.scss": "susy",
        "src/server/**/*": "template == 'ssr'",
        "src/entrypoints/server.js": "template == 'ssr'",
        "src/templates/index.twig": "template == 'ssr'",
        "src/templates/index.html": "template == 'basic'",
        "build/webpack/packs/server/**/*": "template == 'ssr'",
    },
    "completeMessage": "Golden!",
}
