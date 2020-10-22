# Astronomy Picture Of the Day Fetcher

This project is a training project to learn about **React** components. It uses a [NASA's public API](https://api.nasa.gov/) to fetch the data for today's *astronomy picture of the day* (**APOD**). With said data, it generates a Bootstrap card that contains the image, the author (only if it's declared in the request), the date and a brief description from a professional astronomer.

## Features
In order to learn about different aspects of React, I implemented a couple of features:
* Can display today's APOD
* Can generate a random date (from 2012-01-01 until current date) to fetch the APOD of said random date
* Has a button to view the image in HD version (provided by the API)
* Only reloads the component if the random date generated is different from the previous one (using React's component lifecycle)

## Example

![nasa apod example](https://user-images.githubusercontent.com/22601021/96893890-188b8480-1483-11eb-80d6-86d5d6e6c627.PNG)

*Example of the generated card with random date 2015-11-04*
