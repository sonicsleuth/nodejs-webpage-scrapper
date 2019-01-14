# nodejs-webpage-scrapper
How to scrape a web page using Node.js and Puppeteer then emailing the results using Nodemailer.

## Prerequisites
* Install **Node.js** [link to Node](https://nodejs.org/en/)
* Install **Puppeteer** [link to Puppeteer](https://github.com/GoogleChrome/puppeteer)
* Install **NodeMailer** [link to NodeMailer](https://nodemailer.com/about/)
* Familiarity with Javascript ES6.

## What will this script teach you?
* Targeting information on a web page that you would like to collect into a new dataset.
* Using the awesome Puppeteer package to evaluate the page content.
* Using the NodeMailer package which requires no other dependancies.

## Limitations of this script:
* We are using the popular job board Indeed.com for our data sample. 
* We are only collecting data from the first page of results.

## Adoptable used for this script:
* Stock Market Quotes
* Weather Reports
* Amazon.com Price Comparisons
* Ebay Auction Status

## Example of the results delivered to your email inbox:
```text
Job Post Results for: https://www.indeed.com/jobs?q=web%20developer&l=Rhode%20Island&sort=date

Title: Fullstack developer
Company: Some Super Company
Location: Woonsocket, RI
Link: https://www.indeed.com/rc/clk?jk=00000001

Title: Senior Web Developer
Company: New Startup Company
Location: North Kingstown, RI
Link: https://www.indeed.com/rc/clk?jk=00000001
```
