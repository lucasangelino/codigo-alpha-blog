---
title: "Principios Solid en React Parte 3 - LSP"
pubDate: "2020-08-18"
slug: "solid principles-react-3"
description: "Principios Solid en React Parte 3 - Principio de Sustitución de Liskov."
hero: "/images/solid2.webp"
tags: ["javascript"]
layout: "../../layouts/BlogPostLayout.astro"
draft: false
---

## Principio de Sustitución de Liskova (LSP)

Demasiado simplificado, LSP se puede definir como un tipo de relación entre objetos donde "los objetos de subtipo deben ser sustituibles por objetos de supertipo". Este principio se basa en gran medida en la herencia de clases para definir las relaciones de supertipos y subtipos, pero no es muy aplicable en React ya que casi nunca tratamos con clases, y mucho menos con la herencia de clases. Si bien alejarse de la herencia de clases inevitablemente convertiría este principio en algo completamente diferente, escribir el código de React usando la herencia sería crear deliberadamente un código incorrecto (lo que el equipo de React desaconseja encarecidamente ), por lo que, en cambio, vamos a omitir este principio.
