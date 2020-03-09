# 一个仿[网易云音乐](https://music.163.com/)网页版音乐播放器 / A mock [NetEase Cloud Music](https://music.163.com/) web player.

**Demo link:** [https://audio-player-react.now.sh/](https://audio-player-react.now.sh/)

[简中](#%e6%92%ad%e6%94%be%e5%99%a8%e5%ae%9e%e7%8e%b0%e5%8a%9f%e8%83%bd) / [English](#audio-player-features)

## 播放器实现功能

1. 歌曲播放相关功能
  - [x] 歌曲播放、暂停
  - [x] 进度条点击，拖拽
  - [x] 音量调整
  - [x] 上一首歌，下一首歌，切歌功能
  - [ ] 播放模式切换（单曲循环，歌单顺序，歌单随机
2. 歌单功能，包括
  - [x] 列表展示歌单
  - [x] 列表滚动显示
  - [ ] 单击 `scroll thumb` 调整列表显示
  - [ ] 拖动 `scroll thumb` 调整列表显示
  - [x] 选择播放列表歌曲
  - [x] 删除歌单中某一首歌曲
  - [x] 删除全部歌单歌曲
  - [ ] 添加歌曲到播放列表

## Audio Player Features

1. Music playing features
  - [x] Play and pause the music
  - [x] change progress
  - [x] change volume
  - [x] previous/next song
  - [ ] loop/shuffle
2. Playlist features
  - [x] show playlist
  - [x] scroll
  - [ ] click `scroll thumb`
  - [ ] move `scroll thumb`
  - [x] choose and play a song in the list
  - [x] delete a song in the list
  - [x] delete all songs in the list
  - [ ] add music to play list


Structure

App takes care of the music list, Audio Player only needs to take care of one song.

`App` -> `Audio Player` -> `Play List`