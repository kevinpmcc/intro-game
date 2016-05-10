angular.module('introGame.SongFetcherService', ['introGame.songFactory', 'introGame.previewUrlFactory'])
  .service('SongFetcherService', ['$http', 'SongFactory', 'PreviewUrlFactory', function($http, SongFactory, PreviewUrlFactory){
    var sf = this;

    sf.songs = [];

    sf.currentSong = function(songLength) {
      var song = sf.songs[sf.songs.length - 1];
      return sf.appendSongLength(song, songLength);
    };

    sf.remainingSongs = function() {
      var sortedSongs = sf.songs.slice[0];
      console.log(sortedSongs)
      return _sorted(sortedSongs);
    }

    sf.appendSongLength = function(song, songLength) {
      song.appendedPreviewUrl = sf._newPreviewUrlFactory(song.previewUrl, songLength).previewUrl
      return song;
    };

    sf.getAlbum = function(albumID){
        return $http.get('https://api.spotify.com/v1/albums/' + albumID + '/tracks')
        .then(_handleResponseFromApi);
      };

      function _handleResponseFromApi(response) {
        sf.songs = shuffle(response.data.items.map(function(track){
          return sf._newSongFactory(track);
        }));
      };

      sf._newSongFactory = function(track){
        return new SongFactory(track);
      }

      sf._newPreviewUrlFactory = function(previewUrl, songLength) {
        return new PreviewUrlFactory(previewUrl, songLength);
      }

      sf.nextSong = function(){
        sf.songs.pop();
      }


      function _sorted(songs){
        return songs.sort(_sortObjectArray);
      }

      function _sortObjectArray(a, b){
        return Number(a.title > b.title);
      }

      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }

    }
  ]);
