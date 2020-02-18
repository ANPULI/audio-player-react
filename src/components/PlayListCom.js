import React from 'react'
import '../assets/css/audio-player.css'

function PlayListSongItemCom(props) {

  let id = props.music.id,
      name = props.music.name,
      artistName = props.music.artist.name,
      artistUrl = props.music.artist.url,
      time = new Date(props.music.duration).toISOString().substring(14, 19);

  let handleChooseMusic = () => {
    props.onChooseMusic(props.idx);
  }

  let handleDeleteMusic = () => {
    props.onDeleteMusic(props.idx);
  }

  return (
    <li className={props.isPlaying ? "z-sel" : ""} data-id={id} data-action="play" onClick={handleChooseMusic}>
      <div className="col col-1">
        {props.isPlaying ? <div className="playicn" /> : null}
      </div>
      <div className="col col-2">{name}</div>
      <div className="col col-3">
        <div className="icns">
          <i className="ico icn-del" title="删除" data-id={id} data-action="delete" onClick={handleDeleteMusic}>删除</i>
          <i className="ico ico-dl" title="下载" data-id={id} data-action="download">下载</i>
          <i className="ico ico-share" title="分享" data-id={id} data-action="share">分享</i>
          <i className="j-t ico ico-add" title="收藏" data-id={id} data-action="like">收藏</i>
        </div>
      </div>
      <div className="col col-4">
        <span title={artistName}>
          <a className="" href={artistUrl} hidefocus="true">{artistName}</a>
        </span>
      </div>
      <div className="col col-5">{time}</div>
      <div className="col col-6">
        <a href="javascript:;" className="ico ico-src ico-src-dis" title="暂无来源" data-action="link">来源</a>
      </div>
    </li>
  );
}

class PlayListCom extends React.Component {

  constructor(props) {
    
    super(props);
    this.state = {
      scrollThumbTop: "0px",
    };
    this.listbdcRef = React.createRef();
    this.scrollThumbRef = React.createRef();
  }



  

  getBlurImg = (img_id) => {
    return "https://music.163.com/api/img/blur/" + img_id;
  };

  handleScroll = (event) => {
    let list = this.listbdcRef.current;
    let portion = list.scrollTop / (list.scrollHeight - list.clientHeight);
    
    let scrollThumbTop = portion * (260 - this.props.musicList.length) + "px";

    this.setState((state) => {
      return {
        scrollThumbTop: scrollThumbTop
      }
    })
  }

  handleThumbClick = (event) => {
    let list = this.listbdcRef.current;
    this.listbdcRef.current.scrollTop = (260 - this.scrollThumbRef.current.scrollTop) / 260 * (list.scrollHeight - list.clientHeight)
  }

  render() {
    if (!this.props.isVisible) {
      return null;
    }
    return (
    <div className="list" id="g_playlist">
      <div className="listhd">
        <div className="listhdc">
          <h4>播放列表(<span className="j-flag">{this.props.musicList ? this.props.musicList.length : 0}</span>)</h4>
          <a href="javascript:;" className="addall" data-action="likeall"><span className="ico ico-add"></span>收藏全部</a><span className="line"></span>
          <a href="javascript:;" className="clear" data-action="clear" onClick={this.props.onDeleteAllMusic}><span className="ico icn-del"></span>清除</a>
          <p className="lytit f-ff0 f-thide j-flag">{this.props.musicList ? this.props.musicList[this.props.currentIndex].name : ""}</p>
          <span className="close" data-action="close">关闭</span>
        </div>
      </div>
      <div className="listbd">
        <img className="imgbg j-flag" src={this.getBlurImg(this.props.musicList ? this.props.musicList[this.props.currentIndex].img_id : "")} style={{top: "-360px"}} />
        <div className="msk" />
        <div className="listbdc j-flag" ref={this.listbdcRef} onScroll={this.handleScroll}>
          <ul className="f-cb">
            {this.props.musicList ? this.props.musicList.map((item, idx) => {
              return <PlayListSongItemCom key={idx} music={item} idx={idx} isPlaying={idx === this.props.currentIndex} onChooseMusic={this.props.onChooseMusic} onDeleteMusic={this.props.onDeleteMusic}/>
            }) : null}
          </ul>
        </div>
        <div className="bline j-flag" >
          <span className="scrol" hidefocus="true" style={{height: 2600 / this.props.musicList.length + "px", display: "block", top: this.state.scrollThumbTop}} ref={this.scrollThumbRef} onClick={this.handleThumbClick}></span>
        </div>
        <div className="ask j-flag">
          <a className="ico ico-ask"></a> 
        </div>
        <div className="upload j-flag" style={{display: "none"}}>
          <a data-action="close" href="/lyric/report?id=433107530">歌曲报错</a>
        </div>
        <div className="msk2"></div>
        <div className="listlyric j-flag">
          <div className="nocnt nolyric">
            <span className="s-fc4">纯音乐，无歌词</span>
          </div>
        </div>
        <div className="bline bline-1 j-flag">
          <span className="scrol scrol-1 j-flag" hidefocus="true" style={{height: "260px", display: "none", top: this.state.scrollThumbTop}}></span>
        </div>
      </div>
    </div>
  );
}}

export default PlayListCom;