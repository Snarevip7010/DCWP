/*
　ドローンコマンド入力画面
*/
debugger;

//セレクトボックス変更時
$('#SelectCommand').change(function() {
 
    var command = $('#SelectCommand').val();
    console.log(command);
    
    //着陸・離陸字はオプションを非活性にする
    if(command == '1' || command == '2'){
      $('#SelectOption').prop("disabled", true);
      $('#sec').hide();
      $('#cm').hide();  
    }
    else {
      $('#SelectOption').prop("disabled", false);
      
      //未選択・待機以外の場合単位(cm)を表示
      if(command != '0' && command != '99'){
        $('#sec').hide();  
        $('#cm').show();
      }
      //待機の場合単に(秒)を表示
      else if(command == '0'){
        $('#cm').hide();
        $('#sec').show();
      }
      else{
        $('#sec').hide();
        $('#cm').hide();
      }
    }


})
 
$("#downloadBtn").on('click', function(){
  console.log("clicked");

  
  downloadPyFile();

});

function downloadPyFile(){
  var command = $("#SelectCommand").val();
  var commandOpt = $("#SelectOption").val();
  console.log(commandOpt);
 // 配列 の用意
 var array_data = [[command, commandOpt]];

 // BOM の用意（文字化け対策）
 var bom = new Uint8Array([0xEF, 0xBB, 0xBF]);  

 // CSV データの用意
 var command_data = array_data.map(function(l){return l.join(' ')}).join('\r\n');

 var blob = new Blob([bom, command_data], { type: 'text/txt' });

 var url = (window.URL || window.webkitURL).createObjectURL(blob);

 var a = document.getElementById('downloader');
 a.download = 'command.txt';
 a.href = url;

 // ダウンロードリンクをクリックする
 $('#downloader')[0].click();
}