---
title: "Escribe commits como un Senior"
pubDate: "02/02/2023"
slug: "commits-like-a-senior"
description: "Principios Solid en React Parte 1 - Principio de Responsabilidad Unica."
hero: "/images/git.png"
tags: ["Git", "Commits", "Buenas Practicas"]
layout: "../../layouts/BlogPostLayout.astro"
author: "Lucas Angelino"
gravatar: "e6e68dcf018f4c6c2954d899ba5283c8"
draft: false
---

## Motivación

Si estas en el mundo de la programación seguramente estes utilizando **Git** como controlador de versiones de tu código. Versionar el código es de vital importancia para cualquier proyecto tanto personal como profesional.

Hoy te traigo 6 buenas practicas para que escribas tus commits como un **Senior Developer**.

## Usa el verbo en infinitivo

Utiliza terminos como **add**, **update**, **fix**, **remove** en vez de **added**, **updated**, **fixed**, **removed**. Recuerda que nuestro commit es una solicitud de cambio, no un informe de lo que hiciste.

```js
// no hagas esto ❌
git commit -m "added style to shop card"
```

```js
// haz esto ✅
git commit -m "add style to shop card"
```

## No utilices puntos signos de puntación en los mensajes

No uses puntos, signos de puntuación o mayúsculas en los mensajes de los commits, ya que no son necesarios.

```js
// no hagas esto ❌
git commit -m "Add style to shop card."
```

```js
// haz esto ✅
git commit -m "add style to shop card"
```

## Usa el cuerpo del commit para explicar el por qué

El cuerpo del commit es el lugar donde puedes explicar el por qué de tu cambio. Para ello utiliza el segundo parametro para escribir el **porque** de tu cambio. Recuerda que no siempre es necesario escribir el por qué, pero si es necesario hacerlo, hazlo.

```js
// no hagas esto ❌
git commit -m "add style to shop card"
```

```js
// haz esto ✅
git commit -m "add style to shop card" -m "the style was added to the shop card to make it more attractive"
```

## Haz commits de 50 caracteres como máximo

Se supone un buen programador escribe commits pequeños, por lo que si tiene que agregar mucho texto para explicar que es lo que hace tu cambio, seguramente hayas agregado demasiadas cosas en un solo commit.

## Usa el prefijo del tipo de cambio

El prefijo del tipo de cambio es una buena práctica que te permite identificar rápidamente el tipo de cambio que has realizado. Por ejemplo si se trata de un nuevo feature, un fix, un refactor, etc. Incluso puedes agregar el identificador de la tarea que estas resolviendo.

```js
// no hagas esto ❌
git commit -m "add verification to the shop card"
```

```js

```

```js
// haz esto ✅
git commit -m "feature/add-age-verificacion-JIRA-2020: add age verification to the shop card"
```

```js
// haz esto ✅
git commit -m "bugfix/add-age-verificacion-JIRA-2020: fix age verification to the shop card"
```

## Utiliza herramientas como husky y commitlint

Utiliza herramientas como **husky** y **commitlint** para que te ayude a escribir commits de una manera mas ordenada y profesional. Husky te permite ejecutar scripts antes de que se realice un commit, por lo que puedes validar que el commit cumpla con las buenas practicas que acabamos de ver. Commitlint te permite configurar reglas para que tus commits cumplan con las buenas practicas.

> Si te gusto este post, no olvides compartirlo con tus amigos. Si tienes alguna duda o sugerencia, no dudes en escribirme por Github.
