const staticCacheName='site-static-v1';
const dynamicCache='site-dynamic';
const assets=[
  '/',
  '/index.html',
  '/js/app.js',
  '/js/ui.js',
  '/js/materialize.min.js',
  '/css/styles.css',
  '/css/materialize.min.css',
  '/img/dish.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v47/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2'
]
self.addEventListener('install',(e)=>{
    console.log("Service worker successfully installed!!!");//
    // we can do here the caching work i.e those available for offline mode
    e.waitUntil(
        caches.open(staticCacheName).then(cache=>{
            console.log('caching ...........');
            cache.addAll(assets);
        })
    );
})

self.addEventListener('activate',(e)=>{
    // console.log('Service Worker successfully Activated!!!!');
    e.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(
                keys.filter(key=>key!== staticCacheName)
                .map(key=> caches.delete(key))
            )
        })
    )
})

self.addEventListener('fetch',(e)=>{
    // console.log('fetch',e);
    e.respondWith(
        caches.match(e.request).then(res=>{
            return res || fetch(e.request).then(fetchRes=>{
                return caches.open(dynamicCache).then(cache=>{
                    cache.put(e.request.url,fetchRes.clone());
                    return fetchRes;
                })
            })
        })
    )
})