angular.module('introGame.albumFetcherService', [])
  .service('AlbumFetcherService', function(){

    var af = this;

    af.getAlbums = function(){
      return new Promise(function (resolve,reject){
        if (true){
        resolve(allAlbums);
      }
        else { reject(allAlbums);

        }
      })
    }
    var allAlbums = [
      {artist: "AC/DC",
       title: "Highway to Hell",
       albumID: "10v912xgTZbjAtYfyKWJCS",
       img_url: "https://i.scdn.co/image/42dab3e45b3b9f2ba85538f8dc08e544ac9778d2"},
      {artist: "Destiny's Child",
       title: "Survivor",
       albumID: "2HcjLD0ButtKsQYqzoyOx9",
       img_url: "https://i.scdn.co/image/1f45888d95a106efb58f40ffc808d3d9d6b0b99a"},
      {artist: "The Beatles",
      title: "1",
      albumID: "5ju5Ouzan3QwXqQt1Tihbh",
      img_url: "https://i.scdn.co/image/4e6916b16ce51c241c16f4d642360443aeb7b4df"},
      {artist: "Radiohead",
      title: "OK Computer",
      albumID: "7dxKtc08dYeRVHt3p9CZJn",
      img_url: "https://i.scdn.co/image/f89c1ecdd0cc5a23d5ad7303d4ae231d197dde98"},
      {artist: "Michael Jackson",
      title: "Thriller",
      albumID: "2ANVost0y2y52ema1E9xAZ",
      img_url: "https://i.scdn.co/image/a743b6fed33ddb79e39433baa60e51dc9880192f"},
      {artist: "Queen",
      title: "Greatest Hits",
      albumID: "3VWrUk4vBznMYXGMPc7dRB",
      img_url: "https://i.scdn.co/image/8995c45551984864859c3b7c127e3e234e3307f4"}
       ];
  });
