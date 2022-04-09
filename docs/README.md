## Auto Wait

https://playwright.dev/docs/actionability

## Debugging

ChroPath plugin to select path for elements
SelectorsHub plugin to select path for elements (requires registration)

Playwright Inspector - Explore

## Methods

### browser

- newContext (to get a fresh browser instance with clean state)

### page

- use page api directly without using newContext if you dont want to initialize browser before running tests

### Enter text

- fill
- type

To type charecter by charector add a delay between each charecter:

```js
type("some text", { delay: 100 });
```

### Get all content

Following doesnt auto wait and by default will return the state without performing any wait

- locator('selector-here').getAllContent()

## page

### waitForLoadState

Network calls

- waitForLoadState("domcontentloaded" | "networkidle" | "load")

### waitForNavigation

Wait for navigation within the same tab

```js
await Promise.all[(signIn.click(), page.waitForNavigation())];
```

### waitForEvent

Wait for navigation to a new tab

```js
const [page1, page2, page3, ...] = await Promise.all[(documentLink.click(), page.waitForEvent("page"))];
```

Note: Instead of using `page`, you need to create new context using `browser.newContext()`. This allows to add assertions on page and new page both.

### pause

To pause the execution of tests, execute the following:

```js
await page.pause();
```

### frameLocator

To get handle of `iframe` on the page

```js
const locator = page.frameLocator("#my-frame").locator("selector-here");
await locator.click();
```

### addInitScript

Insert a script or code within script code

```js
// In your playwright script, assuming the preload.js file is in same directory.
await page.addInitScript({
  path: "preload.js",
});
```

```js
const token = "some-big-token";
await page.addInitScript((value) => {
  window.localStorage.set("token", value);
}, token);
```

### route

Intercepting the response

https://playwright.dev/docs/api/class-page#page-route

- route.request()

To intercept a request

- route.continue()

To intercept a response

- route.fulfill()

Block css and image files

```js
page.route("**/*.css", (route) => route.abort());
page.route("**/*.{jpg,webp,png}", (route) => route.abort());
```

To log request and reponse of urls

```js
page.on("request", (request) => console.log(request.url()));
page.on("response", (response) =>
  console.log(response.url(), response.status())
);
```

### screenshot

```js
page.screenshot({ path: "screenshot.png" });
page.locator("selector-here").screenshot({ path: "screenshot.png" });
```

### Visual testing

```js
await page.goto("url-here");
expect(await page.screenshot()).toMatchSnapshot("screenshot.png");
```

## locator

### click

https://playwright.dev/docs/api/class-locator#locator-click

### hover

https://playwright.dev/docs/api/class-locator#locator-hover

### toHaveAttribute

```js
await page.locator("selector-here").toHaveAttribute("name", "value");
await page.locator("selector-here").toHaveAttribute("class", "app-container");
```

### waitFor

Wait for item to render when using method that doesnt support auto wait say `isVisible` method.

```js
const orderSent = page.locator("#order-sent");
await orderSent.waitFor();
```

### hasText

https://playwright.dev/docs/api/class-locator#locator-filter

## alert popup

https://playwright.dev/docs/dialogs#alert-confirm-prompt-dialogs

```js
page.on("dialog", (dialog) => dialog.accept());
await page.locator("button").click();
```

## iframes

## request

https://playwright.dev/docs/test-api-testing

## context

Use context to prepare the state of browser using various different storage properties captured from browser post login.

https://playwright.dev/docs/api/class-browsercontext

https://playwright.dev/docs/api/class-browsercontext#browser-context-storage-state

## Assertions

https://playwright.dev/docs/test-assertions

- expect

## Test Generator

https://playwright.dev/docs/codegen-intro

```sh
npx playwright codegen google.com
```

## Reporting

- reporter.html
- use.screenshot = 'on' | 'off' | 'only-on-failure'
- use.trace = 'on' | 'off' | 'retain-on-failure'

### trace zip

Upload the trace zip to `trace.playwright.dev` to view all the screenshots and details of the execution.

## Creating fixtures

https://playwright.dev/docs/test-fixtures#creating-a-fixture

## Configuration

https://playwright.dev/docs/api/class-testoptions#test-options-ignore-https-errors

- config.pageOptions.use.ignoreHttpsError

### Running tests within same file in parallel

Put the following in the file (at the top)

- test.describe.configure({mode:'parallel'})
