import React from 'react'
import ReactDOM from 'react-dom'
import AudioPlayer from './components/AudioPlayer'

const apiUrl = "http://localhost:3000/";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0,
      maxIndex: 0,
      currentMusic: null,
      musicList: null,
    }
  }

  componentWillMount() {
    this.loadMusicList();
  }

  loadMusicList = () => {
    this.setState((state, props) => {
      let musicList = [
        {
          id: 494064179,
          name: "柴 鱼 の c a l l i n g【已售】",
          url: "https://music.163.com/song/media/outer/url?id=494064179.mp3",
          infoUrl: "https://music.163.com/song?id=494064179",
          imgUrl: "http://p2.music.126.net/ws5PkDTu_9iPCE9_XV0u0w==/109951163269801605.jpg?param=34y34",
          duration: 151792,
          artist: {
            id: 35846642,
            url: "https://music.163.com/artist?id=35846642",
            name: "幸子小姐拜托了",
          },
        },
        {
          id: 433107530,
          name: "So Cute~",
          url: "https://music.163.com/song/media/outer/url?id=433107530.mp3",
          infoUrl: "https://music.163.com/song?id=433107530",
          imgUrl: "https://p2.music.126.net/yFCpD3GrgmcInAbVvVaFUg==/17999005346907556.jpg?param=34y34",
          duration: 184267,
          artist: {
            id: 12027465,
            url: "https://music.163.com/artist?id=12027465",
            name: "Lopu$",
          },
        },
      ];
      return {
        currentIndex: 0,
        maxIndex: musicList.length - 1,
        currentMusic: musicList[0],
        musicList: musicList,
      };
    });
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

  handleDeleteMusic = (idx) => {
    this.setState((state, props) => {
      // recalc current index
      let currentIndex = state.currentIndex;
      console.log(idx, currentIndex)
      if (idx < currentIndex) {
        currentIndex -= 1;
      }
      // recalc music list
      let musicList = state.musicList;
      musicList.splice(idx, 1);
      // recalc current music
      let currentMusic = musicList[currentIndex];
      console.log(currentIndex)
      console.log(musicList)
      console.log(currentMusic)
      let maxIndex = state.maxIndex - 1;
      return ({
        currentIndex: currentIndex,
        maxIndex: maxIndex,
        currentMusic: currentMusic,
        musicList: musicList,
      });
    });
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
          handleNext = {this.handleNext} 
          handlePrev = {this.handlePrev} 
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);