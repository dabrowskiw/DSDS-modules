const {By,Key,Builder} = require("selenium-webdriver");
require("geckodriver");

async function nevillebot(){
    var user = "dolor.vitae@outlook.edu";
    var password ="pw";
    //To wait for browser to build and launch properly
    let driver = await new Builder().forBrowser('firefox').build();

    //To fetch from the browser with our code.
    await driver.get("http://localhost:3000");
         
    //To send a search query by passing the value in searchString.
    await driver.findElement(By.id("exampleInputEmail1")).sendKeys(user);
    await driver.findElement(By.id("exampleInputPassword1")).sendKeys(password);

    var submit = driver.findElement(By.id("submitbtn"));
	submit.click();

     //It is always a safe practice to quit the browser after execution
    //  await driver.quit();
}

nevillebot();