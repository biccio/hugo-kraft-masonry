---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
date: {{ .Date }}
lastmod: {{ .Date }}
draft: true
description: ""
categories: []
tags: []
image: ""

# Dati strutturati JSON-LD (opzionale): togli i commenti e compila i campi
# che ti servono. Vengono esposti come <script type="application/ld+json">
# nelle pagine pubbliche (vedi layouts/partials/schema.html). I campi non
# indicati hanno un fallback ai valori del sito (autore, titolo, lingua).
# schema:
#   type: "BlogPosting"            # @type JSON-LD (default: BlogPosting)
#   inLanguage: "it-IT"            # default: lingua del sito
#   articleSection: ""             # default: prima categoria
#   author:
#     name: ""
#     url: ""
#   publisher:
#     name: ""
#     url: ""
#   keywords: []                   # default: i tag del post
#   about:                         # entità di cui parla il post
#     - type: "Thing"
#       name: ""
#       sameAs: ""
#   mentions:                      # entità solo citate
#     - type: "Person"
#       name: ""
#       sameAs: ""
---

Scrivi qui il primo paragrafo: verrà usato come abstract nella card della
homepage (oppure inserisci il segnalibro `<!--more-->` per indicare dove
deve terminare l'anteprima).

<!--more-->

Continua qui il resto dell'articolo.
