---
title: "Principios Solid en React Parte 4 - ISP"
pubDate: "2020-08-12"
slug: "solid-principles-react-4"
description: "Principios Solid en React Parte 1 - Principio de segregación de interfaz."
hero: "/images/solid2.webp"
tags: ["javascript"]
layout: "../../layouts/BlogPostLayout.astro"
draft: false
---

## Principio de segregación de interfaz (ISP)

Según ISP, "los clientes no deben depender de interfaces que no usan". Por el bien de las aplicaciones React, lo traduciremos en "los componentes no deberían depender de accesorios que no usan".

Estamos ampliando la definición del ISP aquí, pero no es una gran exageración: tanto los accesorios como las interfaces se pueden definir como contratos entre el objeto (componente) y el mundo exterior (el contexto en el que se usa), por lo que podemos dibujar paralelismos entre los dos. Al final, no se trata de ser estricto e inflexible con las definiciones, sino de aplicar principios genéricos para resolver un problema.

Para ilustrar mejor el problema al que se dirige el ISP, usaremos TypeScript para el siguiente ejemplo. Consideremos la aplicación que muestra una lista de videos:

```js
type Video = {
  title: string
  duration: number
  coverUrl: string
}
type Props = {
  items: Array<Video>
}
const VideoList = ({ items }) => {
  return (
    <ul>
      {items.map(item =>
        <Thumbnail
          key={item.title}
          video={item}
        />
      )}
    </ul>
  )
}
```

Nuestro `Thumbnail` componente que usa para cada elemento podría verse así:

```js
type Props = {
  video: Video,
};
const Thumbnail = ({ video }: Props) => {
  return <img src={video.coverUrl} />;
};
```

El `Thumbnail` componente es bastante pequeño y simple, pero tiene un problema: espera que se pase un objeto de video completo como accesorios, mientras usa de manera efectiva solo una de sus propiedades.

Para ver por qué eso es problemático, imagine que además de los videos, también decidimos mostrar miniaturas para transmisiones en vivo, con ambos tipos de recursos de medios mezclados en la misma lista.

Presentaremos un nuevo tipo que define un objeto de transmisión en vivo:

```js
type LiveStream = {
  name: string
  previewUrl: string
}
```

`VideoList` Y este es nuestro componente actualizado :

```js
type Props = {
  items: Array<Video | LiveStream>,
};
const VideoList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => {
        if ("coverUrl" in item) {
          // it's a video
          return <Thumbnail video={item} />;
        } else {
          // it's a live stream, but what can we do with it?
        }
      })}
    </ul>
  );
};
```

Como puedes ver, aquí tenemos un problema. Podemos distinguir fácilmente entre objetos de video y transmisión en vivo, pero no podemos pasar este último al Thumbnailcomponente porque Videoy LiveStreamson incompatibles. Primero, tienen diferentes tipos, por lo que TypeScript se quejaría de inmediato. En segundo lugar, contienen la URL de la miniatura en diferentes propiedades: el objeto de video lo llama coverUrl, el objeto de transmisión en vivo lo llama previewUrl. Ese es el quid del problema de que los componentes dependan de más accesorios de los que realmente necesitan: se vuelven menos reutilizables. Así que vamos a arreglarlo.

Refactorizaremos nuestro `Thumbnail` componente para asegurarnos de que se base solo en los accesorios que requiere:

```js
type Props = {
  coverUrl: string,
};
const Thumbnail = ({ coverUrl }: Props) => {
  return <img src={coverUrl} />;
};
```

Con este cambio, ahora podemos usarlo para renderizar miniaturas de videos y transmisiones en vivo:

```js
type Props = {
  items: Array<Video | LiveStream>,
};
const VideoList = ({ items }) => {
  return (
    <ul>
      {items.map((item) => {
        if ("coverUrl" in item) {
          // it's a video
          return <Thumbnail coverUrl={item.coverUrl} />;
        } else {
          // it's a live stream
          return <Thumbnail coverUrl={item.previewUrl} />;
        }
      })}
    </ul>
  );
};
```

El principio de segregación de interfaces aboga por minimizar las dependencias entre los componentes del sistema, haciéndolos menos acoplados y por lo tanto más reutilizables.
