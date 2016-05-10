describe('SongFetcherService', function() {

  var SongFetcherService;
  var SongFactory;
  var PreviewUrlFactory;
  var httpBackend;
  var albumID = '10v912xgTZbjAtYfyKWJCS';
  var apiJsonResponse = getApiJsonResponse();
  var expectedResponse = getAlbumSongs();
  var songLength = 1;
  var previewUrl = "https://p.scdn.co/mp3-preview/2577c8d371ab4ef3b253f0638ca85155c1fdc495"
  var song1 = {title: "Walk All over You"};
  var song2 = {title: "Highway to Hell"};
  var clipDuration1 = 1;
  var clipDuration3 = 3;
  var clipDuration5 = 5;

  beforeEach(module('introGame.SongFetcherService'));

  beforeEach(inject(function(_SongFetcherService_, _SongFactory_, _PreviewUrlFactory_, $httpBackend, $rootScope, $q) {
    SongFactory = _SongFactory_;
    PreviewUrlFactory = _PreviewUrlFactory_;
    httpBackend = $httpBackend;
    SongFetcherService = _SongFetcherService_;
  }));

  describe('#storeGuess', function() {
    it('stores the current guessed song', function() {
      SongFetcherService.storeGuess(song1);
      expect(SongFetcherService.guessedSong()).toEqual(song1)
    });
  })

  describe('#isGameEnd', function() {
    it('returns true when there are two or fewer songs remaining', function() {
      for(var i = 0; i < 2; i++) {
        SongFetcherService.songs.push(song1);
      }
      expect(SongFetcherService.isGameEnd()).toEqual(true);
    })

    it('returns false when there are more than two songs remaining', function() {
      for(var i = 0; i < 3; i++) {
        SongFetcherService.songs.push(song1);
      }
      expect(SongFetcherService.isGameEnd()).toEqual(false);
    })
  })

  describe('#resetMaxCliplength', function(){
    it('sets maxClipLength to zero', function(){
      SongFetcherService.maxClipLength = 5;
      SongFetcherService.resetMaxCliplength();
      expect(SongFetcherService.maxClipLength).toEqual(0);
    })
  })

  describe('using API', function () {
    beforeEach(function(){
      httpBackend.expectGET('https://api.spotify.com/v1/albums/' + albumID + '/tracks').respond(apiJsonResponse);
    });

    afterEach(function(){
      httpBackend.flush();
    });

    describe('#isCorrectGuess', function() {
      it('returns if guess is correct', function(){
        SongFetcherService.getAlbum(albumID).then(function(){
          SongFetcherService.songs = sorted(SongFetcherService.songs);
          SongFetcherService.storeGuess(song1);
          expect(SongFetcherService.isCorrectGuess()).toEqual(true)
          SongFetcherService.storeGuess(song2);
          expect(SongFetcherService.isCorrectGuess()).toEqual(false)
        });
      })
    })



    describe('#getAlbum', function(){

      it('retrieves data from API and stores in an array of song objects', function(){
        SongFetcherService.getAlbum(albumID).then(function(){
          expect(sorted(SongFetcherService.songs)[0].artist).toEqual(expectedResponse[0].artist);
          expect(sorted(SongFetcherService.songs)[0].title).toEqual(expectedResponse[0].title);
          expect(sorted(SongFetcherService.songs)[0].previewUrl).toEqual(expectedResponse[0].previewUrl);
        });
      });

      it('invokes SongFactory for each song returned by API ', function() {
        spyOn(SongFetcherService, '_newSongFactory');
        SongFetcherService.getAlbum(albumID).then(function(results){
          expect(SongFetcherService._newSongFactory.calls.count()).toEqual(10);
        });
      });
    });


    describe('#remainingSongs', function(){
      it('returns all unplayed songs in song array', function(){
        SongFetcherService.getAlbum(albumID).then(function(){
          expect(SongFetcherService.remainingSongs().length).toEqual(10);
        })
      })

    })

    describe('#nextSong', function(){
      it('pops a song from the array and stores it for use in song and answer screens', function(){
        SongFetcherService.getAlbum(albumID).then(function(){
          var initialSongsLength = SongFetcherService.songs.length;
          SongFetcherService.nextSong();
          var newSongsLength = SongFetcherService.songs.length;
          expect(initialSongsLength - newSongsLength).toEqual(1);
        });
      });

      it('calls SongFetcherService.resetMaxCliplength', function(){
        spyOn(SongFetcherService,'resetMaxCliplength')
        SongFetcherService.getAlbum(albumID).then(function(){
          SongFetcherService.nextSong();
          expect(SongFetcherService.resetMaxCliplength).toHaveBeenCalled();
        });
      });
    });



    describe('#currentSong', function(){
      it('returns the last song in the songs array', function() {
        SongFetcherService.getAlbum(albumID).then(function(){
          SongFetcherService.songs = sorted(SongFetcherService.songs);
          expect(SongFetcherService.currentSong().title).toEqual(expectedResponse[1].title)
        });
      });

      it('stores the maximum song length for a song in sf.maxClipLength', function(){
        SongFetcherService.getAlbum(albumID).then(function(){
          SongFetcherService.currentSong(clipDuration5);
          SongFetcherService.currentSong(clipDuration1);
          SongFetcherService.currentSong(clipDuration3);
          expect(SongFetcherService.maxClipLength).toEqual(clipDuration5)
        })
      })

      it('updates the previewURL with the desired duration', function() {
        SongFetcherService.getAlbum(albumID).then(function(){
          SongFetcherService.songs = sorted(SongFetcherService.songs);
          var originalPreviewUrl = expectedResponse[1].previewUrl;
          expect(SongFetcherService.currentSong(songLength).appendedPreviewUrl).toEqual(originalPreviewUrl + "#t=," + songLength)
        });
      });

      it('invokes PreviewUrlFactory for each song requested', function() {
        spyOn(SongFetcherService, '_newPreviewUrlFactory').and.callThrough();
        SongFetcherService.getAlbum(albumID).then(function(results){
          SongFetcherService.songs = sorted(SongFetcherService.songs);
          SongFetcherService.currentSong(songLength);
          var originalPreviewUrl = expectedResponse[1].previewUrl;
          expect(SongFetcherService._newPreviewUrlFactory).toHaveBeenCalledWith(originalPreviewUrl, songLength);
        });
      });
    });
  });
});

function sorted(songs){
  return songs.sort(_sortObjectArray);
}

function _sortObjectArray(a, b){
  return Number(a.title > b.title);
}

function getAlbumSongs(){
  return  [ {"artist" : "AC/DC",
                  "title" : "Beating Around the Bush",
                  "previewUrl" : "https://p.scdn.co/mp3-preview/2577c8d371ab4ef3b253f0638ca85155c1fdc495"},
                  {"artist" : "AC/DC",
                   "title" : "Walk All over You",
                  "previewUrl" : "https://p.scdn.co/mp3-preview/82bdae1a32ffd4bee3ea4b270687922286b50a3f"}];
};

function getApiJsonResponse(){
  return {
  "href" : "https://api.spotify.com/v1/albums/10v912xgTZbjAtYfyKWJCS/tracks?offset=0&limit=20",
  "items" : [ {
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/711MCceyCBcFnzjGY4Q7Un"
      },
      "href" : "https://api.spotify.com/v1/artists/711MCceyCBcFnzjGY4Q7Un",
      "id" : "711MCceyCBcFnzjGY4Q7Un",
      "name" : "AC/DC",
      "type" : "artist",
      "uri" : "spotify:artist:711MCceyCBcFnzjGY4Q7Un"
    } ],
    "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
    "disc_number" : 1,
    "duration_ms" : 208400,
    "explicit" : false,
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/2zYzyRzz6pRmhPzyfMEC8s"
    },
    "href" : "https://api.spotify.com/v1/tracks/2zYzyRzz6pRmhPzyfMEC8s",
    "id" : "2zYzyRzz6pRmhPzyfMEC8s",
    "name" : "Highway to Hell",
    "preview_url" : "https://p.scdn.co/mp3-preview/aa4f9186e0c3f4436bb40572a63862db80d7ef2d",
    "track_number" : 1,
    "type" : "track",
    "uri" : "spotify:track:2zYzyRzz6pRmhPzyfMEC8s"
  }, {
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/711MCceyCBcFnzjGY4Q7Un"
      },
      "href" : "https://api.spotify.com/v1/artists/711MCceyCBcFnzjGY4Q7Un",
      "id" : "711MCceyCBcFnzjGY4Q7Un",
      "name" : "AC/DC",
      "type" : "artist",
      "uri" : "spotify:artist:711MCceyCBcFnzjGY4Q7Un"
    } ],
    "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
    "disc_number" : 1,
    "duration_ms" : 203293,
    "explicit" : false,
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/6Wn3pdFtAcnYJyJVITwt7N"
    },
    "href" : "https://api.spotify.com/v1/tracks/6Wn3pdFtAcnYJyJVITwt7N",
    "id" : "6Wn3pdFtAcnYJyJVITwt7N",
    "name" : "Girls Got Rhythm",
    "preview_url" : "https://p.scdn.co/mp3-preview/fdce0d699ffc0229d87dfdb9e9d028d116b317fd",
    "track_number" : 2,
    "type" : "track",
    "uri" : "spotify:track:6Wn3pdFtAcnYJyJVITwt7N"
  }, {
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/711MCceyCBcFnzjGY4Q7Un"
      },
      "href" : "https://api.spotify.com/v1/artists/711MCceyCBcFnzjGY4Q7Un",
      "id" : "711MCceyCBcFnzjGY4Q7Un",
      "name" : "AC/DC",
      "type" : "artist",
      "uri" : "spotify:artist:711MCceyCBcFnzjGY4Q7Un"
    } ],
    "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
    "disc_number" : 1,
    "duration_ms" : 310000,
    "explicit" : false,
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/5xquYn2sr3uEcyuKU9BmCJ"
    },
    "href" : "https://api.spotify.com/v1/tracks/5xquYn2sr3uEcyuKU9BmCJ",
    "id" : "5xquYn2sr3uEcyuKU9BmCJ",
    "name" : "Walk All over You",
    "preview_url" : "https://p.scdn.co/mp3-preview/82bdae1a32ffd4bee3ea4b270687922286b50a3f",
    "track_number" : 3,
    "type" : "track",
    "uri" : "spotify:track:5xquYn2sr3uEcyuKU9BmCJ"
  }, {
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/711MCceyCBcFnzjGY4Q7Un"
      },
      "href" : "https://api.spotify.com/v1/artists/711MCceyCBcFnzjGY4Q7Un",
      "id" : "711MCceyCBcFnzjGY4Q7Un",
      "name" : "AC/DC",
      "type" : "artist",
      "uri" : "spotify:artist:711MCceyCBcFnzjGY4Q7Un"
    } ],
    "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
    "disc_number" : 1,
    "duration_ms" : 266266,
    "explicit" : false,
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/2j0zExWFB0PowLOeoZosjK"
    },
    "href" : "https://api.spotify.com/v1/tracks/2j0zExWFB0PowLOeoZosjK",
    "id" : "2j0zExWFB0PowLOeoZosjK",
    "name" : "Touch Too Much",
    "preview_url" : "https://p.scdn.co/mp3-preview/dbde661cd2df91e1fb6f7116a9de258130ed08d7",
    "track_number" : 4,
    "type" : "track",
    "uri" : "spotify:track:2j0zExWFB0PowLOeoZosjK"
  }, {
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/711MCceyCBcFnzjGY4Q7Un"
      },
      "href" : "https://api.spotify.com/v1/artists/711MCceyCBcFnzjGY4Q7Un",
      "id" : "711MCceyCBcFnzjGY4Q7Un",
      "name" : "AC/DC",
      "type" : "artist",
      "uri" : "spotify:artist:711MCceyCBcFnzjGY4Q7Un"
    } ],
    "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
    "disc_number" : 1,
    "duration_ms" : 235706,
    "explicit" : false,
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/7sZKoFbEu4mPuCMX5cxLSb"
    },
    "href" : "https://api.spotify.com/v1/tracks/7sZKoFbEu4mPuCMX5cxLSb",
    "id" : "7sZKoFbEu4mPuCMX5cxLSb",
    "name" : "Beating Around the Bush",
    "preview_url" : "https://p.scdn.co/mp3-preview/2577c8d371ab4ef3b253f0638ca85155c1fdc495",
    "track_number" : 5,
    "type" : "track",
    "uri" : "spotify:track:7sZKoFbEu4mPuCMX5cxLSb"
  }, {
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/711MCceyCBcFnzjGY4Q7Un"
      },
      "href" : "https://api.spotify.com/v1/artists/711MCceyCBcFnzjGY4Q7Un",
      "id" : "711MCceyCBcFnzjGY4Q7Un",
      "name" : "AC/DC",
      "type" : "artist",
      "uri" : "spotify:artist:711MCceyCBcFnzjGY4Q7Un"
    } ],
    "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
    "disc_number" : 1,
    "duration_ms" : 202866,
    "explicit" : false,
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/6pivm7pNF4GyBkHNGseHCS"
    },
    "href" : "https://api.spotify.com/v1/tracks/6pivm7pNF4GyBkHNGseHCS",
    "id" : "6pivm7pNF4GyBkHNGseHCS",
    "name" : "Shot Down in Flames",
    "preview_url" : "https://p.scdn.co/mp3-preview/fa3775a3c696d0b15bb59a9f6edfe98e9ae1206f",
    "track_number" : 6,
    "type" : "track",
    "uri" : "spotify:track:6pivm7pNF4GyBkHNGseHCS"
  }, {
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/711MCceyCBcFnzjGY4Q7Un"
      },
      "href" : "https://api.spotify.com/v1/artists/711MCceyCBcFnzjGY4Q7Un",
      "id" : "711MCceyCBcFnzjGY4Q7Un",
      "name" : "AC/DC",
      "type" : "artist",
      "uri" : "spotify:artist:711MCceyCBcFnzjGY4Q7Un"
    } ],
    "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
    "disc_number" : 1,
    "duration_ms" : 154506,
    "explicit" : false,
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/7HbHwtTGM3kCjDtmP00x4h"
    },
    "href" : "https://api.spotify.com/v1/tracks/7HbHwtTGM3kCjDtmP00x4h",
    "id" : "7HbHwtTGM3kCjDtmP00x4h",
    "name" : "Get It Hot",
    "preview_url" : "https://p.scdn.co/mp3-preview/823e7c7bb6e75468da157137930c5137d755fe90",
    "track_number" : 7,
    "type" : "track",
    "uri" : "spotify:track:7HbHwtTGM3kCjDtmP00x4h"
  }, {
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/711MCceyCBcFnzjGY4Q7Un"
      },
      "href" : "https://api.spotify.com/v1/artists/711MCceyCBcFnzjGY4Q7Un",
      "id" : "711MCceyCBcFnzjGY4Q7Un",
      "name" : "AC/DC",
      "type" : "artist",
      "uri" : "spotify:artist:711MCceyCBcFnzjGY4Q7Un"
    } ],
    "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
    "disc_number" : 1,
    "duration_ms" : 274226,
    "explicit" : false,
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/7zscdQe9CjzXnqT3P1Ey7K"
    },
    "href" : "https://api.spotify.com/v1/tracks/7zscdQe9CjzXnqT3P1Ey7K",
    "id" : "7zscdQe9CjzXnqT3P1Ey7K",
    "name" : "If You Want Blood (You've Got It)",
    "preview_url" : "https://p.scdn.co/mp3-preview/09cbbe681830a38e6b9ad3033b234a9a65dc3790",
    "track_number" : 8,
    "type" : "track",
    "uri" : "spotify:track:7zscdQe9CjzXnqT3P1Ey7K"
  }, {
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/711MCceyCBcFnzjGY4Q7Un"
      },
      "href" : "https://api.spotify.com/v1/artists/711MCceyCBcFnzjGY4Q7Un",
      "id" : "711MCceyCBcFnzjGY4Q7Un",
      "name" : "AC/DC",
      "type" : "artist",
      "uri" : "spotify:artist:711MCceyCBcFnzjGY4Q7Un"
    } ],
    "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
    "disc_number" : 1,
    "duration_ms" : 257173,
    "explicit" : false,
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/1Kbc8nH6BhsWnTuM22qypl"
    },
    "href" : "https://api.spotify.com/v1/tracks/1Kbc8nH6BhsWnTuM22qypl",
    "id" : "1Kbc8nH6BhsWnTuM22qypl",
    "name" : "Love Hungry Man",
    "preview_url" : "https://p.scdn.co/mp3-preview/dc8bfe0c7d61b8838aced1e5427b5c33d9063770",
    "track_number" : 9,
    "type" : "track",
    "uri" : "spotify:track:1Kbc8nH6BhsWnTuM22qypl"
  }, {
    "artists" : [ {
      "external_urls" : {
        "spotify" : "https://open.spotify.com/artist/711MCceyCBcFnzjGY4Q7Un"
      },
      "href" : "https://api.spotify.com/v1/artists/711MCceyCBcFnzjGY4Q7Un",
      "id" : "711MCceyCBcFnzjGY4Q7Un",
      "name" : "AC/DC",
      "type" : "artist",
      "uri" : "spotify:artist:711MCceyCBcFnzjGY4Q7Un"
    } ],
    "available_markets" : [ "AR", "AU", "AT", "BE", "BO", "BR", "BG", "CA", "CL", "CO", "CR", "CY", "CZ", "DK", "DO", "DE", "EC", "EE", "SV", "FI", "FR", "GR", "GT", "HN", "HK", "HU", "IS", "IE", "IT", "LV", "LT", "LU", "MY", "MT", "MX", "NL", "NZ", "NI", "NO", "PA", "PY", "PE", "PH", "PL", "PT", "SG", "SK", "ES", "SE", "CH", "TW", "TR", "UY", "US", "GB", "AD", "LI", "MC", "ID" ],
    "disc_number" : 1,
    "duration_ms" : 387960,
    "explicit" : false,
    "external_urls" : {
      "spotify" : "https://open.spotify.com/track/7w04gIWA7mIbqR03Ghyrkl"
    },
    "href" : "https://api.spotify.com/v1/tracks/7w04gIWA7mIbqR03Ghyrkl",
    "id" : "7w04gIWA7mIbqR03Ghyrkl",
    "name" : "Night Prowler",
    "preview_url" : "https://p.scdn.co/mp3-preview/cdb606c435a4cc4e212dc96d7a75ec8db74a0c10",
    "track_number" : 10,
    "type" : "track",
    "uri" : "spotify:track:7w04gIWA7mIbqR03Ghyrkl"
  } ],
  "limit" : 20,
  "next" : null,
  "offset" : 0,
  "previous" : null,
  "total" : 10
};
};
