/*
　ドローンコマンド入力画面
*/
debugger;
//全般見直し複数のフォームができるのでリストで回さないとダメ。
//セレクトボックス変更時
$('#SelectCommand').change(function() {
 
    var command = $('#SelectCommand').val();
    console.log(command);
    
    //着陸・離陸字はオプションを非活性にする
    if(command == '1' || command == '2'){
      $('#InputOption').prop("disabled", true);
      $('#sec').hide();
      $('#cm').hide();  
    }
    else {
      $('#InputOption').prop("disabled", false);
      
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
//form追加処理
$("#addButton").on('click', function(){
  console.log("clicked");
  var tr_form = '' +
    '<div class="row" style="display: flex;"><tr>' +
    '<td><select id="SelectCommand[]" class="form-control col-6" style="margin-top:30px;">' +
    '<option value=99>コマンドを選択</option>' +
    '<option value=1>離陸</option>' +
    '<option value=2>着陸</option>' +
    '<option value=3>前進</option>' +
    '<option value=4>後退</option>' +
    '<option value=5>右へ</option>' +
    '<option value=6>左へ</option>' +
    '<option value=0>待機</option>' +
    '</select></td>' +
    '<td><input type="text" id="InputOption[2]" class="form-control col-5" style="margin-top:30px;">' +
    '<p id="cm" style="display :none; margin: 40px 0px 0px 0px;" >(cm)</p>' +
    '<p id="sec" style="display : none; margin: 40px 0px 0px 0px;" >(秒)</p></td>' +
  '</tr></div>';

  $(tr_form).appendTo($('#commandLine'));
});
 
$("#downloadBtn").on('click', function(){
  console.log("clicked");

  
  downloadPyFile();

});

function downloadPyFile(){
  var command = $("#SelectCommand").val();
  var commandOpt = $("#InputOption").val();
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