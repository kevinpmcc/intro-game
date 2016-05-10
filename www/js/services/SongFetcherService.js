angular.module('introGame.SongFetcherService', ['introGame.songFactory', 'introGame.previewUrlFactory'])
  .service('SongFetcherService', ['$http', 'SongFactory', 'PreviewUrlFactory', function($http, SongFactory, PreviewUrlFactory){
    var sf = this;

    sf.songs = [];
    sf.storedGuess;
    sf.maxClipLength = 0;

    sf.currentSong = function(songLength) {
      sf.maxClipLength = (songLength > sf.maxClipLength) ? songLength : sf.maxClipLength
      var song = sf.songs[sf.songs.length - 1];
      return sf.appendSongLength(song, songLength);
    };

    sf.resetMaxCliplength = function(){
      sf.maxClipLength = 0;
    }

    sf.isGameEnd = function() {
      return sf.songs.length < 3;
    }

    sf.remainingSongs = function() {
      var sortedSongs = [];
      for(var i in sf.songs) {
        sortedSongs[i] = sf.songs[i]
      }
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
        sf.resetMaxCliplength();
        sf.songs.pop();
      }

      sf.isCorrectGuess = function() {
        return sf.storedGuess.title === sf.currentSong().title
      }

      sf.storeGuess = function(song) {
        sf.storedGuess = song
      }

      sf.guessedSong = function() {
        return sf.storedGuess
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
