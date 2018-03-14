'use strict';

var config = {
  'jquery': '//cdn.bootcss.com/jquery/2.1.0/jquery.min.js',
  'jquery_lazyload': '//cdn.bootcss.com/jquery.lazyload/1.9.1/jquery.lazyload.min.js',
  'img_placeholder': 'https://ws4.sinaimg.cn/large/e724cbefgw1etyppy7bgwg2001001017.gif'
}

if (hexo.config.image_stream) {
  for (var key in config) {
    if (hexo.config.image_stream[key] != null) {
      config[key] = hexo.config.image_stream[key];
    }
  }
}

var imgIndex = 0;
var imgArray = [];
var imgstyle = 'padding-bottom:0;margin-bottom:0;';
var boxshadow = 'box-shadow:0 1px 2px rgba(34,25,25,0.4);';

hexo.extend.tag.register('stream', function(args, content){
  console.warn(`stream args length: ${args.length}`);
  var result = '';
  if (config['jquery']) {
    result += '<script src="' + config['jquery'] + '"></script>';
  }
  if (config['jquery_lazyload']) {
    result += '<script src="' + config['jquery_lazyload'] + '"></script>';
  }
  result += '<div class="hexo-img-stream">';
  result += '<style type="text/css">';
  console.warn('calling stream image callbacks.. to generate html/scripts codes..');

  result += `.hexo-image-steam-lazy {display:block;}.hexo-img-stream{display:flex;flex-wrap:wrap;width:100%;max-width:1100px;margin:3% auto}
      div.hexo-img-stream .col figure{background:#fefefe;margin:8px 10px;}
      div.hexo-img-stream .col figure img{${imgstyle}}
      div.hexo-img-stream small{font-size:1rem;float:right;text-transform:uppercase;color:#aaa}
      div.hexo-img-stream small a{color:#666;text-decoration:none;transition:.4s color}
      @media screen and (max-width:750px){.hexo-img-stream{column-gap:0}
        .hexo-img-stream .col{width:98%}}
      @media screen and (min-width:750px){.hexo-img-stream .col{width:46%;}}  
        `;
      
  result += '</style>';
  console.warn(`Got imgIndex: ${imgIndex}`)
  result += '<div class="col">' + imgArray.slice(0, imgIndex/2 + 1).join(" ") + '</div>';
  result += '<div class="col">' + imgArray.slice(imgIndex/2 + 1).join(" ") + '</div>';
  result += '</div>';
  return result;
}, {ends: true});

hexo.extend.tag.register('figure', function(args){
  // read imgUrl from args..
  imgIndex += 1;
  var imgUrl = args.shift();
  var title = args.join(' ');
  var placeholder = config['img_placeholder'];

  // when reading {% figure ... %}
  var result = '<figure>';
  result += '<img class="hexo-image-steam-lazy nofancy" src="' + imgUrl + '" alt="' + title + '" title="' + title + '"/>';
  result += '</figure>';
  imgArray.push(result);
  return result;
});
