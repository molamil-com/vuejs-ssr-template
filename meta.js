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
    },
    "filters": {
        "src/server/**/*": "template == 'ssr'",
        "src/entrypoints/server.js": "template == 'ssr'",
        "src/templates/index.twig": "template == 'ssr'",
        "src/templates/index.html": "template == 'basic'",
        "build/webpack/packs/server/**/*": "template == 'ssr'",
    },
    "completeMessage": "Golden!",
}
