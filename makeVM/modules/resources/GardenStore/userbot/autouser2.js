const puppeteer = require('puppeteer');

var user = "dolor.vitae@outlook.edu";
var password = "pw";

(async () => {
  const browser = await puppeteer.launch();
  //const browser = await puppeteer.launch();
  const page = await browser.newPage();
  //await page.goto('https://www.google.com');


  await page.goto("http://localhost:3000");

  //To send a search query by passing the value in searchString.
  await page.type('#exampleInputEmail1', user);
  await page.type('#exampleInputPassword1', password);
  await page.click('#submitbtn');
  
  //const form = await page.$('submitbtn');
  //await form.evaluate(form => form.click());

  await page.waitForNavigation();

  console.log("Logged In");
  await page.screenshot({ path: 'example.png' });
  await browser.close();
})();
