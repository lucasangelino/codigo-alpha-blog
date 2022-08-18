---
title: "Principios Solid en React Parte 2 - DIP"
pubDate: "2020-08-18"
slug: "solid principles-react-2"
description: "Principios Solid en React Parte 2 - Principio de Inversion de deprendencia."
hero: "/images/solid2.webp"
tags: ["javascript"]
layout: "../../layouts/BlogPostLayout.astro"
draft: false
---

## Motivación

Este artículos es la segunda parte de esta saga de principios solid en React. En esta oportunidad hablaremos del principio de inversion de dependencia o DIP.

## Principio de responsabilidad única (SRP)

El principio de inversión de dependencia establece que “uno debe depender de abstracciones, no de concreciones”. En otras palabras, un componente no debería depender directamente de otro componente, sino que ambos deberían depender de alguna abstracción común. Aquí, componente se refiere a cualquier parte de nuestra aplicación, ya sea un componente de React, una función de utilidad, un módulo o una biblioteca de terceros. Este principio puede ser difícil de comprender en abstracto, así que pasemos directamente a un ejemplo.

A continuación, tenemos un `LoginForm` componente que envía las credenciales de usuario a alguna API cuando se envía el formulario:

```js
import api from "~/common/api";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await api.login(email, password);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log in</button>
    </form>
  );
};
```

En este fragmento de código, nuestro `LoginForm` componente hace referencia directamente al `api` módulo, por lo que existe un estrecho acoplamiento entre ellos. Esto es malo porque dicha dependencia hace que sea más difícil realizar cambios en nuestro código, ya que un cambio en un componente afectará a otros componentes. El principio de inversión de dependencia aboga por romper dicho acoplamiento, así que veamos cómo podemos lograrlo.

Primero, vamos a eliminar la referencia directa al `api` módulo desde el interior del `LoginForm`, y en su lugar, permitiremos que la funcionalidad requerida se inyecte a través de accesorios:

```js
type Props = {
  onSubmit: (email: string, password: string) => Promise<void>,
};
const LoginForm = ({ onSubmit }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await onSubmit(email, password);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Log in</button>
    </form>
  );
};
```

Con este cambio, nuestro `LoginForm` componente ya no depende del `api` módulo. La lógica para enviar credenciales a la API se abstrae a través de la `onSubmit` devolución de llamada y ahora es responsabilidad del componente principal proporcionar la implementación concreta de esta lógica.

Para hacer eso, crearemos una versión conectada de la `LoginForm` que delegará la lógica de envío de formularios al `api` módulo:

```js
import api from "~/common/api";
const ConnectedLoginForm = () => {
  const handleSubmit = async (email, password) => {
    await api.login(email, password);
  };
  return <LoginForm onSubmit={handleSubmit} />;
};
```

`ConnectedLoginForm` componente sirve como un pegamento entre el `api` y `LoginForm`, mientras que ellos mismos permanecen totalmente independientes entre sí. Podemos iterarlos y probarlos de forma aislada sin preocuparnos por romper las piezas móviles dependientes, ya que no hay ninguna. Y mientras ambos `LoginForm` se `api` adhieran a la abstracción común acordada, la aplicación en su conjunto seguirá funcionando como se esperaba.

En el pasado, este enfoque de crear componentes de presentación "tontos" y luego inyectarles lógica también fue utilizado por muchas bibliotecas de terceros. El ejemplo más conocido de esto es Redux, que vincularía los accesorios de devolución de llamada en los componentes a las `dispatch` funciones que usan connectun componente de orden superior (HOC). Con la introducción de los `Hooks`, este enfoque se volvió algo menos relevante, pero la inyección de lógica a través de HOC todavía tiene utilidad en las aplicaciones React.

Para concluir, el principio de inversión de dependencia tiene como objetivo minimizar el acoplamiento entre diferentes componentes de la aplicación. Como probablemente haya notado, la minimización es un tema recurrente en todos los principios de SOLID, desde minimizar el alcance de las responsabilidades de los componentes individuales hasta minimizar la conciencia de los componentes cruzados y las dependencias entre ellos.

En este punto, nuestro componente principal es lo suficientemente corto y sencillo como para dejar de desglosarlo y darlo por terminado. Sin embargo, si miramos un poco más de cerca, notaremos que todavía está haciendo más de lo que debería. Actualmente, nuestro componente está obteniendo datos y luego aplicándoles filtros, pero idealmente, solo queremos obtener los datos y representarlos, sin ninguna manipulación adicional. Entonces, como última mejora, podemos encapsular esta lógica en un nuevo `Hook` personalizado:

> A pesar de haber nacido de los problemas del mundo OOP, los principios SOLID tienen su aplicación mucho más allá. En este artículo, hemos visto cómo al tener cierta flexibilidad con las interpretaciones de estos principios, logramos aplicarlos a nuestro código React y hacerlo más fácil de mantener y robusto.
> Sin embargo, es importante recordar que ser dogmático y seguir religiosamente estos principios puede ser perjudicial y conducir a un código sobrediseñado, por lo que debemos aprender a reconocer cuándo una mayor descomposición o desacoplamiento de componentes introduce complejidad con poco o ningún beneficio.

Nos vemos en el siguiente capítulo donde hablaremos del `Principio Abierto-Cerrado`. 👋
