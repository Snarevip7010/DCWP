/*
　ドローンコマンド入力画面
*/
debugger;

var seq = parseInt(0);

//サイドバー遷移処理
$(document).on('click', '[data-toggle="push-menu"]', function () {
  if (!$('body').hasClass("sidebar-collapse") && $('body').hasClass("sidebar-open")) {
      $('body').removeClass("sidebar-open");
      $('body').addClass("sidebar-collapse");
      $('body').addClass("sidebar-mini");
  //console.log('menu kapa');
  } else if($('body').hasClass("sidebar-collapse")) {
      $('body').removeClass("sidebar-collapse");
      $('body').addClass("sidebar-open");
  //console.log('menu ac');
  } else {
      $('body').addClass("sidebar-collapse");
      $('body').addClass("sidebar-open");
  }
});


//セレクトボックス変更時
function changeCommand(){
  var list = $("#commandLine select").length;
  for(var i=0; i<list; i++ ){

    var command = $('#SelectCommand'+[i]).val();
    console.log(command);
    
    //着陸・離陸字はオプションを非活性にする
    if(command == '1' || command == '2'){
      $('#InputOption' +[i]).prop("disabled", true);
      $('#sec').hide();
      $('#cm').hide();  
    }
    else {
      $('#InputOption' +[i]).prop("disabled", false);
      
      //未選択・待機以外の場合単位(cm)を表示
      if(command != '0' && command != '99'){
        $('#sec'+[i]).hide();  
        $('#cm'+[i]).show();
      }
      //待機の場合単に(秒)を表示
      else if(command == '0'){
        $('#cm'+[i]).hide();
        $('#sec'+[i]).show();
      }
      else{
        $('#sec'+[i]).hide();
        $('#cm'+[i]).hide();
      }
    }
  }
}
//form追加処理
$("#addButton").on('click', function(){
  console.log("clicked");
  var idseq = seq+parseInt(1);
  var tr_form = '' +
    '<div class="row" style="display: flex;"><tr>' +
    '<td><select id="SelectCommand'+ idseq +'" class="form-control col-6" style="margin-top:30px;" onchange="changeCommand()">' +
    '<option value=99>コマンドを選択</option>' +
    '<option value=1>離陸</option>' +
    '<option value=2>着陸</option>' +
    '<option value=3>前進</option>' +
    '<option value=4>後退</option>' +
    '<option value=5>右へ</option>' +
    '<option value=6>左へ</option>' +
    '<option value=0>待機</option>' +
    '</select></td>' +
    '<td><input type="text" id="InputOption'+ idseq +'" class="form-control col-5" style="margin-top:30px;">' +
    '<p id="cm'+ idseq +'" style="display :none; margin: 40px 0px 0px 0px;" >(cm)</p>' +
    '<p id="sec'+ idseq +'" style="display : none; margin: 40px 0px 0px 0px;" >(秒)</p></td>' +
  '</tr></div>';

  $(tr_form).appendTo($('#commandLine'));
  seq = idseq;
});
 
$("#downloadBtn").on('click', function(){
  downloadPyFile();
});

function downloadPyFile(){
  var list = $("#commandLine select").length;
  var array_temp = [];
  for(var i=0; i<list; i++ ){
    var command = $("#SelectCommand" +[i]).val();
    var commandOpt = $("#InputOption" +[i]).val();
    array_temp.push(command, " ", commandOpt, '\r\n');
    console.log(array_temp);
  }
  var array_data = [array_temp];
 // BOM の用意（文字化け対策）
 var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);  

 // CSV データの用意
 var command_data = array_data.map(function(l){return l.join('')}).join('\r\n');

 var blob = new Blob([bom, command_data], { type: 'text/txt' });

 var url = (window.URL || window.webkitURL).createObjectURL(blob);

 var a = document.getElementById('downloader');
 a.download = 'command.txt';
 a.href = url;

 // ダウンロードリンクをクリックする
 $('#downloader')[0].click();

}