# Mongo Scraper

Week Nine Homework Part 1: [All the News That's Fit to Scrape](http://ucb.bootcampcontent.com/UCB-Coding-Bootcamp/09-11-2017-UCB-Class-Repository-FSF-FT/blob/master/09-week/homework/part-1/homework_instructions.md).

## Installation

1. Clone repo and install NPM packages:

    ```
    git clone https://github.com/dbmarshall/mongoScraper.git
    cd mongoScraper/
    npm install 
    ```

3. Create `mongoScraper_db` database in Mongo: 

    ```
    mongo
    use mongoScraper_db
    ```

4. Start server to create tables from Mongoose models:

    ```
    node server.js
    ```

## Available Node Commands and URLs

**Local:** 

* Run `node server.js` 
* Then load [http://localhost:5050/](http://localhost:5050/)

**Heroku Deployment:** 

* Load [https://mongoScraper-davidm.herokuapp.com/](https://mongoScraper-davidm.herokuapp.com/)

## Misc Notes

* Github repo master branch pushes autodeploy to Heroku (sweet).

## Author

* **David Morse** ([dbmarshall.github.io](https://dbmarshall.github.io))

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

