# infleux-nextjs-tracker-web

## What is this?

This is an experimental project to see how infleux-headcrab works on NextJS so we can help some advertisers to install it without too much problems.

You may run this project using

```bash
# install dependencies
npm install

# start as dev
npm run dev
```

## How should I insert the tracker-web.js in my NextJS page?

Firstly, you may check the `pages/index.js` file. You have to import the tracker-web like this in your pages:

```js
<Script
  src="https://cdn.infleux.io/infleux-tracker/scripts/tracker-web.js"
  onLoad={() => {
    window.InfleuxTracker && window.InfleuxTracker.init("the-uuid-we-sent-you");
  }}
/>
```

To see more information, check the [next/scripts](https://nextjs.org/docs/basic-features/script) page. Please be aware that this project is using NextJS 13.

This simply loads our InfleuxTracker to your client side when the user access the page. See [http://localhost:2999](http://localhost:2999) and the information about the object should be shown like this:

```
InfleuxTracker: {"key":"the-uuid-we-sent-you","urlChangesInterval":36,"lastTrackedUrl":null}
```

This shows that the script has been initialized correctly.

The second step is to call the

```js
InfleuxTracker.reportPageView("the-url-we-sent-you");
```

in a specific context (a button click, a page view - in a useEffect, for instance). The conversion event is represented by the "Report page view manually" button at [http://localhost:2999](http://localhost:2999). You may want to see its implementation to see how it works.

When you open the home page without coming from a `link.infleux.co`, you should see this message on the page: `iflx_sd: parameter is not on the url.`. This means that something is wrong and our Pixel could not find the iflx_sd parameter in the url (which we send when testing a specific campaign). There are two reasons for this: or the iflx_sd is not persisting on the local storage (client side) or you opened the page without the `iflx_sd` parameter.

```

```
