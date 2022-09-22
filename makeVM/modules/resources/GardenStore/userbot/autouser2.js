const puppeteer = require('puppeteer');

var user = "dolor.vitae@outlook.edu";
var password = "pw";

var productsArray = [];
var resultArray = [];

async function getProducts() {
  fetch(`http://localhost:8000/products`, {
    method: "GET",
    credentials: "include",
  }).then((res) => res.json())
    .then(
      (result) => {
        productsArray = result
        productsArray.map((product) => resultArray.push("http://localhost:3000/detailPage/" + product.product_id))
      }
    );
}
getProducts()

async function userbot() {
  const browser = await puppeteer.launch({args: ['--no-sandbox'], headless: false});
  // const browser = await puppeteer.launch();
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
  // await page.screenshot({ path: 'example.png' });

  while (true){
    for (let i = 0; i < resultArray.length; i++) {
      await page.goto(resultArray[i]);
      await new Promise(r => setTimeout(r, 4000));
    }
  }
  // await browser.close();
};
userbot();