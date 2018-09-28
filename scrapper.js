const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');


(async () => {

    /**
     * Use Puppeteer to get the contens of the web page.
     */
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url = 'https://www.indeed.com/jobs?q=web%20developer&l=Rhode%20Island&sort=date';
    await page.goto(url);

    /**
     * Extract the job post Title, Company Name, Job Location, Job Post URL from the web page.
     */
    const jobs = await page.evaluate(() =>
        Array.from(document.querySelectorAll('div.clickcard'))
        .map((clickcard) => ({
            title:      clickcard.querySelector('a[data-tn-element=jobTitle]').innerText.trim(),
            company:    clickcard.querySelector('span.company').innerText.trim(),
            location:   clickcard.querySelector('div[data-rc-loc]').getAttribute('data-rc-loc').trim(),
            link:       'https://www.indeed.com' + clickcard.querySelector('a[data-tn-element=jobTitle]').getAttribute('href').trim()
        }))
    )
    await browser.close();


    /**
     * Use Nodemailer to send the results to some email recipient.
     *
     * About using Gmail - Go to https://www.google.com/settings/security/lesssecureapps 
     * and change the setting for "Access for less secure apps" to ON which will prevent 
     * Gmail from blocking Nodemailer from connecting to Gmail.
     */

    // Prettify the job records for use in the body of the email.
    var jobs_text = '';
    for(let job of jobs) {
        jobs_text += 'Title: ' + job.title + '\r\n'
        + 'Company: ' + job.company + '\r\n'
        + 'Location: ' + job.location + '\r\n'
        + 'Link: ' + job.link + '\r\n\r\n';
    }
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-gmail-password#'
        }
      });
      
    const mailOptions = {
        from: 'you@gmail.com',
        to: 'someone@gmail.com',
        subject: 'Job Post Results',
        text: 'Job Post Results for: ' + url + '\r\n\r\n' + jobs_text
      };
      
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

})();

/*
Google Chrome DevTool Console Notes:

Get Human Readable Text from link
Array.from(document.querySelectorAll('div.clickcard a[data-tn-element=jobTitle]')).map((job) => job.textContent.trim())

Get TITLE value from link
Array.from(document.querySelectorAll('div.clickcard a[data-tn-element=jobTitle]')).map((job) => job.getAttribute('title').trim())

Get HREF value from link
Array.from(document.querySelectorAll('div.clickcard a[data-tn-element=jobTitle]')).map((job) => job.getAttribute('href').trim())

Get Company Name below each link
Array.from(document.querySelectorAll('div.clickcard span.company')).map((job) => job.textContent.trim())

Get Location below each Company Name
Array.from(document.querySelectorAll('div.clickcard div[data-rc-loc]')).map((job) => job.getAttribute('data-rc-loc').trim())
*/
