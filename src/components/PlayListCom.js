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

  return (
    <li className={props.isPlaying ? "z-sel" : ""} data-id={id} data-action="play" onClick={handleChooseMusic}>
      <div className="col col-1">
        {props.isPlaying ? <div className="playicn" /> : null}
      </div>
      <div className="col col-2">{name}</div>
      <div className="col col-3">
        <div className="icns">
          <i className="ico icn-del" title="删除" data-id={id} data-action="delete">删除</i>
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

function PlayListCom(props) {

  if (!props.isVisible) {
    return null;
  }

  let getBlurImg = (img_id) => {
    return "https://music.163.com/api/img/blur/" + img_id;
  };

  return (
    <div className="list" id="g_playlist">
      <div className="listhd">
        <div className="listhdc">
          <h4>播放列表(<span className="j-flag">{props.musicList.length}</span>)</h4>
          <a href="javascript:;" className="addall" data-action="likeall"><span className="ico ico-add"></span>收藏全部</a><span className="line"></span>
          <a href="javascript:;" className="clear" data-action="clear"><span className="ico icn-del"></span>清除</a>
          <p className="lytit f-ff0 f-thide j-flag">So Cute~</p>
          <span className="close" data-action="close">关闭</span>
        </div>
      </div>
      <div className="listbd">
        <img className="imgbg j-flag" src={getBlurImg(props.musicList[props.currentIndex].img_id)} style={{top: "-360px"}} />
        <div className="msk" />
        <div className="listbdc j-flag" >
          <ul className="f-cb">
            {props.musicList.map((item, idx) => {
              return <PlayListSongItemCom key={idx} music={item} idx={idx} isPlaying={idx === props.currentIndex} onChooseMusic={props.onChooseMusic}/>
            })}
          </ul>
        </div>
        <div className="bline j-flag" >
          <span className="scrol" hidefocus="true" style={{height: "260px", display: "none", top: "0px"}}></span>
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
          <span className="scrol scrol-1 j-flag" hidefocus="true" style={{height: "260px", display: "none", top: "0px"}}></span>
        </div>
      </div>
    </div>
  );
}

export default PlayListCom;