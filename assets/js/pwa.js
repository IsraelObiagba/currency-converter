if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('sw.js')
    .then(() => {
      console.log('Congratulations!!Service Worker Registered')
    })
    .catch(function (err) {
      console.log(`Aagh! Some kind of Error :- ${err}`)
    })
} else {
  // still not supported
  console.log("Sorry, your browser doesn't support it!")
}
