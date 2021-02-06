/*
　ドローンコマンド入力画面
*/


var options = [
  ['20','30','40','50','60','70','80','90','100','200','300','400','500'],
  ['5', '10', '15','20'],
];

//セレクトボックス変更時
$('#SelectCommand').change(function() {
 
    console.log("OK")
    var command = $('#SelectCommand').val();
    
    console.log(command);
    
    var select_cm = $('SelectCommand')
    var select_op = $('SelectOption')
    var selected_cm = select_cm.val();
    
    $('#SelectOption option').remove();
    
    if(selected_cm != '0' && selected_cm != '99'){
        $('#cm').show();
    }


})
    