const staticCacheName='site-static';
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
    console.log("Service worker successfully installed!!!");
    // we can do here the caching work i.e those available for offline mode
    e.waitUntill(
        caches.open(staticCacheName).then(cache=>{
            console.log('caching ...........');
            cache.addAll(assets);
        })
    );
})

self.addEventListener('activate',(act)=>{
    console.log('Service Worker successfully Activated!!!!');
})

self.addEventListener('fetch',(e)=>{
    // console.log('fetch',e);
})