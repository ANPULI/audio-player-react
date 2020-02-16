import React from 'react'
import '../assets/css/audio-player.css'

let clamp = (val, min, max) => Math.min(Math.max(val, min), max);

function VolCom(props) {


  return (
    <div 
      className="vol" 
      style={{visibility: props.visible ? "visible" : "hidden"}}
      onClick={props.onClick}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseMove={props.isMouseDown ? props.onMouseMove : null}
    >
      <div className="barbg"></div>
      <div className="vbg j-t" ref={props.vbarRef} >
        <div className="curr j-t" style={{height: 93 * props.volume + "px"}}></div>
        <span className="btn f-alpha j-t" style={{top: 81 * (1 -props.volume) + "px"}}></span>
      </div>
    </div>
  );
}

class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAutoPlay: false,
      isPaused: true,
      isProgressBarMouseDown: false,
      isVolumeBarVisible: false,
      isVolumeBarMouseDown: false,
      volume: 0.5,
      currentTime: 0,
      formattedCurrentTime: "00:00",
      currentWidth: "0%",
      duration: 0,
      formattedDuration: "00:00",
      bufferedWidth: "0%",
    }
    this.audio = null;
    this.pbar = null;   // progress bar
    this.vbar = null;   // volume bar
  }

  componentDidUpdate(prevProps, prevState) {
    // if (! prevState.isAutoPlay) { this.setState({isAutoPlay: true}) }
    if (this.props.musicList !== prevProps.musicList) {

    }
  }

  componentDidMount() {
    this.setState({
      isPaused: this.audio.paused,
      isAutoPlay: ! this.audio.paused,
    });
  }

  setAudioRef = element => {
    this.audio = element;
  };

  setPbarRef = element => {
    this.pbar = element;
  };

  setVbarRef = element => {
    this.vbar = element;
  };

  handlePlay = event => {
    this.audio.paused ? this.audio.play() : this.audio.pause();
    this.setState({
      isPaused: this.audio.paused,
      isAutoPlay: ! this.audio.paused,
    });
  };

  handleCanPlay = event => {
    let duration = this.getMusicDuration();
    let currentTime = this.getMusicCurrentTime();
    let formattedDuration = this.getFormattedTime(duration);
    let formattedCurrentTime = this.getFormattedTime(currentTime);
    let currentWidth = this.getMusicCurrentWidth();
    let bufferedWidth = this.getMusicBufferedWidth();
    this.setState({
      duration: duration,
      currentTime: currentTime,
      formattedDuration: formattedDuration,
      formattedCurrentTime: formattedCurrentTime,
      currentWidth: currentWidth,
      bufferedWidth: bufferedWidth,});
  };

  handleTimeUpdate = event => {
    let currentTime = this.getMusicCurrentTime();
    let formattedCurrentTime = this.getFormattedTime(currentTime);
    let currentWidth = this.getMusicCurrentWidth();
    let bufferedWidth = this.getMusicBufferedWidth();
    this.setState({
      currentTime: currentTime,
      formattedCurrentTime: formattedCurrentTime,
      currentWidth: currentWidth,
      bufferedWidth: bufferedWidth,
    });
  };

  handleProgressBarClicked = event => {
    let portion = (event.pageX - this.pbar.getBoundingClientRect().x) / this.pbar.getBoundingClientRect().width;
    portion = clamp(portion, 0, 1);
    let newTime = this.state.duration * portion;
    if (this.audio) { this.audio.currentTime = newTime; }
  };

  handleProgressBarMouseDown = event => {
    let portion = (event.pageX - this.pbar.getBoundingClientRect().x) / this.pbar.getBoundingClientRect().width;
    portion = clamp(portion, 0, 1);
    let tempWidth = portion * 100 + "%";
    let tempTime = this.state.duration * portion;
    let formattedTempTime = this.getFormattedTime(tempTime);
    this.setState({
      isProgressBarMouseDown: true,
      currentWidth: tempWidth,
      formattedCurrentTime: formattedTempTime,
    });
  };

  handleProgressBarMouseUp = event => {
    this.setState({
      isProgressBarMouseDown: false,
    });
  };

  handleProgressBarMouseMoved = event => {
    let portion = (event.pageX - this.pbar.getBoundingClientRect().x) / this.pbar.getBoundingClientRect().width;
    portion = clamp(portion, 0, 1);
    let tempWidth = portion * 100 + "%";
    let tempTime = this.state.duration * portion;
    let formattedTempTime = this.getFormattedTime(tempTime);
    this.setState({
      currentWidth: tempWidth,
      formattedCurrentTime: formattedTempTime,
    });
  };

  handleVolumeIconClicked = event => {
    this.setState((state, props) => {
      return {isVolumeBarVisible: !state.isVolumeBarVisible};
    });
  };

  handleVolumeBarClicked = event => {
    let volume = (event.pageY - this.vbar.getBoundingClientRect().y) / this.vbar.getBoundingClientRect().height;
    volume = 1 - clamp(volume, 0, 1);
    if (this.audio) { this.audio.volume = volume };
    this.setState({volume: volume});
  };

  handleVolumeBarMouseDown = event => {
    let volume = (event.pageY - this.vbar.getBoundingClientRect().y) / this.vbar.getBoundingClientRect().height;
    volume = 1 - clamp(volume, 0, 1);
    if (this.audio) { this.audio.volume = volume };
    this.setState({
      volume: volume,
      isVolumeBarMouseDown: true,
    });
  }

  handleVolumeBarMouseUp = event => {
    this.setState({
      isVolumeBarMouseDown: false,
    });
  }

  handleVolumeBarMouseMove = event => {
    let volume = (event.pageY - this.vbar.getBoundingClientRect().y) / this.vbar.getBoundingClientRect().height;
    volume = 1 - clamp(volume, 0, 1);
    if (this.audio) { this.audio.volume = volume };
    this.setState({
      volume: volume,
    });
  }

  getMusicName = () => {
    return this.props.currentMusic ? this.props.currentMusic.name : "song name";
  };

  getMusicImg = () => {
    return this.props.currentMusic ? this.props.currentMusic.imgUrl : "";
  };

  getMusicPage = () => {
    return this.props.currentMusic ? this.props.currentMusic.infoUrl : "#"
  };

  getMusicDuration = () => {
    return this.audio ? this.audio.duration : 0;
  };

  getMusicCurrentTime = () => {
    return this.audio ? this.audio.currentTime : 0;
  };

  getMusicBufferedWidth = () => {
    let length = this.audio.buffered.length
    return (length > 0) ? 100 * this.audio.buffered.end(length-1) / this.audio.duration + "%" : "0%";
  };

  getMusicCurrentWidth = () => {
    return this.audio ? 100 * this.state.currentTime / this.state.duration + "%" : "0%";
  };

  getFormattedTime = (time) => {
    return new Date(time * 1000).toISOString().substring(14, 19);
  };

  getArtistName = () => {
    return this.props.currentMusic ? this.props.currentMusic.artist.name : "artist"
  };

  getArtistPage = () => {
    return this.props.currentMusic ? this.props.currentMusic.artist.url : "#"
  };

  render() {
    const isProgressBarMouseDown = this.state.isProgressBarMouseDown;
    return (
      <div className="btmbar">
        <div className="playbar">
          <audio 
            autoPlay={this.state.isAutoPlay}
            ref={this.setAudioRef} 
            src={this.props.currentMusic ? this.props.currentMusic.url : ""}
            volume={this.state.volume}
            onEnded={this.props.onAudioEnded}
            onTimeUpdate={isProgressBarMouseDown ? null : this.handleTimeUpdate} 
            onCanPlay={this.handleCanPlay}
          />
          <div className="bg" />
          <div className="wrap">
            <div className="btns">
              <a onClick={this.props.handlePrev} className="prv" title="上一首">上一首</a>
              <a onClick={this.handlePlay} className={ this.state.isPaused ? "ply" : "pas" } title="播放/暂停">播放/暂停</a>
              <a onClick={this.props.handleNext} className="nxt" title="下一首">下一首</a>
            </div>
            <div className="head">
              <img src={this.getMusicImg()} />
              <a href={this.getMusicPage()} hidefocus="true" className="mask"></a>
            </div>
            <div className="play">
              <div className="j-flag words">
                <a hidefocus="true" href={this.getMusicPage()} className="f-thide name fc1 f-fl" title={this.getMusicName()}>{this.getMusicName()}</a>
                <span className="by f-thide f-fl">
                  <span title={this.getArtistName()}>
                    <a className="" href={this.getArtistPage()} hidefocus="true">{this.getArtistName()}</a>
                  </span>
                </span>
              </div>
              <div className="pbar">
                <div className="barbg j-flag"
                  ref={this.setPbarRef}
                  onClick={this.handleProgressBarClicked}
                  onMouseMove={isProgressBarMouseDown ? this.handleProgressBarMouseMoved : null}
                  onMouseDown={this.handleProgressBarMouseDown}
                  onMouseUp={this.handleProgressBarMouseUp}
                >
                  <div className="rdy" style={{width: this.state.bufferedWidth}}></div>
                  <div className="cur" style={{width: this.state.currentWidth}}>
                    <span className="btn f-tdn f-alpha">
                      <i></i>
                    </span>
                  </div>
                </div>
                <span className="j-flag time"><em>{this.state.formattedCurrentTime}</em> / {this.state.formattedDuration}</span>
              </div>
            </div>
            <div className="oper f-fl">
              <a hidefocus="true" data-action="like" className="icn icn-add j-flag" title="收藏">收藏</a>
              <a hidefocus="true" data-action="share" className="icn icn-share" title="分享">分享</a>
            </div>
            <div className="ctrl f-fl f-pr j-flag">
              <VolCom 
                vbarRef={el => this.vbar = el}
                visible={this.state.isVolumeBarVisible} 
                volume={this.state.volume}
                isMouseDown={this.state.isVolumeBarMouseDown}
                onClick={this.handleVolumeBarClicked}
                onMouseDown={this.handleVolumeBarMouseDown}
                onMouseUp={this.handleVolumeBarMouseUp}
                onMouseMove={this.handleVolumeBarMouseMove}
              />
              <a hidefocus="true" data-action="volume" className="icn icn-vol" onClick={this.handleVolumeIconClicked}></a>
              <a hidefocus="true" data-action="mode" className="icn icn-loop" title="循环"></a>
              <span className="add f-pr">
                <span className="tip" style={{display: "none"}}>已开始播放</span>
                <a title="播放列表" hidefocus="true" data-action="panel" className="icn icn-list s-fc3">222</a>
              </span>
              <div className="tip tip-1" style={{display: "none"}}>循环</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioPlayer;