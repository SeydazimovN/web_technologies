var pen_now = true, eraser_now = false, pouring_now = false;
function on_pen() {
  pen_now = true; eraser_now = false; pouring_now = false;
}
function on_eraser() {
  pen_now = false; eraser_now = true; pouring_now = false;
}
function on_pouring() {
  pouring_now = true; pen_now = false; eraser_now = false;
}

var globX = -1, globY = -1;

var uploadItem = function(canvas, item){
  var cnt = canvas.getContext('2d');
  var parent = $(canvas).parent();
  var fileReader = new FileReader();

  fileReader.onload = function(e){
    var img = new Image();
    img.src = e.target.result;
    img.onload = function(){
      var left = (parseInt(parent.css('width'))-img.width)/2;
      var top  = (parseInt(parent.css('height'))  -img.height)/2;
      top < 0 ? top = 0: top = top;
      left < 0 ? left = 0 : left = left;
      // $(canvas).css({
      //   marginLeft : left,
      //   marginTop  : top
      // });
      canvas.width  = img.width;
      canvas.height = img.height;
      cnt.drawImage(img, 0, 0, img.width, img.height);
    };
  };

  fileReader.readAsDataURL(item);
};


var laplasK = [[0, 1, 0], [1, 4, 1], [0, 1, 0]];
var sobelxK = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
var sobelyK = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];
var sharpenK = [[-1, -1, -1], [-1,  9, -1], [-1, -1, -1]];
var embossK = [[ 2,  0,  0], [ 0, -1,  0], [ 0,  0, -1]];
var box_blur_kernel = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
var gaussian_blur_kernel = [[1, 2, 1], [2, 4, 2], [1, 2, 1]];
var edge1_kernel = [[1, 0, -1], [0, 0, 0], [-1, 0, 1]];
var edge2_kernel = [[0, 1, 0], [1, -4, 1], [0, 1, 0]];
var edge3_kernel = [[-1, -1, -1], [-1, 8, -1], [-1, -1, -1]];

function getPos(x, y) {
  var pos = y * canvas.width + x;
  return pos * 4; 
}

function inBoard(x, y) {
  if (0 <= x && x < canvas.width)
  if (0 <= y && y < canvas.height)
    return true;
  return false;
}

var mat;


function makeFilter(sp, offset, tot) {
    var cnt = 0;
    function changeCell(x, y) {
      var red = 0, green = 0, blue = 0;
      for (var i = x - 1, kx = 0; i <= x + 1; ++i, ++kx) {
        for (var j = y - 1, ky = 0; j <= y + 1; ++j, ++ky) {
          if (inBoard(i, j)) {
            var pos = getPos(i, j);
            red += sp[pos] * mat[kx][ky];
            green += sp[pos + 1] * mat[kx][ky];
            blue += sp[pos + 2] * mat[kx][ky];            
          }
        }
      }
      var pos = getPos(x, y);
      sp[pos] = parseInt((red + offset) / tot, 10);
      sp[pos + 1] = parseInt((green + offset) / tot, 10);
      sp[pos + 2] = parseInt((blue + offset) / tot, 10);
      for (var u = pos; u < pos + 3; ++u) sp[u] = Math.min(255, sp[u]);
      for (var u = pos; u < pos + 3; ++u) sp[u] = Math.max(0, sp[u]);        
    }
    for (var i = 0; i < canvas.height; ++i) {
      for (var j = 0; j < canvas.width; ++j) {
        changeCell(i, j);
      }
    }
    console.log(cnt);
    return sp;
}

var new_sp;
var used = new Array(3000);
for (var i = 0; i < 3000; i++) {
  used[i] = new Array(3000);
}

function init() {
  CNT = 0;
  for (var i = 0; i < 3000; ++i) 
    for (var j = 0; j < 3000; ++j) used[i][j] = false;
  redC = 255; greenC = 0; blueC = 0;
}
var redC = 0, greenC, blueC = 0;

function colorEqual(x, y) {
  var pos = getPos(x, y);
  if (new_sp[pos] == redC)
  if (new_sp[pos + 1] == greenC)
  if (new_sp[pos + 2] == blueC)
    return true;
  return false;    
}

function setColor(pos) {
  new_sp[pos] = redC;
  new_sp[pos + 1] = greenC;
  new_sp[pos + 2] = blueC;    
}

var dx = [-1, 0, 1, 0];
var dy = [0, -1, 0, 1]

function dfs(x, y) {
  used[x][y] = true;
  var pos = getPos(x, y);
  setColor(pos);
  for (var i = 0; i < 4; ++i) {
    nx = x + dx[i]; ny = y + dy[i];
    if (inBoard(nx, ny)) {
      if (used[nx][ny] == false && colorEqual(nx, ny) == false)
          dfs(nx, ny);
    }
  }
}

var filters = {
  inverse: function(imgData){
    var sp = imgData;
    var ll = function(vl){
      return 255 - vl;
    };
    for(var i = 0; i < imgData.length; i+=4){
      sp[i] = ll(sp[i]);
      sp[i+1] = ll(sp[i+1]);
      sp[i+2] = ll(sp[i+2]);
    }
    return sp;
  },

  noise: function(imgData){
    var sp = imgData;
    var coefficient = 0.02;
    var ll = function(vl){
      var g_VALUE = Math.random()*100;
      if(g_VALUE <= coefficient*100){
        if(Math.floor(Math.random()*25) == 2)
          return 255;
        else
          return vl;
      }
      return vl;
    };

    for(var i = 0; i < imgData.length; i+=4){
      sp[i] = ll(sp[i]);
      sp[i+1] = ll(sp[i+1]);
      sp[i+2] = ll(sp[i+2]);
    }
    return sp;
  },

  treshold: function(imgData){
    var sp = imgData;
    var ll = function(vl){
    	return vl>128?0:255;
    };
    for(var i = 0; i < imgData.length; i+=4){
      var mean = (sp[i] + sp[i+1] + sp[i+2])/3;
      sp[i] = ll(mean);
      sp[i+1] = ll(mean);
      sp[i+2] = ll(mean);
    }
    return sp;
  },

  laplas: function(imgData) {
    var sp = imgData;
    mat = laplasK;
    return makeFilter(sp, 0, 9);
  },

  sobelX: function(imgData) {
    var sp = imgData;
    mat = sobelxK;
    return makeFilter(sp, 0, 1);
  },
  sobelY: function(imgData) {
    var sp = imgData;
    mat = sobelyK;
    return makeFilter(sp, 0, 1);
  },
  sharpen: function(imgData) {
    var sp = imgData;
    mat = sharpenK;
    return makeFilter(sp, 0, 1);
  },
  emboss: function(imgData) {
    var sp = imgData;
    mat = embossK;
    return makeFilter(sp, 127, 1);
  },
  box_blur: function(imgData) {
    var sp = imgData;
    mat = box_blur_kernel;
    return makeFilter(sp, 0, 9);
  },
  
  edge_1: function(imgData) {
    var sp = imgData;
    mat = edge1_kernel;F
    return makeFilter(sp, 0, 1);
  },
  edge_2: function(imgData) {
    var sp = imgData;
    mat = edge2_kernel;
    return makeFilter(sp, 0, 1);
  },
  edge_3: function(imgData) {
    var sp = imgData;
    mat = edge3_kernel;
    return makeFilter(sp, 0, 1);
  },  

  gaussian_blur: function(imgData) {
    var sp = imgData;
    mat = gaussian_blur_kernel;
    return makeFilter(sp, 0, 16);
  },

  sepia: function(imgData){
    var sp = imgData;
    for(var i = 0; i < imgData.length; i+=4){
      var r = sp[i];
      var g = sp[i + 1];
      var b = sp[i + 2];
      sp[i]= (r * 0.393)+(g * 0.769)+(b * 0.189); 
      sp[i + 1] = (r * 0.349)+(g * 0.686)+(b * 0.168); 
      sp[i + 2] = (r * 0.272)+(g * 0.534)+(b * 0.131); 
    }
    return sp;
  },
  brightness: function(imgData){
    var sp = imgData;
    var adjustment=20;
    for(var i = 0; i < imgData.length; i+=4){
      sp[i] += adjustment;
      sp[i+1] += adjustment;
      sp[i+2] += adjustment;
    }
    return sp;
  },
  grayscale: function(imgData){
    var sp = imgData;
    var adj=5;
    for(var i = 0; i < imgData.length; i+=4){
      var r = sp[i];
      var g = sp[i+1];
      var b = sp[i+2];
      var v = 0.2126*r + 0.7152*g + 0.0722*b;
      sp[i] = sp[i+1] = sp[i+2] = v
    }
    return sp;
  },
  bfs: function(imgData) {
    var sp = imgData;
    console.log(globX, ' ', globY);
    init();
    
    new_sp = sp;
    dfs(globX, globY);
    
    /*for(var i = 0; i < imgData.length; i+=4){
      new_sp[i] = 25;
      new_sp[i+1] = 50;
      new_sp[i+2] = 100;
    }
    */

    return new_sp;
  }
};

var draw = function(canvas, imgData){
  var cont = canvas.getContext('2d');
  var currImgData = cont.getImageData(0, 0, canvas.width, canvas.height);
  for(var i = 0; i < currImgData.data.length; i += 4){
    currImgData.data[i]   = imgData[i];
    currImgData.data[i+1] = imgData[i+1];
    currImgData.data[i+2] = imgData[i+2];
  }
  cont.putImageData(currImgData, 0, 0);
};

var process = function(filterCallback, canvas){
  var imgData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
  var tmp = filterCallback(imgData.data);
  draw(canvas, tmp);
};

var run = function(canvas){
  $('.dropzone').on('dragleave', function(e){
    $(this).removeClass('dragging');
    return false;
  })
  .on('drop', function(e){
    $(this).addClass('dropped');

    var originalEvent = e.originalEvent;
    var dataTransfer  = originalEvent.dataTransfer;
    var files = dataTransfer.files || [];

    // for(var i = 0; i < files.length; i++)
    //   uploadItem(canvas, files[i]);

    uploadItem(canvas, files[0]);

    return false;
  })
  .on('dragover', function(e){
    $(this).addClass('dragging');
    return false;
  });

  var isDrawing = false;
  var oldX = null,
    oldY = null;

  var drawPoint = function(x, y){
    // How we get context?
    var context = $('canvas')[0].getContext('2d');
    context.lineJoin = "round";
    context.lineWidth = 1;

    if (pouring_now) {
      console.log("GLOB", x, ' ', y);
      console.log(canvas.width, canvas.height);
      globX = x;  globY = y;
      redC = 255; greenC = 0; blueC = 0;
      // bfs(x, y);
    }

    else {
      context.beginPath();
      var color = (pen_now) ? "#ff0000" : "#ffffff";
      context.strokeStyle = color;

      context.moveTo(oldX || x, oldY || y);
      context.lineTo(x, y);

      var sz = (pen_now) ? 5 : 10;
      context.lineWidth = sz;
      
      context.closePath();
      context.stroke();

      oldX = x;
      oldY = y;
    }
  };

  canvas.height = 300;
  canvas.width = 610;

  $(canvas).on('mousedown', function(e){
    isDrawing = true;
    drawPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
  }).on('mouseup', function(e){
    isDrawing = false;
    drawPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    oldX = null;
    oldY = null;
  }).on('mousemove', function(e){
    if(isDrawing){
      drawPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    }
  });
};

$(document).ready(function(){
  var canvas = $('#canvas');
  run(canvas[0]);

  // Когда пользователь нажимает на кнопку
  $('.js-button-action').click(function(){
    var filter = $(this).data('filter');
    process(filters[filter], $('#canvas')[0]);
  });
});
