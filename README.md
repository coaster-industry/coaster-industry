# Coaster Industry Visualizing
>A project to gather the knowledge about the roller coaster & theme park industry.

![Alt text](/app/static/img/coaster-industry-logo-400px.png)

## Presentation
The initial purpose of the Coaster Indutry project is to provide a global map referencing the coaster industry. This will include :
* theme parks and amusement parks,
* roller coaster and attraction manufactors,
* suppliers,
* designing agencies,
* layout engineering offices,
* attraction assemblers,
* etc.

This interactive map will allow visitors to dig deep into the worldwide theme park industry. Links between all those companies involved will show its actual complexity. Also, it will help coaster enthusiasts to improve their knowledge, which is the reason to developp this application.


## Technical informations
The project is basically a website that will use the Mapbox library to create the map. The framework Flask (Python) is used to build the website.


## Setup & run locally
First, you need to clone this repository at master branch or download the sources.
Second, you have two ways to launch the web server :
1. Using Python :
    * it is recommended to work in a Python virtual env, you can use the ```pew``` command to do so.
    * install the required Python libraries 
        ```
        pip install -r requirements
        ```
    * run the web server 
        ```
        python run.py
        ```
    * the application is accessible by default through the ```127.0.0.1:8080``` address
2. Using Docker :
    * Build the docker image
        ```
        docker build -t coasters .
        ```
    * Run the image 
        ```
         docker run --publish 8080:8080 -it coasters
    * The site is accessible through the ```0.0.0.0:8080``` address by default.


## Get involved !
The project will need any help to grow ! Especially for referencing the data about parks & constructors. Check out the Wiki to know how you can help the project to grow.