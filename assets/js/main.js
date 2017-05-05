var crystal = {
    //target number to reach
    target: 0,
    //current score
    score: 0,
    //each buttons value it increases by
    gem: [0, 0, 0, 0],
    //win loss count
    win: 0,
    loss: 0,
    setGem: function() {
        //1-12
        for (var i = 0; i < this.gem.length; i++) {
            this.setGemNum(i);
        }
    },
    setGemNum: function(index) {
        this.gem[index] = Math.floor((Math.random() * 11) + 1);
        for (var i = 0; i < this.gem.length; i++) {
            if (this.gem[i] === this.gem[index] && index !== i) {
                this.setGemNum(index);
                return
            }
        }

    },
    setTarget: function() {
        //19-120 0-101+19
        this.target = Math.floor((Math.random() * 101) + 19);
        $("#targetNumber").html(this.target);
    },
    scoreCheck: function() {
        if (this.score < this.target) {
            return;
        } else if (this.score > this.target) {
            this.loss += 1;
            this.updateWins();
            this.restartBtn("You Lose Press Restart to try agian")
        } else if (this.score === this.target) {
            this.win += 1;
            this.updateWins();
            this.restartBtn("You Win!! Press Restart to play agian")
        }
    },
    updateScore: function() {
        $("#scoreTotal").text(this.score);
    },
    updateWins: function() {
        $("#winCount").text(this.win);
        $("#lossCount").text(this.loss);

    },
    restartBtn: function(msg) {
        for (var i = 0; i < this.gem.length; i++) {
            $("#gemImg" + i).unbind();
        }
        var item = $("<div>");
        item.addClass("gameInfo");
        item.append($("<h1>").text(msg));
        item.append($("<button>").attr("type", "button").attr("id", "restart").text("Restart"));
        $("#gameLog").append(item);
        $("#restart").on("click", function() {
            crystal.gameSetup();
            crystal.score = 0;
            crystal.updateScore();
            $("#gameLog").html("");
        })
    },
    gameSetup: function() {
        this.setGem();
        this.setTarget();
        this.updateScore();
        for (let i = 0; i < this.gem.length; i++) {
            $("#gemImg" + i).on("click", function() {
                crystal.score += crystal.gem[i];
                crystal.updateScore();
                crystal.scoreCheck();
            })

        }
    }


}
$("document").ready(function() {

    crystal.gameSetup();
})
