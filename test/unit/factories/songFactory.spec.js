describe('SongFactory', function() {

  var sf;

  beforeEach(module('introGame.songFactory'));
  beforeEach(inject(function(SongFactory) {
    sf = new SongFactory(song);
  }));

  it('creates songs', function() {
    expect(sf.artist).toEqual("AC/DC")
    expect(sf.title).toEqual("Highway to Hell")
    expect(sf.previewUrl).toEqual('https://p.scdn.co/mp3-preview/aa4f9186e0c3f4436bb40572a63862db80d7ef2d')
  });

  var song = {
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
 }

});
