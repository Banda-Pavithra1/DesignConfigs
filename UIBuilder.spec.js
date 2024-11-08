
import {test,expect} from '@playwright/test';
const testData=JSON.parse(JSON.stringify(require('./testData.json')));

//const rowsPerPage_create='1-3 of 3'
//const rowsPerPage_delete='0-0 of 0'


test.beforeEach(async({page})=>
    {
        
        await page.goto('https://cms.hudinielevate-stage.io/login', {timeout: 30000});
        await page.locator('id=email').fill(testData.loginCredentials.username);
        await page.locator('id=password').fill(testData.loginCredentials.password);
        await page.getByText('LOGIN').click();
        for(let i=1;i<=3;i++)
        {
            await page.locator("//img[@alt='btn']").click();
        }
       
    });

test('Scenario 1:Verify that the user can create page',async({page})=>
{
    await page.click("(//div[@title='Design Configs']//span)[2]");
    await page.click("//span[normalize-space(text())='Add Page']");
    await page.click("//textarea[@step='1']");
    await page.fill("//textarea[@step='1']",testData.createPage.pageName);
    await page.click("button[type='submit']");

    await page.locator("//input[@type='text']").fill(testData.createPage.pageName)
    await page.waitForTimeout(1000);

    const createPageResult=await page.locator("//div[@class='rnc__notification-message']").textContent();
    expect(createPageResult).toContain(testData.createPage.createPageConfirmMsg);
    console.log("page result",createPageResult)
    
})

test ('Scenario 2: Verify that user can add components to a page', async({page})=>
{
    // Increase timeout for this test to 60 seconds
    test.setTimeout(90000);

    // Click to open the 'Design Configs'
    await page.click("(//div[@title='Design Configs']//span)[2]");
    await page.waitForTimeout(2000);

    // Search for the page name
    await page.locator("(//label[text()='Search']/following::input)[1]").fill(testData.createPage.pageName);
    await page.waitForTimeout(1000);

    // Click on the search result from the table
    await page.locator("//table[contains(@class,'MuiTable-root list-table')]").click();
    await page.waitForTimeout(2000);

    // Click on the library icon
    await page.locator('.library-toggle > .MuiButtonBase-root'). click();
    await page.waitForTimeout(3000);

    // access carousels
    await page.getByRole('button', { name: 'Carousels' }). click();
  
    //Add 2A Potrait Carousel
  page.locator("//div[text()='2A - Portrait Carousel']");
  const sourceElement = page.locator('//div[text()="2A - Portrait Carousel"]');
  const targetElement = page.locator('//div[text()="Drag & Drop component here"]');
  await sourceElement.dragTo(targetElement, { timeout: 60000 });

  // slide 1
  await page.locator("(//label[contains(.,'H2 Title *')]/following::input)[1]").fill(testData.AddComponents.H2Title);
  await page.locator("(//label[normalize-space(text())='H3 Title']/following::input)[1]").fill(testData.AddComponents.H3Title);
  await page.locator("input[type=file]").setInputFiles('./Images/download.png') // image upload
  await page.waitForTimeout(3000);
  await page.click("(//input[@type='radio'])[3]");                 // select active option under redirect link section
  await page.getByLabel('External', { exact: true }).click();      // select external option under redirect link options
  await page.locator('id=external_link_input'). fill(testData.AddComponents.ExternalLink)   //click and enter input in external link field
  await page.locator('id=redirect_page_select').click();          // selects redirect oage under view all section
  await page.locator("(//li[@role='option'])[1]").click(); // Clicks the first option in the list

  //Slide 2
  await page.locator("//span[text()='Slide 2']").click();
  await page.locator("(//label[normalize-space(text())='H3 Title']/following::input)[1]").fill(testData.AddComponents.H3Title2);
  await page.click("(//input[@type='radio'])[2]");
  await page.locator("(//input[contains(@class,'MuiInputBase-input MuiInput-input')])[3]").fill(testData.AddComponents.VideoURL);    //click and enter the video link url
  await page.waitForTimeout(3000);
  await page.click("(//input[@type='radio'])[3]");    // select flow option
  await page.getByLabel('Flow', { exact: true }).click();
  await page.locator('id=flow_select').click();
  await page.locator("(//li[@role='option'])[2]").click();
  await page.locator('id=redirect_page_select').click(); // to click on the select redirect page field under view all option
  await page.locator("(//li[@role='option'])[2]").click(); // Clicks the second option in the list
  
  //Slide 3
  await page.locator("//span[text()='Slide 3']").click();
  await page.waitForTimeout(1000);
  await page.locator("text='Remove'").click();
  await page.locator("text='Remove'").click();
  await page.waitForTimeout(2000);
  await page.click("//div[text()='2A - Portrait Carousel']/following-sibling::div"); //collapse component
  await page.waitForTimeout(2000);

// access image componnets
  await page.getByRole('button', { name: 'Image Components' }). click();

// add 15 large image component
page.locator("//div[text()='15 - Large Image']");
const sourceElement1 = page.locator("//div[text()='15 - Large Image']");
const workspaceElement = page.locator("//div[@class='page-builder-scroll scroll-styled']");
await sourceElement1.dragTo(workspaceElement, { timeout: 60000 });
await page.locator("input[type=file]").setInputFiles('./Images/images (1).jpg') //upload image file
await page.waitForTimeout(3000);
await page.click("(//input[@type='radio'])[3]");                 // select active option under redirect link section
await page.getByLabel('External', { exact: true }).click();      // select external option under redirect link options
await page.locator('id=external_link_input'). fill(testData.AddComponents.ExternalLink2); 

//collapse 15 large image component
await page.click("(//div[text()='15 - Large Image']/following-sibling::div)[1]");

//access button components
await page.getByRole('button', { name: 'Buttons' }). click();

//add 16- CTA button
page.locator("//div[text()='16 - CTA Button']");
const buttonSourceElement = page.locator("//div[text()='16 - CTA Button']");
const workspaceElement1 = page.locator("//div[@class='page-builder-scroll scroll-styled']");
await buttonSourceElement.dragTo(workspaceElement1, { timeout: 60000 });
await page.locator("id=cta_title_input").fill(testData.AddComponents.CTATitle);
await page.locator("id=page_select").click();
await page.locator("(//li[@role='option'])[1]").click();

//close library
await page.locator("//button[@aria-label='delete']").click();

// save page to draft
await page.locator("//span[normalize-space(text())='Save as Draft']").click();
await page.waitForTimeout(3000);

const AddComponentsResult=await page.locator("//div[@class='rnc__notification-message']").textContent();
expect(AddComponentsResult).toContain(testData.AddComponents.SavePageConfirmMsg);
console.log("Add components result",AddComponentsResult)

});

test ('Scenario 3: Verify that user can update details of components in a page', async({page})=>
{
test.setTimeout(90000);

// Click to open the 'Design Configs'
await page.click("(//div[@title='Design Configs']//span)[2]");
await page.waitForTimeout(2000);

// Search for the page name
await page.locator("(//label[text()='Search']/following::input)[1]").fill(testData.createPage.pageName);
await page.waitForTimeout(1000);

// Click on the search result from the table
await page.locator("//table[contains(@class,'MuiTable-root list-table')]").click();
await page.waitForTimeout(2000);
    

//expand 2A Potrait carousel

// Update details of 2A Potrait Carousel 
await page.locator("(//label[contains(.,'H2 Title *')]/following::input)[1]").fill(testData.UpdateComponentDetails.H2Title);

//Update details of 15 large image component
const componentName = '15 - Large Image';
//await page.locator("(//div[@class=' shadow d-flex mx-0 px-0 pt-4 custom-accordion'])[2]//div[normalize-space(text())='Remove Image']").click();
await page.locator("input[type=file]").nth(1).setInputFiles('./Images/images (2).jpg');
await page.waitForTimeout(3000);

//Update details of 16 button component
await page.locator("id=cta_title_input").fill(testData.UpdateComponentDetails.CTATitle);

//click on the Save as publish
await page.locator("//span[normalize-space(text())='Save & Publish']").click();
await page.waitForTimeout(3000);

const UpdatePageResult=await page.locator("//div[@class='rnc__notification-message']").textContent();
expect(UpdatePageResult).toContain(testData.UpdateComponentDetails.SaveAndPublishConfirmMsg);
console.log("Add components result",UpdatePageResult)
});
