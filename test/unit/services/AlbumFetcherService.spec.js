describe('AlbumFetcherService', function() {

  var AlbumFetcherService;
  var httpBacked;
  var AlbumFactory;
  var apiJsonResponse = getApiJsonResponse();
  var scope;
  var searchTerm = 'flowers';
    beforeEach(module('introGame.albumFetcherService'));

  beforeEach(inject(function(_AlbumFetcherService_, _AlbumFactory_, $httpBackend,  $rootScope, $q) {
    httpBackend = $httpBackend;
    deferred = $q.defer();
    AlbumFactory = _AlbumFactory_;
    AlbumFetcherService = _AlbumFetcherService_;
    scope = $rootScope;
  }));

  describe('#getAlbums', function(){
    beforeEach(function(){
      httpBackend.expectGET('http//api.spotify.com/v1/search?q=' + searchTerm + '&type=album').respond(apiJsonResponse);
    });
    afterEach(function(){
      httpBackend.flush();
    });

    it('returns an array of albums', function(done) {
      scope.$apply();
      AlbumFetcherService.getAlbums().then(function(results){
        expect(results.length).toEqual(6);
        done();
      });

    });
  });

});

function getApiJsonResponse(){
 return  {
    "albums" : {
      "href" : "https://api.spotify.com/v1/search?query=flowers&offset=0&limit=20&type=album",
      "items" : [ {
        "album_type" : "album",
        "available_markets" : [ "CA", "US" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/3Dd64usOdiAsvK3Ub0baX0"
        },
        "href" : "https://api.spotify.com/v1/albums/3Dd64usOdiAsvK3Ub0baX0",
        "id" : "3Dd64usOdiAsvK3Ub0baX0",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/93319d6c39d51bf015927c2c684a1615ff5a51f2",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/e3a8e7ebeba6f8f78e999a2b197c1e4e12071d22",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/918f28a8cecd917b75f757f010ffe25eecc33953",
          "width" : 64
        } ],
          "name" : "Covered Up With Flowers",
          "type" : "album",
          "uri" : "spotify:album:3Dd64usOdiAsvK3Ub0baX0"
      }, {
        "album_type" : "album",
        "available_markets" : [ "CA", "MX", "US" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/0yCqicy5tGkPiB6gUZCRy4"
        },
        "href" : "https://api.spotify.com/v1/albums/0yCqicy5tGkPiB6gUZCRy4",
        "id" : "0yCqicy5tGkPiB6gUZCRy4",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/88f4f4cd565486e19e6eeb8b4d649be66403a03e",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/cdd92acbe343410e577b5df8735c22056852c4f6",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/7fb3c088894b4584c4fb298ec11322dd40d287cf",
          "width" : 64
        } ],
          "name" : "The Desired Effect",
          "type" : "album",
          "uri" : "spotify:album:0yCqicy5tGkPiB6gUZCRy4"
      }, {
        "album_type" : "compilation",
        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/7eU7KHUKpTd0c1PdOnMlVp"
        },
        "href" : "https://api.spotify.com/v1/albums/7eU7KHUKpTd0c1PdOnMlVp",
        "id" : "7eU7KHUKpTd0c1PdOnMlVp",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/11d2a75047db8bc08a922cd572a49701ee6e4ad7",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/e39cf441def52807191005330428af4efbf47b52",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/c057369f2b6144f8514339c8bdae12193cd313af",
          "width" : 64
        } ],
          "name" : "Chill and House Flowers",
          "type" : "album",
          "uri" : "spotify:album:7eU7KHUKpTd0c1PdOnMlVp"
      }, {
        "album_type" : "album",
        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/2P5mq3TtdMfFPIftgpXKwO"
        },
        "href" : "https://api.spotify.com/v1/albums/2P5mq3TtdMfFPIftgpXKwO",
        "id" : "2P5mq3TtdMfFPIftgpXKwO",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/840c079b827e637957aa38fcb6da14d6ecc08fdc",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/af04cbdf140bc2f5d777992dc4304d5280ff0a25",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/e67c890a605bd7b3530f895b3889b9b63c84cd38",
          "width" : 64
        } ],
          "name" : "Give Me My Flowers While I Can Still Smell Them",
          "type" : "album",
          "uri" : "spotify:album:2P5mq3TtdMfFPIftgpXKwO"
      }, {
        "album_type" : "album",
        "available_markets" : [ "CA", "US" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/0z2AF60sMpBcIrWh797cBi"
        },
        "href" : "https://api.spotify.com/v1/albums/0z2AF60sMpBcIrWh797cBi",
        "id" : "0z2AF60sMpBcIrWh797cBi",
        "images" : [ {
          "height" : 574,
          "url" : "https://i.scdn.co/image/ee9ad45250c55f88d4cbebcb1f2d46f5553dcebf",
          "width" : 640
        }, {
          "height" : 269,
          "url" : "https://i.scdn.co/image/2f32cd2448f9d6048eb561bc8a5d6fb37f4bb9e8",
          "width" : 300
        }, {
          "height" : 57,
          "url" : "https://i.scdn.co/image/340125e105f227c48b12946ce2a2016cf723b573",
          "width" : 64
        } ],
          "name" : "Flowers (Remastered)",
          "type" : "album",
          "uri" : "spotify:album:0z2AF60sMpBcIrWh797cBi"
      }, {
        "album_type" : "album",
        "available_markets" : [ "CA", "US" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/4KPcNR8nJkhzG4YVhd9R3j"
        },
        "href" : "https://api.spotify.com/v1/albums/4KPcNR8nJkhzG4YVhd9R3j",
        "id" : "4KPcNR8nJkhzG4YVhd9R3j",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/58fffc91a118529b1dea44ccb16360473e02c8c5",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/95ddf5c1c62250d83514accc12f1ed01e107275b",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/0cb52d56c24ca357711e5d1c440a53a6c9ae78ba",
          "width" : 64
        } ],
          "name" : "Flamingo (Deluxe Edition)",
          "type" : "album",
          "uri" : "spotify:album:4KPcNR8nJkhzG4YVhd9R3j"
      }, {
        "album_type" : "album",
        "available_markets" : [ "CA", "MX", "US" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/7zKxFkMyehmw9u3MhLpMPK"
        },
        "href" : "https://api.spotify.com/v1/albums/7zKxFkMyehmw9u3MhLpMPK",
        "id" : "7zKxFkMyehmw9u3MhLpMPK",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/a0bf31933549b2278742b76f204965098bf18be4",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/698cbc7e132949dbf7b59345bb5c6020d20f8ace",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/6e94ddcd5d37166043210937d79390a6b88cfc53",
          "width" : 64
        } ],
          "name" : "Flamingo",
          "type" : "album",
          "uri" : "spotify:album:7zKxFkMyehmw9u3MhLpMPK"
      }, {
        "album_type" : "album",
        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/1VANv2mWRaWMncF4Phkl0F"
        },
        "href" : "https://api.spotify.com/v1/albums/1VANv2mWRaWMncF4Phkl0F",
        "id" : "1VANv2mWRaWMncF4Phkl0F",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/24300c93e64507177b0238eb2058a3f011e89d4c",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/1f39e2c123536fdcbd863ca3edc8c95389cc68f5",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/f4db93c8ba0831ed87b6605a77bf9baa92b4f036",
          "width" : 64
        } ],
          "name" : "Midnight Flowers",
          "type" : "album",
          "uri" : "spotify:album:1VANv2mWRaWMncF4Phkl0F"
      }, {
        "album_type" : "album",
        "available_markets" : [ "CA", "US" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/0I3yQo6sVf9YmLUd4XKlpu"
        },
        "href" : "https://api.spotify.com/v1/albums/0I3yQo6sVf9YmLUd4XKlpu",
        "id" : "0I3yQo6sVf9YmLUd4XKlpu",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/73bfddbc6146f0ade597a5bea547a84f11041264",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/5029118cf1a7b82016215b12c25605d18e8abd0b",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/ddaddf8cbfb072f953b20ed26577bd3a2ef51d3e",
          "width" : 64
        } ],
          "name" : "Covered Up With Flowers",
          "type" : "album",
          "uri" : "spotify:album:0I3yQo6sVf9YmLUd4XKlpu"
      }, {
        "album_type" : "album",
        "available_markets" : [ "CA", "MX", "US" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/4ufmoUiQbFCyWUM5OVtdsm"
        },
        "href" : "https://api.spotify.com/v1/albums/4ufmoUiQbFCyWUM5OVtdsm",
        "id" : "4ufmoUiQbFCyWUM5OVtdsm",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/14e0f4ba9ee25b2ad1f906ca8608479208e513ef",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/5739391c0b555dbc39dde21d74b7480268b0a1e1",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/cd7f104f22e4f36294923d984202e48cc150a5db",
          "width" : 64
        } ],
          "name" : "You Don't Bring Me Flowers",
          "type" : "album",
          "uri" : "spotify:album:4ufmoUiQbFCyWUM5OVtdsm"
      }, {
        "album_type" : "album",
        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "LV", "LT", "LU", "MY", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/0OrV6t1YYdWXmiOD4ot2iD"
        },
        "href" : "https://api.spotify.com/v1/albums/0OrV6t1YYdWXmiOD4ot2iD",
        "id" : "0OrV6t1YYdWXmiOD4ot2iD",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/869ff36a44f1a29cc5eb001aa83bd18668e8c81c",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/d9c03f439c0aa581a2bbf2749b003eb32432f30e",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/c2d88500b614ec53a985f9f32b48d5b5fd1e3012",
          "width" : 64
        } ],
          "name" : "Flowers On The Wall: The Essential Statler Brothers 1964-1969",
          "type" : "album",
          "uri" : "spotify:album:0OrV6t1YYdWXmiOD4ot2iD"
      }, {
        "album_type" : "album",
        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/4LzplREyxz4OBGBYjkLCaW"
        },
        "href" : "https://api.spotify.com/v1/albums/4LzplREyxz4OBGBYjkLCaW",
        "id" : "4LzplREyxz4OBGBYjkLCaW",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/5b2f119b2ff4cd243d1c41a89f4e8403ebcdf2a6",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/15b24205b2a96799b79087e68574933a5fd80aac",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/36891f8a495cf0215674f32e6d64eb3d2e99f2fb",
          "width" : 64
        } ],
          "name" : "Flowers",
          "type" : "album",
          "uri" : "spotify:album:4LzplREyxz4OBGBYjkLCaW"
      }, {
        "album_type" : "single",
        "available_markets" : [ "CA", "MX", "US" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/3yEjubAQbmTGgsQMnghmgf"
        },
        "href" : "https://api.spotify.com/v1/albums/3yEjubAQbmTGgsQMnghmgf",
        "id" : "3yEjubAQbmTGgsQMnghmgf",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/55854793f31e62833a37fd0c8dd565316458e185",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/24b7b02907a3d0d7a6fa8daad69b8378477b9de1",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/58a3c01babcb70e56dd616e85cfab434920a89a1",
          "width" : 64
        } ],
          "name" : "Still Want You",
          "type" : "album",
          "uri" : "spotify:album:3yEjubAQbmTGgsQMnghmgf"
      }, {
        "album_type" : "album",
        "available_markets" : [ "CA", "MX", "US" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/1aVItTE1QEvBai6ymKG0oI"
        },
        "href" : "https://api.spotify.com/v1/albums/1aVItTE1QEvBai6ymKG0oI",
        "id" : "1aVItTE1QEvBai6ymKG0oI",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/a61f8312d2285a17f82898c00417293afd59a6d5",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/2383b17eafe101323d29bbf9c19f0d236e1d52d4",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/67e30f501eb55a06eb671acb7269c7faddaa5065",
          "width" : 64
        } ],
          "name" : "A Gathering Of Flowers: The Anthology Of The Mamas & The Papas",
          "type" : "album",
          "uri" : "spotify:album:1aVItTE1QEvBai6ymKG0oI"
      }, {
        "album_type" : "album",
        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/7GmU3mfzXDwS68kpuFMczP"
        },
        "href" : "https://api.spotify.com/v1/albums/7GmU3mfzXDwS68kpuFMczP",
        "id" : "7GmU3mfzXDwS68kpuFMczP",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/1ae94a45a8e030876fb6eb3fbf44f1159df6a16d",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/3f57f1ea6fe3dd9fe171f13e9e2c57e7044d5c79",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/7c17f6b87057ffcf61e98fb35c0a44218af98d91",
          "width" : 64
        } ],
          "name" : "Clear Hearts Grey Flowers",
          "type" : "album",
          "uri" : "spotify:album:7GmU3mfzXDwS68kpuFMczP"
      }, {
        "album_type" : "single",
        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/6jpADwNRHSXDsvPSzARq00"
        },
        "href" : "https://api.spotify.com/v1/albums/6jpADwNRHSXDsvPSzARq00",
        "id" : "6jpADwNRHSXDsvPSzARq00",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/434475efdadd153257b96b65ed16733d57ff65c4",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/57c19e2c3fc322bb90c45b73760db9ea3d494ac6",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/892b12519cc4550c1dd872d4a209b0d74209c351",
          "width" : 64
        } ],
          "name" : "Broken Flowers - EP",
          "type" : "album",
          "uri" : "spotify:album:6jpADwNRHSXDsvPSzARq00"
      }, {
        "album_type" : "album",
        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/1frL9Z3ox1TKLvfKFgyvWy"
        },
        "href" : "https://api.spotify.com/v1/albums/1frL9Z3ox1TKLvfKFgyvWy",
        "id" : "1frL9Z3ox1TKLvfKFgyvWy",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/5cfed180aa4388d0d8104b7be004d2465281adef",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/4a6a1aba1c585aea1b27b2cfb244e7150c55b312",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/58cfdfbb471ce3e18f34f2eb815e49f86755993a",
          "width" : 64
        } ],
          "name" : "More",
          "type" : "album",
          "uri" : "spotify:album:1frL9Z3ox1TKLvfKFgyvWy"
      }, {
        "album_type" : "album",
        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/6eG7gWntaNnJEjpvDTOBtv"
        },
        "href" : "https://api.spotify.com/v1/albums/6eG7gWntaNnJEjpvDTOBtv",
        "id" : "6eG7gWntaNnJEjpvDTOBtv",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/e26b0ff403ad1497f74a2eb9962b9873b3f49789",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/bcc5d6beef7f26b4dddf55bb69a009143ab2ac2b",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/7a5831cb18fc303d1604a3951254a755194e5f3f",
          "width" : 64
        } ],
          "name" : "Flowers of Silence",
          "type" : "album",
          "uri" : "spotify:album:6eG7gWntaNnJEjpvDTOBtv"
      }, {
        "album_type" : "single",
        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/41XASvPWGARVDZzNhQn6Pd"
        },
        "href" : "https://api.spotify.com/v1/albums/41XASvPWGARVDZzNhQn6Pd",
        "id" : "41XASvPWGARVDZzNhQn6Pd",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/b9014f2f4c2d58d80a8b54293ae505b87bc4fb79",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/fd7e11d8cb14f385e73441e0a74c44fb9f4a4d15",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/e956896afb43dd2d2d6896a02d4cfbcbd40f0c01",
          "width" : 64
        } ],
          "name" : "This Feeling",
          "type" : "album",
          "uri" : "spotify:album:41XASvPWGARVDZzNhQn6Pd"
      }, {
        "album_type" : "single",
        "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
        "external_urls" : {
          "spotify" : "https://open.spotify.com/album/4NWuhaRY5ORVNV4Wo7bwLf"
        },
        "href" : "https://api.spotify.com/v1/albums/4NWuhaRY5ORVNV4Wo7bwLf",
        "id" : "4NWuhaRY5ORVNV4Wo7bwLf",
        "images" : [ {
          "height" : 640,
          "url" : "https://i.scdn.co/image/f43bec279b7d04d80ef936e4aca43868ae592973",
          "width" : 640
        }, {
          "height" : 300,
          "url" : "https://i.scdn.co/image/2670cb0a65f31336078ac0db79567b5a6d976319",
          "width" : 300
        }, {
          "height" : 64,
          "url" : "https://i.scdn.co/image/c846108194a365441534f4de9728a849a5c4230f",
          "width" : 64
        } ],
          "name" : "Vertigo Flowers - Single",
          "type" : "album",
          "uri" : "spotify:album:4NWuhaRY5ORVNV4Wo7bwLf"
      } ],
          "limit" : 20,
          "next" : "https://api.spotify.com/v1/search?query=flowers&offset=20&limit=20&type=album",
          "offset" : 0,
          "previous" : null,
          "total" : 1969
    }
  }
}
