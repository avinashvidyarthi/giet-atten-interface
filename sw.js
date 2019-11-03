self.addEventListener('install',function(event){
    console.log("[Service-worker] Installed");
    event.waitUntil(
        caches.open('static').then(function(cache){
            console.log("Precaching Files");
            return cache.addAll([
                '/manifest.json',
                '/index.html',
                '/src/img/web-logo.jpg',
                '/src/index.js',
                'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css',
                'https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js',
                '/src/sweetalert.min.js'
            ]);
            //return cache.addAll(["/index.html","/"]);
        })
    )
});

self.addEventListener('activate',function(){
    console.log("[Service-worker] Activated");
});

self.addEventListener('fetch',function(event){
    // console.log(event);
    event.respondWith(
        caches.match(event.request).then(function(res){
            if(res){
                return res;
            }
            else{
                return fetch(event.request);
            }
        })
    )
});