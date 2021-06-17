var ready = false;

var Module = {
    "onRuntimeInitialized": function(){
        var initialize = Module.cwrap("init", "void");

        postMessage({message: "initializing"});
        initialize();
        ready = true;
        postMessage({message: "ready"});
    }
};

importScripts("solver.js");

this.addEventListener("message",
    function(d){
        if(!ready){
            return;
        }

        ready = false;

        var msg = d.data;

        if(msg["message"] == "scramble"){
            var generateScramble = Module.cwrap("generateScramble", "string");
            var n = msg["amount"];
            for(var i=0; i<n; i++){
                var scramble = generateScramble();
                postMessage({message: "scramble", scramble: scramble, index: i});
            }
        }
        else if(msg["message"] == "random"){
            var randomState = Module.cwrap("randomState", "string");
            var n = msg["amount"];
            for(var i=0; i<n; i++){
                var state = randomState();
                postMessage({message: "random", scramble: state, index: i});
            }
        }
        else if(msg["message"] == "solve"){
            var solve = Module.cwrap("solveScramble", "string", ["string"]);
            var scrambles = msg["scrambles"];
            var n = scrambles.length;
            for(var i=0; i<n; i++){
                var scramble = scrambles[i];
                var solution = solve(scramble);
                postMessage({message: "solve", scramble: scramble, solution: solution});
            }
        }
        else if(msg["message"] == "goodMoves"){
            var goodMoves = Module.cwrap("goodMoves", "string", ["string"]);
            var scrambles = msg["scrambles"];
            var n = scrambles.length;
            for(var i=0; i<n; i++){
                var scramble = scrambles[i];
                var solutions = goodMoves(scramble).split("\n");
                var moves = "";
                for(var j=0; j<solutions.length; j++){
                    moves += solutions[j][0];
                }
                postMessage({message: "goodMoves", scramble: scramble, goodMoves: moves});
            }
        }
        else{
            console.log("Bad message: " + JSON.stringify(d.data));
        }

        ready = true;
        postMessage({message: "ready", previous: msg});
    },
false);
