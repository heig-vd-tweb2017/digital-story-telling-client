# Project - Digital Story Telling
This project is conducted for the course "TWEB-2017", at HEIG-VD, Switzerland.

* Teacher: Olivier Liechti.
* Authors: Ludovic Delafontaine & Michela Zucca.

## What is this
This project proposes to redact an article and add some interactivity in it.
	
* We have chosen to speak about meat consumption, its problems and some solutions.
* We added some interactive parts to display some information that the user can play with.
* We asked Ludovic's sister, Magali, if she wanted to illustrate the website. She kindly accepted and did an amazing job !
	
During the redaction of the article, we didn't want to take side or blame the user by its meat's consumption habits. This is why we tried to give facts, numbers and statistics as well as some solutions at the end of the article so no one feels aggressed by reading the article.
	
## Why is this
We wanted to redact this article to encourage people to think about their meat's consumption habits and try to improve their way of eating so they would preserve the earth, improve animals' conditions and help to decrease hunger in the world.

## How is this
For this project, we used several librairies and technologies.

### Client side
* [Freelancer](http://startbootstrap.com/template-overviews/freelancer/) for the Bootstrap template.
* [Leaflet](http://leafletjs.com/) to display the world map with meat's consumption.
* [Mapbox](https://www.mapbox.com/), combined with Leaflet to display nice tiles on the map.
* [Our own data merger](https://github.com/heig-vd-tweb2017/digital-story-telling-data-merger) to populate the map with our custom data.
* [Data-Driven Documents (D3)](https://d3js.org/) to create the interactive images with SVG elements.
* [MathJax](https://www.mathjax.org) to display equations properly.
* [SVGOMG](https://jakearchibald.github.io/svgomg/) to optimize our SVGs so they are normalized and way more smaller (+90% smaller !).

### Data merger side
* [Node.js](https://nodejs.org/) for the execution engine.
* [PapaParse](http://papaparse.com/) to parse the CSV datasets.

### On both sides
* [ESLint](https://eslint.org/) for quality code control.

## Live preview
You can test the entire application [here](https://heig-vd-tweb2017.github.io/digital-story-telling-client/). Feel free to test it !

## Client's aspects
The client side is the interface with the user.

It's a static HTML page with CSS, JavaScript and other several JavaScript's librairies.

It use multiple static datas you can find in `src/data`. `countries.geo.json` is created using the Data merger (see below for more).

All illustrations, except the ones used for the world map, are property of Magali Delafontaine. Do not use them without her permission.

## Data merger's aspects
For data merger's aspects, we encourage you to visit the associated repository [here](https://github.com/heig-vd-tweb2017/digital-story-telling-data-merger).
