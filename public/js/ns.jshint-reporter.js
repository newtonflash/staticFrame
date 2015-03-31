/**
 *	Put all utiilities here
 */
window.onload = function(){
        var list  = document.getElementsByClassName('file-name');
        console.log(list);
        var filelist = document.getElementsByTagName('ul')[0];
        console.log(filelist);
        for (i=0;i<list.length;i++){
            console.log(list[i].outerText);
            var listitem = document.createElement("li");
            var textitem = document.createTextNode(list[i].textContent.split("\\").pop());
            listitem.appendChild(textitem);
            filelist.appendChild(listitem);
            listitem.setAttribute("class",i);
        }
        $("tr").hide();
        $("tr").eq(0).show();
        $(".file-name").eq(0).nextUntil( ".file-name" ).show();
        $(".results h2").eq(0).html("File Name Selected :: "+list[0].textContent.split("\\").pop());
        
        $("li").on("click", function(event){
            $(".results h2").eq(0).html("File Name Selected :: "+event.target.textContent.split("\\").pop());
            var index = parseInt(event.target.getAttribute("class"));
            $("tr").hide();
            $("tr").eq(0).show();
            $(".file-name").eq(index).nextUntil( ".file-name" ).show(); 
        })
}