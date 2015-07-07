/**
 *	Put all utiilities here
 */
window.onload = function(){
    var $list  = $('td[colspan=5]'),
        fileList = [], i=0, $row=$('tr');
    for(i=0;i<$list.length;i++){
        fileList.push($list[i].textContent.split("\\").pop());
        $list.eq(i).parent().addClass("file-names");
    }
    $("select.file-list").remove();
    $(".container-fluid").prepend("<h1>Select the file name to view report</h1><select class='file-list'></select>");
    for(i=0;i<fileList.length;i++){
        $("select.file-list").append("<option class='file-name "+i+"'>"+ fileList[i] +"</option>")
    }
    $row.hide();
    $row.eq(0).show();$row.eq(1).show();
    var $fileNames = $(".file-names");
    $fileNames.eq(0).nextUntil(".file-names").show();
    $(".file-list").on("change",function(){
        var index = event.srcElement.selectedIndex;
        $("tr").hide();
        $row.eq(0).show();
        $fileNames.eq(index).show();
        $fileNames.eq(index).nextUntil(".file-names").show();
    });
}