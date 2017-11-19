# Mongo Scraper

Week Nine Homework Part 1: [All the News That's Fit to Scrape](http://ucb.bootcampcontent.com/UCB-Coding-Bootcamp/09-11-2017-UCB-Class-Repository-FSF-FT/blob/master/09-week/homework/part-1/homework_instructions.md).

## Installation

1. Clone repo and install NPM packages:

    ```
    git clone https://github.com/dbmarshall/mongoScraper.git
    cd mongoScraper/
    npm install 
    ```

2. Start server (local environment only):

    ```
    node server.js
    ```

3. Load local or Heroku deployment (see below), then initiate scrape in browser to create Mongo database and collections from Mongoose models.

## Available Node Commands and URLs

**Local:** 

* Run `node server.js` 
* Then load [http://localhost:5050/](http://localhost:5050/)

* Clear database: `http://localhost:5050/delete` 

**Heroku Deployment:** 

* Load [https://mongoscraper-davidm.herokuapp.com/](https://mongoscraper-davidm.herokuapp.com/)

* Clear database: `https://mongoscraper-davidm.herokuapp.com/delete` 

## Misc Notes

* New scrapes do not populate database with duplicate articles, based on uniqueness of article titles. 
* Github repo master branch pushes autodeploy to Heroku (sweet).

## Author

* **David Morse** ([dbmarshall.github.io](https://dbmarshall.github.io))

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

