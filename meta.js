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
            "message": "Boilerplate setup and libs.",
            "choices": [
                {
                    "name": "Full",
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
                    "value": "base", 
                },

            ],
        },
    },
    "filters": {
        "src/assets/styles/common/_susy.scss": "susy",
        "src/server/**/*": "template == 'ssr'",
        "src/entrypoints/server.js": "template == 'ssr'",
        "src/templates/index.twig": "template == 'ssr'",
        "src/templates/index.html": "template == 'basic'",
        "build/webpack/packs/server/**/*": "template == 'ssr'",
    },
    "helpers": {
        ifCond: (v1, operator, v2, options) => {
            console.log(operator)
            switch (operator)
            {
                case "==":
                    return (v1==v2)?options.fn(this):options.inverse(this);

                case "!=":
                    return (v1!=v2)?options.fn(this):options.inverse(this);

                case "===":
                    return (v1===v2)?options.fn(this):options.inverse(this);

                case "!==":
                    return (v1!==v2)?options.fn(this):options.inverse(this);

                case "&&":
                    return (v1&&v2)?options.fn(this):options.inverse(this);

                case "||":
                    return (v1||v2)?options.fn(this):options.inverse(this);

                case "<":
                    return (v1<v2)?options.fn(this):options.inverse(this);

                case "<=":
                    return (v1<=v2)?options.fn(this):options.inverse(this);

                case ">":
                    return (v1>v2)?options.fn(this):options.inverse(this);

                case ">=":
                 return (v1>=v2)?options.fn(this):options.inverse(this);

                default:
                    return eval(""+v1+operator+v2)?options.fn(this):options.inverse(this);
            }
        },
    },
    "completeMessage": "Golden!",
}
