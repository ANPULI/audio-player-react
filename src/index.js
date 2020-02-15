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
          duration: 151792,
        },
        {
          id: 433107530,
          name: "So Cute~",
          url: "https://music.163.com/song/media/outer/url?id=433107530.mp3",
          duration: 184267,
        },
      ];
      return {
        currentIndex: 0,
        maxIndex: musicList.length - 1,
        currentMusic: musicList[0],
        musicList: musicList,
      };
    });
  }

  handleNextClick = () => {
    this.setState((state, props) => {
      let newIndex = (state.currentIndex === state.maxIndex) ? 0 : state.currentIndex + 1;
      return {
        currentIndex: newIndex,
        currentMusic: state.musicList[newIndex],
      };
    });
  }

  handlePrevClick = () => {
    this.setState((state, props) => {
      let newIndex = (state.currentIndex === 0) ? state.maxIndex : state.currentIndex - 1;
      return {
        currentIndex: newIndex,
        currentMusic: state.musicList[newIndex],
      };
    });
  }

  render() {
    return (
      <div>
        <h1> Music Here</h1>
        <button onClick={this.loadMusicList}>Load music list</button>
        <button onClick={this.handleNextClick}>next</button>
        <button onClick={this.handlePrevClick}>prev</button>
        <AudioPlayer 
          currentMusic={this.state.currentMusic} 
          musicList={this.state.musicList} 
          onAudioEnded={this.handleNextClick} 
          handleNext = {this.handleNextClick}
          handlePrev = {this.handlePrevClick}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.querySelector('#root')
);