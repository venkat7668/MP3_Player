/**
 * Created by venkat on 7/10/2015.
 */
services.service("playerEvents", function(){
    this.play = function(url){
        //var url = $(el).data('file');
        $("#player").attr("src", getFileUrl(url, this))[0].play();
    };
    var getFileUrl = function(fileName, scope){
        var file;
        for (var i = 0; i < scope.tracks.length; i++) {
            if (scope.tracks[i].file == fileName) {
                file = scope.tracks[i].track;
                break;
            }
        }
        return window.URL.createObjectURL(file);
    };
});