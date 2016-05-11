describe('GameLogicService', function() {

  var GameLogicService;
  var SongsService;
  var TURNS_IN_GAME = 10

  beforeEach(module('introGame.gameLogicService'))

  beforeEach(inject(function(_GameLogicService_, _SongsService_){
    GameLogicService = _GameLogicService_;
    SongsService = _SongsService_
  }));


// guessing
// scoring
// preparing list of songs to answer
// managing position of current song
// describe('#setTurnsInGame', function() {
//   it('sets number of turns in game', function() {
//     spyOn(SongsService, 'getNumberOfSongs').and.returnValue(TURNS_IN_GAME)
//     GameLogicService.setTurnsInGame();
//     expect(GameLogicService.turnsInGame).toEqual(TURNS_IN_GAME)
//     expect(SongsService.getNumberOfSongs).toHaveBeenCalled();
//   })
// })

describe('#nextTurn', function() {
  it('increments the turn number by 1', function() {
    GameLogicService.turnNumber = 0;
    GameLogicService.nextTurn();
    expect(GameLogicService.turnNumber).toEqual(1);
  })
})

describe('#newGame', function() {

  beforeEach(function() {
    spyOn(SongsService, 'getNumberOfSongs').and.returnValue(TURNS_IN_GAME)
    GameLogicService.newGame();
  })

  it('sets the number of turns', function() {
    expect(GameLogicService.turnsInGame).toEqual(TURNS_IN_GAME)
    expect(SongsService.getNumberOfSongs).toHaveBeenCalled();
  })

  it('sets turn number to 0', function(){
    expect(GameLogicService.turnNumber).toEqual(0)
  })
})

it('checks whether the guess is correct', function(){

})

it('calculates the turn score based on the guess', function(){

})

it('maintains the total score for a single game', function(){

})

it('resets score to zero on new game', function(){

})

it('maintains the position of the current song in the game', function(){

})
describe ('#getCurrentTurnNumber', function() {
  it('returns the current turn number', function() {
    GameLogicService.turnNumber = 3;
    expect(GameLogicService.getCurrentTurnNumber()).toEqual(3)
  })
})
describe('#isGameEnd', function() {
  beforeEach(function(){
    GameLogicService.turnsInGame = TURNS_IN_GAME;
  })
  it('detects end of game', function(){
    GameLogicService.turnNumber = TURNS_IN_GAME;
    expect(GameLogicService.isGameEnd()).toEqual(true);
  })

  it('detects when not end of game', function(){
    GameLogicService.turnNumber = TURNS_IN_GAME - 1;
    expect(GameLogicService.isGameEnd()).toEqual(false);
  })
})
});
