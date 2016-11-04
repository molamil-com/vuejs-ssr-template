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
                    "short": "basic",
                },
                {
                    "name": "Vue SSR",
                    "value": "ssr",
                    "short": "ssr",
                },
            ]
        },
        "prerender": {
            "type": "confirm",
            "message": "Enable Webpack prerendering?",
            "default": false,
        },
    },
    "completeMessage": "Golden!",
}
