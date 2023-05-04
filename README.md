# Pokemon App Guide

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh

npm install

```

### Compile and Hot-Reload for Development

```sh

npm run dev

```

### Compile and Minify for Production

```sh

npm run build

```

### Lint with [ESLint](https://eslint.org/)

```sh

npm run lint

```

## Additional Guide

### Components

All components is stored in `src/components` and these components wrapped inside `src/components/index.js` for instaled later in `src/main.js` so if you add a component please make sure you add your component inside `src/components/index.js` so your component will be a global component and easy to use later

    // example
    import MyComponent from './MyComponent/MyComponent.component.vue';

    export const installGlobalComponents = (app) => {
      app.component('my-component', MyComponent); // Place your component here
    };

on the template, you only need to call the component name based on the one you just created

    <template>
    	<my-component />
    </template>

### Api Config

We use `axios` for make a request API to the server. The configuration file locate in `src/lib` there are 2 file `clientApi.js` & `index.js`

##### clientApi.js

Contain axios instance with the basic config, you can add more config here

    import axios from  'axios';

    export  const clientApi = axios.create({
      baseURL: 'https://pokeapi.co/api/v2',
      headers: {
        'Content-Type':	'application/json'
      }
      // add more config here
    });

##### index.js

Contain function for axios instance installation that imported from `clientApi.js`

### Store

We use pinia for the state management. All our data state stored inside `src/store` please make sure export your store to `src/store/index.js` after you create a store like this

##### my-store.js

    import { inject, ref } from  'vue';
    import { defineStore } from  'pinia';

    export const useMyStore = defineStore('my-store', () => {
      const axios = inject('axios'); // inject axios if you need
      const items = ref([]);

      async  function  getItems() {
        const { data } =  await axios.get('/items')

        items.value  = data.results
      }

      return {
        items,
        getItems
      };
    });

##### index.js

    export * from './my-store';

in your template just simple import like this

    import { useMyStore } from  '@/stores';
