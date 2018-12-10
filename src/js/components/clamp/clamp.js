'use strict';

export default class Clamp {
    constructor(element, options) {
        if(!element || this.getElementText(element) === '') {
            console.log('no element');
            return;
        }
        options = Object.assign({
            added: '...'
        }, options);
        this.element = element;
        this.content = this.element.querySelector('.content');

        this.outerOffsetWidth = this.element.offsetWidth;
        this.innerOffsetWidth = this.content.offsetWidth;
        this.gutter = this.outerOffsetWidth - this.innerOffsetWidth;



        this.word = '';
        this.lastWord = '';
        this.character = '';
        this.lastCharacter = '';
        this.currentWidth = this.element.offsetWidth;
        
        this.options = options;
        this.setup();
    }
    setup() {
        this.content.style.width = (this.innerOffsetWidth + this.gutter) + 'px';
        if (this.getScrollSize(this.element) > this.getOffsetSize(this.element)) {
            this.render();
        }
        // this.element.classList.remove('nowrap');
        // this.element.removeAttribute('style');
    }
    render() {
        this.backdrop = document.createElement('div');
        const value = this.content.innerHTML;
        this.backdrop.className = 'backdrop nowrap';
        this.backdrop.setAttribute('aria-hidden', 'true');
        this.backdrop.style.width = (this.innerOffsetWidth + this.gutter) + 'px';
        this.backdrop.innerHTML = value;
        this.element.appendChild(this.backdrop);
        this.content.classList.add('blind');
        this.setClampWord(value);
    }
    setClampWord(value) {
        this.word = value.split(' ');                
        while (this.getScrollSize(this.backdrop) > this.getOffsetSize(this.backdrop)) {
            this.deleteArrayWord();
            this.backdrop.innerHTML = this.setJoinWord() + this.options.added;
        }
        this.setClampCharacter();
    }
    setClampCharacter() {
        this.backdrop.innerHTML = this.setJoinWord() + ' ' + this.lastWord + this.options.added;
        this.character = this.lastWord.split('');
        while (this.getScrollSize(this.backdrop) > this.getOffsetSize(this.backdrop)) {
            this.deleteArrayCharacter();
            this.backdrop.innerHTML = this.setJoinWord() + ' ' + this.setJoinCharacter() + this.options.added;
        }
        this.element.classList.remove('nowrap');
    }
    setJoinWord() {
        return this.word.join(' ');
    }
    setJoinCharacter() {
        return this.character.join('');
    }
    deleteArrayWord() {
        const count = this.getWordCount() - 1;
        this.lastWord = this.word[count];
        this.word.splice(count, 1);        
    }
    deleteArrayCharacter() {
        this.character.splice(this.getCharacterCount() - 1, 1);
    }
    getWordCount() {
        return this.word.length;
    }
    getCharacterCount() {
        return this.character.length;
    }
    getElementText(element) {
        return element.textContent.trim() || element.innerText.trim();
    }
    getScrollSize(element) {
        return element.scrollHeight;
    }
    getOffsetSize(element) {
        return element.offsetHeight;
    }
}

// window.Clamp = (function(Clamp) {
//     Clamp = function(element, opts) {
//         this.element = element;
//         this.opts = opts || {};
//         this.scrollSize = 0;
//         this.offsetSize = 0;
//         this.wordCount = 0;
//         this.word = [];
//         this.characeterCount = 0;
//         this.character = [];
//         this.lastWord = '';
//         this.lastCharacter = '';
//         this.added = this.opts.added || '...';
//         this.length = this.element.length;
//         this.text = (this.length > 0) ? '' : this.getElementText(this.element);
//         this.init();
//     }
//     Clamp.prototype = {
//         init : function() {
//             if (this.length === undefined) {
//                 this.checkClamp();
//             } else {
//                 for(var i=0, length=this.length; i<length; i++) {
//                     this.text = this.getElementText(this.element[i])
//                     this.checkClamp(this.element[i], this.text);
//                 }
//             }
//         },
//         checkClamp : function(element, text) {
//             this.backdrop = document.createElement('div');
//             this.backdrop.className = 'backdrop';
//             this.backdrop.appendChild(document.createTextNode(text));
//             element.appendChild(this.backdrop);
//             this.backdrop.classList.add('nowrap');
//             this.scrollSize = this.getScrollSize();
//             this.offsetSize = this.getOffsetSize();
//             if (this.scrollSize > this.offsetSize) {
//                 this.setClamp();
//                 this.backdrop.setAttribute('aria-hidden', 'true');
//             } else {
//                 element.removeChild(this.backdrop);
//             }
//         },
//         setClamp : function() {
//             this.word = this.text.split(' ');
//             while (this.getScrollSize() > this.getOffsetSize()) {
//                 this.deleteArrayWord();
//                 this.backdrop.textContent = this.setJoinWord() + this.added;
//             }
//             this.backdrop.classList.remove('nowrap');
//             this.setClampCharacater();
//         },
//         getElementText : function(element) {
//             return element.textContent || element.innerText;
//         },
//         getWordCount : function() {
//             return this.word.length;
//         },
//         getCharacterCount : function() {
//             return this.character.length;
//         },
//         deleteArrayWord : function(count) {
//             var count = this.getWordCount() - count || this.getWordCount() - 1;
//             this.lastWord = this.word[count];
//             this.word.splice(count, 1);
//         },
//         deleteArrayCharacter : function() {
//             this.lastCharacter = this.character[this.getCharacterCount() - 1];
//             this.character.splice(this.getCharacterCount() - 1, 1);
//         },
//         setJoinWord : function() {
//             return this.word.join(' ');
//         },
//         setJoinCharacter : function() {
//             return this.character.join('');
//         },
//         getScrollSize : function() {
//             return this.backdrop.scrollHeight;
//         },
//         getOffsetSize : function() {
//             return this.backdrop.offsetHeight;
//         },
//         setClampCharacater : function() {
//             this.backdrop.classList.add('nowrap');
//             this.backdrop.textContent = this.setJoinWord() + ' ' + this.lastWord + this.added;
//             this.character = this.lastWord.split('');
//             this.deleteArrayCharacter();
//             this.backdrop.textContent = this.setJoinWord() + ' ' + this.setJoinCharacter() +  this.added;
//             while (this.getScrollSize() > this.getOffsetSize()) {
//                 this.deleteArrayCharacter();
//                 this.backdrop.textContent = this.setJoinWord() + ' ' + this.setJoinCharacter() + this.added;
//             }
//             this.backdrop.textContent = this.setJoinWord() + ' ' + this.setJoinCharacter() + this.lastCharacter + this.added;
//             this.backdrop.classList.remove('nowrap');
//         }
//     }
//     return Clamp;
// })(window.Clamp || {});