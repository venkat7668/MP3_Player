/**
 * Created by venkat on 7/10/2015.
 */

controllers.controller("playerCTRL",function($scope,playerEvents){
    $scope.tracks = [];

    $scope.loadFiles = function(tracks, cb){
        var i = 0,
            len = tracks.length,
            num_loaded_tracks = 1;
        for(; i<len; i+=1){
            ID3.loadTags(tracks[i].name, (function(track){
                return function(/*err, tags*/){
                    //pushing tracks to $scope.tracks
                    var tags = ID3.getAllTags(track.name);
                    console.log(tags);
                    $scope.tracks.push({
                        "title": tags.title || "N/A",
                        "artist": tags.artist || "N/A",
                        "album": tags.album || "N/A",
                        "file": track.name,
                        "track": track,
                        "image": $scope.baseURL(tags.picture || null)
                    });
                    $scope.$apply();
                    num_loaded_tracks += 1;
                    if(num_loaded_tracks === len && cb){
                        cb.call($scope, num_loaded_tracks);
                    }
                }
            })(tracks[i]), {
                tags: ["title","artist","album","picture"],
                dataReader: FileAPIReader(tracks[i])
            });
        }
    };
    $scope.baseURL = function(image){
        if (image) {
            var base64String = "";
            for (var i = 0; i < image.data.length; i++) {
                base64String += String.fromCharCode(image.data[i]);
            }
            var base64 = "data:" + image.format + ";base64," + window.btoa(base64String);
            return base64;
        }
    };
    $scope.play = playerEvents.play;

    $scope.init = function (){
        //app init
        //files browse event listener
        $("#tracksSelect").on("change", function(e){
            var tracksArr = Array.prototype.slice.call(e.target.files);
            $scope.loadFiles(tracksArr, function(e){
                console.log(this);
            });
        });
    }
});