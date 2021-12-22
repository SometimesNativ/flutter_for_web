'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "f699f3266508117688d79b6c55e0ab39",
"index.html": "1f5415d5e059edd758edf85c33fcaf8a",
"/": "1f5415d5e059edd758edf85c33fcaf8a",
"main.dart.js": "3e9ed8178b2e6aae7ba32ca8dcc31d74",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "312307fca7c284594f9e746fda5abdf9",
"assets/AssetManifest.json": "7f6823dbe9cd687a3707e73efdb4ad64",
"assets/NOTICES": "054d2bb902d3aab9b4d769638895e610",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "4e6447691c9509f7acdbf8a931a85ca1",
"assets/assets/images/2.0x/img_current_ranking_bg.png": "f7c038577806727637bda1b71b6388a6",
"assets/assets/images/2.0x/img_current_ranking_top3_No2.png": "cbba812f4a26612fb2cbebf6c79bfbad",
"assets/assets/images/2.0x/img_current_ranking_top3_bg.png": "b094b7bcdec0ae9ae33ea788b234ecec",
"assets/assets/images/2.0x/img_current_ranking_top3_No3.png": "066076deea23623283e3973b0237bcdf",
"assets/assets/images/2.0x/img_current_ranking_top3_No1.png": "fef0174c4fae560dd23376269a33456d",
"assets/assets/images/2.0x/img_refresh_fail.png": "1ccc50607961e69aca3cb8147022e9ff",
"assets/assets/images/2.0x/scene_detail_icon.png": "14ad9db71758984a858e6c963177f810",
"assets/assets/images/2.0x/img_current_ranking_like.png": "272887ee9b4426ecfbdbec772e450ba5",
"assets/assets/images/2.0x/img_control_setting_white.png": "b66914775b2b3975cdbf50d1cda0bc3c",
"assets/assets/images/2.0x/img_current_ranking_navi_back.png": "a4a40ffd10f96e82267b8e675475e1b7",
"assets/assets/images/2.0x/img_back.png": "9bd38c1060386c49021b1ae77a2e6a3e",
"assets/assets/images/2.0x/img_current_ranking_unlike.png": "57f21f7a2b472bef89eadc16d013c78d",
"assets/assets/images/2.0x/img_refresh_success.png": "d1e790ba871167fa480df01d3db6f088",
"assets/assets/images/2.0x/img_clean_record_ranking_defaul_header.png": "18224c4b268fff4ec0119ee32fc6a559",
"assets/assets/images/3.0x/img_current_ranking_bg.png": "328aa78e217fbb3298855b7954090a34",
"assets/assets/images/3.0x/img_current_ranking_top3_No2.png": "93e47009c864262ab6a6cc778346cdd7",
"assets/assets/images/3.0x/img_current_ranking_top3_bg.png": "31fe266e9ce32e7ed745bda961c79a41",
"assets/assets/images/3.0x/img_current_ranking_top3_No3.png": "6afe194e171b9e0f54ec689df0bee6c4",
"assets/assets/images/3.0x/img_current_ranking_top3_No1.png": "cd0f5449ab4c810a7c157227a95ed4b1",
"assets/assets/images/3.0x/scene_detail_icon.png": "aa43ee9165b4e9be10cf28cc2290243b",
"assets/assets/images/3.0x/img_current_ranking_like.png": "b5c1d83674feea6f1367be05c0ff1342",
"assets/assets/images/3.0x/img_control_setting_white.png": "bf409058ec68f8e392b45f448b87a5ed",
"assets/assets/images/3.0x/img_current_ranking_navi_back.png": "2cf7a550960fe09f944278b1e97b3c90",
"assets/assets/images/3.0x/img_back.png": "a7ba20e92a30ce4081f91c1d9e202d23",
"assets/assets/images/3.0x/img_current_ranking_unlike.png": "0118e7e5e29fb57a7b21ce76a3f15836",
"assets/assets/images/3.0x/img_clean_record_ranking_defaul_header.png": "67b4a796153b6f2699794cc1d50a6396"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
