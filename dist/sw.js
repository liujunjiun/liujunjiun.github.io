console.log('Script loaded!')
var cacheStorageKey = 'pwa-10';

var cacheList = [
	'/',
	'index-sw.html',
        "img/5605252d45cef4b8c70cb2ec06a.jpg",
	"img/560502b845ce651258bd538505a.png",
	"img/560502fc45cef4b8c70ca79f04a.png",
	"img/5605086045cef4b8c70ca98f06a.png",
	"img/5605089545ce651258bd55b904a.png",
	"img/560508c345cef4b8c70ca9ae06a.png",
	"img/5608aca945cef4b8c70cfa6f06a.png",
	"img/560516eb45ce651258bd5aba04a.jpg",
	"img/5605174045cef4b8c70caf1706a.png",
	"img/560517ff45ce651258bd5b1c06a.png",
	"img/5605187745ce651258bd5b4506a.png",
	"img/5605179345ce651258bd5af604a.png",
	"img/560517d645cef4b8c70caf4506a.png",
	"img/5605193845cef4b8c70cafae05a.jpg",
	"img/5605198045ce651258bd5b8e04a.png",
	"img/560519e745cef4b8c70cafd005a.png",
	"img/56051a5645ce651258bd5bb906a.png",
	"img/56051aa445cef4b8c70cb00906a.jpg",
	"img/56051b0e45ce651258bd5c0f04a.png",
	"img/56051b2e45cef4b8c70cb03205a.png",
	"img/56051cf045ce651258bd5c7f04a.png",
	"img/56051d7245cef4b8c70cb10c06a.png",
	"img/56051dc945ce651258bd5cb404a.png",
	"img/56051de745cef4b8c70cb13604a.png",
	"img/56051e1045ce651258bd5cc304a.png",
	"img/56051e2d45cef4b8c70cb14204a.png",
	"img/5605202245ce651258bd5d3f04a.png",
	"img/5605203645ce651258bd5d4506a.png",
	"img/560520cc45cef4b8c70cb20204a.png",
	"img/5605214245ce651258bd5d7504a.png",
	"img/5605216b45cef4b8c70cb22904a.png",
	"img/5608ad7145cef4b8c70cfabc04a.jpg",
	"img/56050c6645cef4b8c70cab3f04a.png",
	"img/56050ecd45ce651258bd57fb04a.png",
	"img/56050d1d45ce651258bd577306a.png",
	"img/56050e2145cef4b8c70cac0c04a.png",
	"img/56050e5845cef4b8c70cac2c05a.png",
	"img/56050efa45cef4b8c70cac4c05a.png",
	"img/5608aef645ce651258bdac2e04a.png",
	"img/56050f6d45cef4b8c70cac6505a.jpg",
	"img/56050fa645cef4b8c70cac7305a.png",
	"img/56050feb45ce651258bd586005a.png",
	"img/5605127145cef4b8c70cad6e04a.png",
	"img/560510d145ce651258bd589806a.png",
	"img/5605115345ce651258bd58c806a.png",
	"img/560511bc45cef4b8c70cad1f04a.png",
	"img/560511dc45ce651258bd58e405a.png",
	"img/5605135b45ce651258bd599206a.jpg",
	"img/560513ca45cef4b8c70cadde04a.png",
	"img/560514b545cef4b8c70cae5a04a.png",
	"img/560514c845ce651258bd5a3804a.png",
	"img/5608b69245ce651258bdaf4f05a.png",
	"img/5605224c45ce651258bd5da206a.jpg",
	"img/560522a345cef4b8c70cb25204a.png",
	"img/5605231245ce651258bd5ddb06a.png",
	"img/5605233b45cef4b8c70cb27704a.png",
	"img/560523a445cef4b8c70cb28c04a.png",
	"js/jweixin-1.0.0.js",
	"js/nineDay.min.js",
	"css/nineDay.min.css",
]

self.addEventListener('install', function(e) {
  console.log('Cache event!')
  e.waitUntil(
    caches.open(cacheStorageKey).then(function(cache) {
      console.log('Adding to Cache:', cacheList)
      return cache.addAll(cacheList)
    }).then(function() {
      console.log('Skip waiting!')
      return self.skipWaiting()
    })
  )
})

self.addEventListener('activate', function(e) {
  console.log('Activate event')
  e.waitUntil(
    Promise.all(
      caches.keys().then(cacheNames => {
        return cacheNames.map(name => {
          if (name !== cacheStorageKey) {
            return caches.delete(name)
          }
        })
      })
    ).then(() => {
      console.log('Clients claims.')
      return self.clients.claim()
    })
  )
})

self.addEventListener('fetch', function(e) {
  // console.log('Fetch event:', e.request.url)
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response != null) {
        console.log('Using cache for:', e.request.url)
        return response
      }
      console.log('Fallback to fetch:', e.request.url)
      return fetch(e.request.url)
    })
  )
})
