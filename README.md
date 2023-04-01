# JournalApp con React + Vite

- Material UI
- Diferentes componentes de material
- Uso de funciones propias de MaterialUI
- Configuración de temas personalizados

---

## Documentación MaterialUI
```
https://mui.com/material-ui/getting-started/installation/
```

## Instalaciones de MaterialUI

```
npm install @mui/material @emotion/react @emotion/styled
```

- Agregar en index.html (Google Web Fonts)
```
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
/>
```

- Instalacion de iconos
```
npm install @mui/icons-material
```

## Instalaciones para testing con npm en vite + react

- npm install jest babel-jest @babel/preset-env @babel/preset-react --save-dev
- npm install @testing-library/react @types/jest jest-environment-jsdom --save-dev
- npm install whatwg-fetch --save-dev

3. Actualizar los scripts del __package.json__
```
"scripts: {
  ...
  "test": "jest --watchAll"
}
```

3.1 Eliminar en __package.json__ 
```
"type": "module"
```

4. Crear la configuración de babel __babel.config.js__
```
module.exports = {
    presets: [
        [ '@babel/preset-env', { targets: { esmodules: true } } ],
        [ '@babel/preset-react', { runtime: 'automatic' } ],
    ],
};
```

5. Opcional, pero eventualmente necesario, crear Jest config y setup:

__jest.config.js__
```
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    setupFiles: ['./jest.setup.js'],
    transformIgnorePatterns: [],
}
```

__jest.setup.js__
```
// En caso de necesitar la implementación del FetchAPI
import 'whatwg-fetch'; // <-- yarn add whatwg-fetch
```