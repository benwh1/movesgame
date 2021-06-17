class MovesGameSolver{
    constructor(){
        this.worker = new Worker("worker.js");
        this.ready = false;

        var that = this;
        this.worker.addEventListener("message",
            function(d){
                var msg = d.data;

                if(msg["message"] == "ready"){
                    that.ready = true;
                    var previous = msg["previous"];
                    if(previous != undefined){
                        if(previous["message"] == "goodMoves"){
                            that.resolve(that.goodMoves);
                        }
                    }
                }
                else if(msg["message"] == "goodMoves"){
                    that.goodMoves = msg["goodMoves"];
                }
            },
        false);
    }

    solve(scramble){
        if(!this.ready){
            return;
        }

        this.ready = false;
        this.goodMoves = "";

        var that = this;
        this.promise = new Promise(function(resolve, reject){
            that.resolve = resolve;
            that.reject = reject;
        });

        this.worker.postMessage({message: "goodMoves", scrambles: [scramble]});

        return this.promise;
    }
}
