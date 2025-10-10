---
title: "Spider Map"
date: 2020-06-08T08:06:25+06:00
description: Spider Map
menu:
  sidebar:
    name: Spider Map
    identifier: spider-map
    parent: dataviz
    weight: 21
tags: ["geospatial", "dataviz"]
categories: ["dataviz"]
hero: "/images/posts/spider_hero.png"
---

Creating a spidermap to display the five elements closest to a point on the map. 






{{< spider id="spider" lat="48.8566" lng="2.3522" zoom="13" height="800px" >}}

# Background

Initially it was just a fun idea I have seen on linkedin for checking metro stations or shared bike stations around the user. 

But I thought, why don't I try to look for available AEDs ? in case of a cardiac arrest. 

The data points are not real but randomly generated to illustrate the example in Paris.

Some advanced developments I saw online include not the flying distance but even the walking distance !


# Development

Rather easy: a js fetches a JSON file, and every X ms loop through the data checking the distance with the current positioning. The top five lower points are plot.