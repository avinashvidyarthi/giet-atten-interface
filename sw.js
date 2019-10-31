self.addEventListener('install',function(){
    console.log("[Service-worker] Installed");
});

self.addEventListener('activate',function(){
    console.log("[Service-worker] Activated");
});

self.addEventListener('fetch',function(){
    console.log("[Service-worker] Fetched");
});