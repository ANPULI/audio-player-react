import React from 'react'
import '../assets/css/audio-player.css'

function PlayListCom(props) {

  if (!props.isVisible) {
    return null;
  }

  return (
    <div className="list" id="g_playlist">
      <div className="listhd">
        <div className="listhdc">
          <h4>播放列表(<span className="j-flag">2</span>)</h4>
          <a href="javascript:;" className="addall" data-action="likeall"><span className="ico ico-add"></span>收藏全部</a><span className="line"></span>
          <a href="javascript:;" className="clear" data-action="clear"><span className="ico icn-del"></span>清除</a>
          <p className="lytit f-ff0 f-thide j-flag">So Cute~</p>
          <span className="close" data-action="close">关闭</span>
        </div>
      </div>
      <div className="listbd">
        <img className="imgbg j-flag" src="//music.163.com/api/img/blur/17999005346907556" style={{top: "-360px"}} />
        <div className="msk" />
        <div className="listbdc j-flag" >
          <ul className="f-cb">
            <li data-id="494064179" data-action="play">
              <div className="col col-1"></div>
                <div className="col col-2">柴 鱼 の c a l l i n g【已售】</div>
                  <div className="col col-3">
                    <div className="icns">
                      <i className="ico icn-del" title="删除" data-id="494064179" data-action="delete">删除</i>
                      <i className="ico ico-dl" title="下载" data-id="494064179" data-action="download">下载</i>
                      <i className="ico ico-share" title="分享" data-id="494064179" data-action="share">分享</i>
                      <i className="j-t ico ico-add" title="收藏" data-id="494064179" data-action="like">收藏</i>
                    </div>
                  </div>
                <div className="col col-4">
                <span title="幸子小姐拜托了">
                  <a className="" href="/artist?id=12490212" hidefocus="true">幸子小姐拜托了</a>
                </span>
              </div>
              <div className="col col-5">02:31</div>
              <div className="col col-6">
                <a href="javascript:;" className="ico ico-src ico-src-dis" title="暂无来源" data-action="link">来源</a>
              </div>
            </li>
            <li className="z-sel" data-id="433107530" data-action="play"><div className="col col-1"><div className="playicn"></div></div><div className="col col-2">So Cute~</div><div className="col col-3"><div className="icns"><i className="ico icn-del" title="删除" data-id="433107530" data-action="delete">删除</i><i className="ico ico-dl" title="下载" data-id="433107530" data-action="download">下载</i><i className="ico ico-share" title="分享" data-id="433107530" data-action="share">分享</i><i className="j-t ico ico-add" title="收藏" data-id="433107530" data-action="like">收藏</i></div></div><div className="col col-4"><span title="Lopu$"><a className="" href="/artist?id=12027465" hidefocus="true">Lopu$</a></span></div><div className="col col-5">03:04</div><div className="col col-6"><a href="javascript:;" className="ico ico-src ico-src-dis" title="暂无来源" data-action="link">来源</a></div></li>
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