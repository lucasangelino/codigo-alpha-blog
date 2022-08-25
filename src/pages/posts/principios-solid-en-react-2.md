---
title: "Principios Solid en React Parte 2 - OCP"
pubDate: "25 de Agosto 2022"
slug: "solid-principles-react-1"
description: "Principios Solid en React Parte 2 - Principio abierto-cerrado."
hero: "/images/solid2.webp"
tags: ["javascript"]
layout: "../../layouts/BlogPostLayout.astro"
author: "Lucas Angelino"
gravatar: "e6e68dcf018f4c6c2954d899ba5283c8"
draft: false
---

## Principio abierto-cerrado (OCP)

OCP establece que "las entidades de software deben estar abiertas para la extensión, pero cerradas para la modificación". Dado que nuestros componentes y funciones de React son entidades de software, no necesitamos modificar la definición en absoluto y, en su lugar, podemos tomarla en su forma original.

El principio `abierto-cerrado` aboga por estructurar nuestros componentes de una manera que les permita ser ampliados sin cambiar su código fuente original. Para verlo en acción, consideremos el siguiente escenario: estamos trabajando en una aplicación que usa un componente Header compartido en diferentes páginas y, según la página en la que nos encontremos, Header debería mostrar una interfaz de usuario ligeramente diferente:

```js
const Header = () => {
  const { pathname } = useRouter();

  return (
    <header>
      <Logo />
      <Actions>
        {pathname === "/dashboard" && (
          <Link to="/events/new">Create event</Link>
        )}
        {pathname === "/" && <Link to="/dashboard">Go to dashboard</Link>}
      </Actions>
    </header>
  );
};
const HomePage = () => (
  <>
    <Header />
    <OtherHomeStuff />
  </>
);
const DashboardPage = () => (
  <>
    <Header />
    <OtherDashboardStuff />
  </>
);
```

Aquí mostramos enlaces a diferentes componentes de la página dependiendo de la página actual en la que nos encontremos. Es fácil darse cuenta de que esta implementación es mala si pensamos en lo que sucederá cuando comencemos a agregar más páginas. Cada vez que se crea una nueva página, tendremos que volver a nuestro componente Header y ajustar su implementación para asegurarnos de que sepa qué enlace de acción mostrar. Tal enfoque hace que nuestro componente Header sea frágil y estrechamente acoplado al contexto en el que se usa, y va en contra del principio `abierto-cerrado`.

Para solucionar este problema, podemos usar la composición de componentes. Nuestro componente Header no necesita preocuparse por lo que representará en su interior y, en cambio, puede delegar esta responsabilidad a los componentes que lo usarán usando la propiedad children:

```js
const Header = ({ children }) => (
  <header>
    <Logo />
    <Actions>{children}</Actions>
  </header>
);
const HomePage = () => (
  <>
    <Header>
      <Link to="/dashboard">Go to dashboard</Link>
    </Header>
    <OtherHomeStuff />
  </>
);
const DashboardPage = () => (
  <>
    <Header>
      <Link to="/events/new">Create event</Link>
    </Header>
    <OtherDashboardStuff />
  </>
);
```

> Con este enfoque, eliminamos por completo la lógica variable que teníamos dentro del `Header` y ahora podemos usar la composición para poner allí literalmente cualquier cosa que queramos sin modificar el componente en sí.
> Siguiendo el principio abierto-cerrado, podemos reducir el acoplamiento entre los componentes y hacerlos más extensibles y reutilizables.
