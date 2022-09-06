const { By, Key, Builder, promise, until } = require("selenium-webdriver");
const firefox = require('selenium-webdriver/firefox');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
require("geckodriver");

promise.USE_PROMISE_MANAGER = false;

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

async function nevillebot() {
  var user = "dolor.vitae@outlook.edu";
  var password = "pw";

  const options = new firefox.Options();
  options.headless(); //once newer webdriver ships
  //To wait for browser to build and launch properly
  let driver = await new Builder()
    .forBrowser('firefox')
    .setFirefoxOptions(options)
    .build();

  //To fetch from the browser with our code.
  await driver.get("http://localhost:3000");

  //To send a search query by passing the value in searchString.
  await driver.findElement(By.id("exampleInputEmail1")).sendKeys(user);
  await driver.findElement(By.id("exampleInputPassword1")).sendKeys(password);

  var submit = driver.findElement(By.id("submitbtn"));
  submit.click();

  console.log("Logged In");

  while (true) {
    for (let i = 0; i < resultArray.length; i++) {
      await driver.get(resultArray[i]);
      await new Promise(r => setTimeout(r, 4000));
    }
  }
}

nevillebot();