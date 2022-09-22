const puppeteer = require('puppeteer');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

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
};
getProducts();

(async () => {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});
  // const browser = await puppeteer.launch({args: ['--no-sandbox'], headless: false}); // for local testing with graphical browser
  const page = await browser.newPage();
  await page.goto("http://localhost:3000");

  await page.type('#inputEmail', user);
  await page.type('#inputPassword', password);
  await page.click('#submitbtn');

  await page.waitForNavigation();

  console.log("Logged In");

  // open each product url in endless loop
  while (true){
    for (let i = 0; i < resultArray.length; i++) {
      await page.goto(resultArray[i]);    
      await new Promise(r => setTimeout(r, 4000));
    }
  }
})();
