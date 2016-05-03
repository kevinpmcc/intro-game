# intro-game

A fun, easy-to-use, online implementation of the classic game 'Name That Tune'. 
The app plays a short snippet of a song, the user has a small amount of time to guess the artist and title before the song is revealed.
Initially implemented in a browser interface.


MVP
===

```
As a player
In order to stand a fighting chance of guessing
I want to hear a random tune from one or more lists

As a player
In order to prolong the anticipation
I want all details of the track to be hidden until I have guessed the title

As a player
In order to make the game challenging
I would like to hear a clip of length no longer than one second

As a player
In order to mitigate frustration
I want to see the details of the song if I am unable to guess

As a player 
In order to validate my guess
I want to see the details of the song after I have guessed

As a player
In order to show off 
I want a time interval in which to make my guess

As a player
Having demonstrated my ignorance
I would like to play the game again

As a player
To maximise the fun of the game
I would like to be able to replay the clip before guessing

```

Nice to have
============
```
As a player
In order to distract me from my commute
I would like to be able to play the game on my portable device

As a player
In order to boost my ego
I would like to keep track of my score

As a player
in order to have fun with my friends
I would like to keep track of the score for all players

As a player
In order to vary the gameplay
I would like a mode in which I guess as many tunes as possible in a fixed time

As a player
In order to make the game more interesting
I would like to select tracks from my personal playlist

As a player 
IN order to make the game more interesting
I would like to select tracks by genre / artist / period

As a player
In order to avoid unguessable intros
I would like to only hear clips from a recognisable portion of the track


```

Technical considerations
========================
- MVP as front-end only, single page app (Angular)
- ideally using technology that maps readily onto a mobile app (eg Ionic)
-

- Technical risk areas
- --------------------
-   controlling the music player
-   dealing with fixed time periods
-   mobile implementation
-   API authentication
-   

Assumptions
-----------
- Able to access tracks and previews without account from an online music provider
- Use Spotify as the online music provider
