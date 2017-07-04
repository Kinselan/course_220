var $letters = $("#spaces"),
    $guesses = $("#guesses"),
    $apples = $("#apples"),
    $message = $("#message"),
    $replay = $("#replay");

function Game() {
  this.word = randomWord();
  this.incorrectGuess = 0;
  this.correctGuess = 0;
  this.guessAllowed = 6;
  this.letterGuessed = [];

  if (!this.word) {
    this.displayMessage("Sorry, I've run out of words!");
    this.toggleReplayLink(false);
    return this;
  }

  this.word = this.word.split("");
  this.init();
}

Game.prototype = {
  displayMessage: function(txt) {
    $message.text(txt)
  },

  createBlank: function() {
    var spaces = (new Array(this.word.length + 1)).join("<span></span>");
    $letters.find("span").remove();
    $letters.append(spaces);
    this.$space = $("#spaces span");
  },

  fillBlanksFor(letter) {
    var self = this;
    this.word.forEach(function(l, index) {
      if (letter === l) {
        self.$space.eq(index).text(l);
        self.correctGuess++;
      }
    })
  },

  renderGuess: function(letter) {
    $("<span />", {
      text: letter
    }).appendTo($guesses);
  },

  renderIncorrectGuess: function(letter) {
    this.renderGuess(letter);
    this.incorrectGuess++;
    this.setClass();
  },

  setClass: function() {
    $apples.removeClass().addClass("guess_" + this.incorrectGuess);
  },

  duplicateGuess: function(letter) {
    if (this.letterGuessed.indexOf(letter) !== -1) {
      return true;
    }
    this.letterGuessed.push(letter);
    return false;
  },

  processGuess: function(e) {
    var letter = String.fromCharCode(e.which);
    if (notALetter(e.which)) { return; }
    if (this.duplicateGuess(letter)) { return; }

    if ($.inArray(letter, this.word) !== -1) {
      this.fillBlanksFor(letter);
      this.renderGuess(letter)
      if (this.correctGuess === this.$space.length) {
        this.win();
      }
    } else {
      this.renderIncorrectGuess(letter);
    }

    if (this.incorrectGuess === this.guessAllowed) {
      this.lose();
    } 
  },

  win: function() {
    this.unbind();
    this.displayMessage("You win");
    this.setGameStatus("win");
    this.toggleReplayLink(true);
  },

  lose: function() {
    this.unbind();
    this.displayMessage("Sorry you are out of guesses.");
    this.setGameStatus("lose");
    this.toggleReplayLink(true);
  },

  setGameStatus: function(status) {
    $(document.body).removeClass();

    if (status) {
      $(document.body).addClass(status);
    }
  },

  toggleReplayLink: function(butt) {
    $replay.toggle(butt);
  },

  emptyGuesses: function() {
    $guesses.find("span").remove();
  },

  bindEvents: function() {
    $(document).on("keypress.game", this.processGuess.bind(this));
  },

  unbind: function() {
    $(document).off(".game");
  },

  init: function() {
    this.bindEvents();  
    this.setClass();
    this.toggleReplayLink(false);
    this.createBlank();
    this.setGameStatus();
    this.emptyGuesses();
    this.displayMessage("");
  }
}

var randomWord = (function() {
  var words = ["coffee", "apples", "wallet", "house"];

  return function() {
    var index = Math.floor(Math.random() * words.length);
    var word = words[index];
    words.splice(index, 1);
    return word;
  }
})();

function notALetter(letterCode) {
  var a_code = 97,
      z_code = 122;
  return letterCode < a_code || letterCode > z_code;
}

$replay.on("click", function(e) {
  e.preventDefault();
  new Game();
})


new Game();