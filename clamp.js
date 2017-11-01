;(function(Clamp) {

    console.log(Clamp);

    Clamp = function(element, opts) {
        this.element = element;
        this.opts = opts || {};
        this.text = this.element.textContent;
        this.scrollSize = 0;
        this.offsetSize = 0;
        this.wordCount = 0;
        this.word = [];
        this.characeterCount = 0;
        this.character = [];
        this.lastWord = '';
        this.lastCharacter = '';
        this.regex = /\s+/gi;
        this.added = this.opts.added || '...';
        this.init();
    }
    Clamp.prototype = {
        init : function() {
            this.backdrop = document.createElement('div');
            var text = document.createTextNode(this.text);
            this.backdrop.className = 'backdrop';
            this.backdrop.appendChild(text);
            this.element.appendChild(this.backdrop);
            this.backdrop.classList.add('nowrap');
            this.scrollSize = this.getScrollSize();
            this.offsetSize = this.getOffsetSize();
            if(this.scrollSize > this.offsetSize) {
                this.setClamp();
                this.backdrop.setAttribute('aria-hidden','true');
            } else {
                this.element.removeChild(this.backdrop);
            }
        },
        setClamp : function() {
            this.word = this.text.trim().replace(this.regex, ' ').split(' ');
            while (this.getScrollSize() > this.getOffsetSize()) {
                this.deleteArrayWord();
                this.backdrop.textContent = this.setJoinWord() + ' ...';
            }
            this.backdrop.classList.remove('nowrap');
            this.setClampCharacater();
        },
        getWordCount : function() {
            return this.word.length;
        },
        getCharacterCount : function() {
            return this.character.length;
        },
        deleteArrayWord : function(count) {
            var count = this.getWordCount() - count || this.getWordCount() - 1;
            this.lastWord = this.word[count];
            this.word.splice(count, 1);
        },
        deleteArrayCharacter : function() {
            this.lastCharacter = this.character[this.getCharacterCount() - 1];
            this.character.splice(this.getCharacterCount() - 1, 1);
        },
        setJoinWord : function() {
            return this.word.join(' ');
        },
        setJoinCharacter : function() {
            return this.character.join('');
        },
        getScrollSize : function() {
            return this.backdrop.scrollHeight;
        },
        getOffsetSize : function() {
            return this.backdrop.offsetHeight;
        },
        setClampCharacater : function() {
            this.backdrop.classList.add('nowrap');
            this.backdrop.textContent = this.setJoinWord() + ' ' + this.lastWord + this.added;
            this.character = this.lastWord.split('');
            this.deleteArrayCharacter();
            this.backdrop.textContent = this.setJoinWord() + ' ' + this.setJoinCharacter() +  this.added;
            while (this.getScrollSize() > this.getOffsetSize()) {
                this.deleteArrayCharacter();
                this.backdrop.textContent = this.setJoinWord() + ' ' + this.setJoinCharacter() + this.added;
            }
            this.backdrop.textContent = this.setJoinWord() + ' ' + this.setJoinCharacter() + this.lastCharacter + this.added;
            this.backdrop.classList.remove('nowrap');
        }
    }
})(window.Clamp = window.Clamp || {});