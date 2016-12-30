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
        "prerender": {
            "type": "confirm",
            "message": "Enable Webpack prerendering?",
            "default": false,
        },
    },
    "filters": {
        "src/server/**/*": "template == 'ssr'",
        "src/entrypoints/server.js": "template == 'ssr'",
        "src/templates/index.twig": "template == 'ssr'",
        "build/webpacks/server/**/*": "template == 'ssr'",
        "src/templates/index.html": "template == 'basic'",
        "build/webpacks/render/**/*": "prerender",
        "build/render.js": "prerender",
    },
    "completeMessage": "Golden!",
}
