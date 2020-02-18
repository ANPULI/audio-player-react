import React from 'react'
import ReactDOM from 'react-dom'
import AudioPlayer from './components/AudioPlayer'
import playListJson from './assets/playlist.json'

const apiUrl = "http://localhost:3000/";
const api_playlist = "https://api.imjad.cn/cloudmusic/?type=playlist&id=";
const api_song = "https://api.imjad.cn/cloudmusic/?type=detail&id=";
const playlist_id = "2033560788";

async function getPlayList(id) {
  const res = await fetch(api_playlist + id);
  return await res.json()
}

async function getSongInfo(id) {
  const res = await fetch(api_song + id);
  return await res.json()
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      maxIndex: playListJson.length - 1,
      currentMusic: playListJson[0],
      musicList: playListJson,
      shouldPlay: false,
    }
  }

  // componentWillMount() {
  //   this.loadMusicList();
  // }

  loadMusicList = () => {

    this.setState((state, props) => {
      return {
        currentIndex: 0,
        maxIndex: playListJson.length,
        currentMusic: playListJson[0],
        musicList: playListJson,
      };
    });

    // getPlayList(playlist_id).then(data => {
    //   let result = [];
    //   let songIDs = data.playlist.trackIds.map(item => item.id);
    //   for (let i = 0; i < 50; i++) {
    //     getSongInfo(songIDs[i]).then(rawSongInfo => {
    //       let songInfo = rawSongInfo.songs[0];
    //       let res = {
    //         id: songInfo.id,
    //         name: songInfo.name,
    //         url: `https://music.163.com/song/media/outer/url?id=${songInfo.id}.mp3`,
    //         infoUrl: "https://music.163.com/song?id=" + songInfo.id,
    //         img_id: songInfo.al.pic_str,
    //         imgUrl: songInfo.al.picUrl + "?param=34y34",
    //         duration: songInfo.dt,
    //         artist: {
    //           id: songInfo.ar[0].id,
    //           url: "https://music.163.com/artist?id=" + songInfo.ar[0].id,
    //           name: songInfo.ar[0].name,
    //         },
    //       };
    //       // result.push(res)
    //       this.setState((state) => {
    //         return {
    //           maxIndex: state.maxIndex + 1,
    //           musicList: state.musicList.concat([res])
    //         }
    //       });

          
    //     })
    //   }
    //   // console.log(result)

    // })

  };

  handleNext = () => {
    this.setState((state, props) => {
      let newIndex = (state.currentIndex === state.maxIndex) ? 0 : state.currentIndex + 1;
      return {
        currentIndex: newIndex,
        currentMusic: state.musicList[newIndex],
      };
    });
  };

  handlePrev = () => {
    this.setState((state, props) => {
      let newIndex = (state.currentIndex === 0) ? state.maxIndex : state.currentIndex - 1;
      return {
        currentIndex: newIndex,
        currentMusic: state.musicList[newIndex],
      };
    });
  };

  handleChooseMusic = (idx) => {
    this.setState({
      currentIndex: idx,
      currentMusic: this.state.musicList[idx],
      shouldPlay: true,
    });
  };

  handleDeleteMusic = (idx) => {
    this.setState((state, props) => {
      // recalc current index
      let currentIndex = state.currentIndex;
      // console.log(idx, currentIndex)
      if (idx < currentIndex) {
        currentIndex -= 1;
      }
      // recalc music list
      let musicList = state.musicList;
      musicList.splice(idx, 1);
      // recalc current music
      let currentMusic = musicList[currentIndex];
      // console.log(currentIndex)
      // console.log(musicList)
      // console.log(currentMusic)
      let maxIndex = state.maxIndex - 1;
      return ({
        currentIndex: currentIndex,
        maxIndex: maxIndex,
        currentMusic: currentMusic,
        musicList: musicList,
      });
    });
  }

  handleDeleteAllMusic = () => {
    this.setState({
      currentIndex: null,
      maxIndex: 0,
      currentMusic: null,
      musicList: null,
    })
  }

  render() {
    return (
      <div>
        <h1> Music Here</h1>
        <button onClick={this.loadMusicList}>Load music list</button>
        <button onClick={this.handleNext}>next</button>
        <button onClick={this.handlePrev}>prev</button>
        <button value={0} onClick={() => this.handleDeleteMusic(0)}>deletemusic</button>
        <AudioPlayer 
          currentMusic={this.state.currentMusic} 
          currentIndex={this.state.currentIndex} 
          musicList={this.state.musicList} 
          onAudioEnded={this.handleNext} 
          handleNext={this.handleNext} 
          handlePrev={this.handlePrev} 
          handleChooseMusic={this.handleChooseMusic}
          handleDeleteMusic={this.handleDeleteMusic}
          handleDeleteAllMusic={this.handleDeleteAllMusic}
          shouldPlay={this.state.shouldPlay}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);