Simple scaffold and bundling of Molamil Vue applications with support for SSR and static site generation.

# UP & BUILDING #

The project currently uses node 6.9.3. If you use `nvm` as recommended just run `nvm use`.

```
$ npm install -g vue-cli
$ vue init molamil-com/vuejs-ssr-template <my-project>
$ cd <my-project>
$ npm install && npm run dev
```

To build for production,

```
$ npm run release
```

To build a prerendered app,

```
$ npm run release -- render
```

Both release commands will build a dist folder containing you application.

# DEPLOYING #

# DOCUMENTATION #

# CONTRIBUTING #

# FAQ #

### CREDIT & REFERENCES ###

* https://github.com/vuejs/vue
* https://github.com/webpack/webpack
* https://github.com/vuejs/vue-hackernews-2.0
* https://github.com/LucasIcarus/Vuepack-SSR