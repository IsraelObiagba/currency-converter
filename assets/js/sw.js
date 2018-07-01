const log = console.log.bind(console); //bind our console to a variable
const version = "0.4.1";
const cacheName = "currency-converter";
const cache = `${cacheName}-${version}`;
const filesToCache = [
  "https://israelobiagba.github.io/currency-converter/assets/js/script.js",
  "index.html",
  "/", //Note that this is different from below
  "/?app=true",
  "https://free.currencyconverterapi.com/api/v5/currencies",
  "https://unpkg.com/idb@2.0.4/lib/idb.js",
  "https://fonts.googleapis.com/css?family=Alegreya+Sans:300,400,700,900"
];

//Add event listener for install
self.addEventListener("install", event => {
  log("[ServiceWorker] Installing......");
  event.waitUntil(
    caches
      .open(cache) //open this cache from caches and it will return a Promise
      .then(cache => {
        //catch that promise
        log("[ServiceWorker] Caching files");
        cache.addAll(filesToCache); //add all required files to cache it also returns a Promise
      })
  );
});

//Add event listener for fetch
self.addEventListener("fetch", event => {
  //note that event.request.url gives URL of the request so you could also intercept the request and send a response based on your URL
  //e.g. you make want to send gif if anything in jpeg form is requested.
  event.respondWith(
    //it either takes a Response object as a parameter or a promise that resolves to a Response object
    caches
      .match(event.request) //If there is a match in the cache of this request object
      .then(response => {
        if (response) {
          log(`Fulfilling ${event.request.url} from cache.`);
          //returning response object
          return response;
        } else {
          log(`${event.request.url} not found in cache fetching from network.`);
          //return promise that resolves to Response object
          return fetch(event.request);
        }
      })
  );
});

self.addEventListener("activate", event => {
  log("[ServiceWorker] Activate");
  event.waitUntil(
    caches
      .keys() //it will return all the keys in the cache as an array
      .then(keyList => {
        //run everything in parallel using Promise.all()
        Promise.all(
          keyList.map(key => {
            if (key !== cache) {
              // todo: delete stale cache
            }
          })
        );
      })
  );
});
