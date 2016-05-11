describe('PlayLogService', function() {

  var PlayLogService;
  var PlayFactory;
  var SongsService;
  var TURN_NUMBER = 4;
  var DURATION_3 = 3;
  var DURATION_5 = 5;
  var SONG = {title: "title"}
  var WRONG_SONG = {title: "not the title"}

  beforeEach(module('introGame.playLogService'))

  beforeEach(inject(function(_PlayLogService_, _PlayFactory_, _SongsService_) {
    PlayLogService = _PlayLogService_;
    SongsService = _SongsService_;
    PlayFactory = _PlayFactory_;
  }));

  beforeEach(function() {
    for(var i = 0; i < TURN_NUMBER; i++) {
      PlayLogService.plays.push({title: "title", score: i})
    }
  })

  describe('#newGame', function(){
    it('clears the PlayLogService.plays array', function(){
      PlayLogService.newGame();
      expect(PlayLogService.plays.length).toEqual(0);
    })
  })

  describe('#totalScore', function(){
    it('returns the score totaled across all plays', function(){
      expect(PlayLogService.totalScore()).toEqual(6);
    })
  })

  describe('#listen', function() {
    it('creates a new play object if this is the first listen', function() {
      PlayLogService.listen(TURN_NUMBER, DURATION_3);
      expect(PlayLogService.plays.length).toEqual(TURN_NUMBER + 1);
      expect(PlayLogService.plays[PlayLogService.plays.length - 1].duration).toEqual(DURATION_3);
    });

    it('updates the play object if this is not the first listen', function() {
      PlayLogService.listen(TURN_NUMBER, DURATION_3);
      PlayLogService.listen(TURN_NUMBER, DURATION_5);
      expect(PlayLogService.plays.length).toEqual(TURN_NUMBER + 1);
      expect(PlayLogService.plays[PlayLogService.plays.length - 1].duration).toEqual(DURATION_5);
    })
  })

  describe('#guess', function() {
    describe('correct guess', function() {
      beforeEach(function() {
        spyOn(SongsService, 'getSongAtPosition').and.returnValue(SONG)
      })

      it('creates a new play object if listening has not taken place', function() {
        PlayLogService.guess(TURN_NUMBER, SONG);
        console.log(PlayLogService.plays[PlayLogService.plays.length - 1])
        expect(PlayLogService.plays.length).toEqual(TURN_NUMBER + 1);
        var currentPlay = PlayLogService.plays[PlayLogService.plays.length - 1];
        expect(currentPlay.duration).toEqual(0);
        expect(currentPlay.guess).toEqual(SONG);
        expect(currentPlay.score).toEqual(6);
        expect(currentPlay.correctGuess).toEqual(true);
      });

      it('updates the play object if this is not the first listen', function() {
        PlayLogService.listen(TURN_NUMBER, DURATION_3);
        PlayLogService.guess(TURN_NUMBER, SONG);
        expect(PlayLogService.plays.length).toEqual(TURN_NUMBER + 1);
        var currentPlay = PlayLogService.plays[PlayLogService.plays.length - 1];
        expect(currentPlay.duration).toEqual(DURATION_3);
        expect(currentPlay.guess).toEqual(SONG);
        expect(currentPlay.score).toEqual(3);
      });
    });

    describe('wrong guess', function() {
      beforeEach(function() {
        spyOn(SongsService, 'getSongAtPosition').and.returnValue(SONG)
      })

      it('creates a new play object if listening has not taken place', function() {
        PlayLogService.guess(TURN_NUMBER, WRONG_SONG);
        expect(PlayLogService.plays.length).toEqual(TURN_NUMBER + 1);
        var currentPlay = PlayLogService.plays[PlayLogService.plays.length - 1];
        expect(currentPlay.score).toEqual(0);
        expect(currentPlay.correctGuess).toEqual(false);
      });
    });
  });

  describe('#isLastGuessCorrect', function() {
    it('returns the true correctGuess attribute from the last item in the plays array', function() {
      PlayLogService.plays.push({correctGuess: true})
      expect(PlayLogService.isLastGuessCorrect()).toEqual(true)
    })

    it('returns the false correctGuess attribute from the last item in the plays array', function() {
      PlayLogService.plays.push({correctGuess: false})
      expect(PlayLogService.isLastGuessCorrect()).toEqual(false)
    })
  })

  // describe('#storeGuessAndCalculate', function() {
  //   it('calls on SongFetcherService.storeGuess', function() {
  //     spyOn(SongFetcherService,'storeGuess')
  //     spyOn(SongFetcherService,'calculateScore')
  //     SongFetcherService.storeGuessAndCalculate(song1)
  //     expect(SongFetcherService.storeGuess).toHaveBeenCalledWith(song1);
  //   })
  //
  //   it('calls on SongFetcherService.calculateScore', function() {
  //     spyOn(SongFetcherService,'calculateScore')
  //     SongFetcherService.storeGuessAndCalculate(song1)
  //     expect(SongFetcherService.calculateScore).toHaveBeenCalled;
  //
  //   })
  // })
  //
  // describe('#storeGuess', function() {
  //   it('stores the current guessed song', function() {
  //     SongFetcherService.storeGuess(song1);
  //     expect(SongFetcherService.guessedSong()).toEqual(song1)
  //   });
  // })
  //
  // describe('#calculateScore', function() {
  //   it('calculates Score', function() {
  //     SongFetcherService.getAlbum(albumID).then(function(){
  //       SongFetcherService.songs = sorted(SongFetcherService.songs);
  //       SongFetcherService.currentSong(clipDuration3);
  //       SongFetcherService.storeGuess(song1);
  //
  //       expect(SongFetcherService.calculateScore()).toEqual(3)
  //     });
  //   })
  // });
  //
  // describe('#songScore', function() {
  //   it('returns value of guess', function() {
  //     SongFetcherService.getAlbum(albumID).then(function(){
  //       SongFetcherService.songs = sorted(SongFetcherService.songs);
  //       SongFetcherService.currentSong(clipDuration3);
  //       SongFetcherService.storeGuess(song1);
  //       expect(SongFetcherService.songScore()).toEqual(3)
  //     });
  //   })
  // });
  //
  // describe('#isCorrectGuess', function() {
  //   it('returns if guess is correct', function(){
  //     SongFetcherService.getAlbum(albumID).then(function(){
  //       SongFetcherService.songs = sorted(SongFetcherService.songs);
  //       SongFetcherService.storeGuess(song1);
  //       expect(SongFetcherService.isCorrectGuess()).toEqual(true)
  //       SongFetcherService.storeGuess(song2);
  //       expect(SongFetcherService.isCorrectGuess()).toEqual(false)
  //     });
  //   })
  // })





})
