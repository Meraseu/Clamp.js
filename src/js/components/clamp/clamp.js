'use strict';

export default class Clamp {
    constructor(element, options) {
        if(!element) {
            return;
        }
        options = Object.assign({
            added: '...'
        }, options);
        this.element = element;
        this.content = this.element.querySelector('.content');
        this.currentWidth = this.element.offsetWidth;        
        this.outerOffsetWidth = this.element.offsetWidth;
        this.innerOffsetWidth = this.content.offsetWidth;
        this.gutter = this.outerOffsetWidth - this.innerOffsetWidth;
        this.word = '';
        this.lastWord = '';
        this.character = '';
        this.lastCharacter = '';
        this.options = options;
    }
    initialize() {
        if(this.getElementText(this.element) === '') {
            return;
        }
        this.content.style.width = (this.innerOffsetWidth + this.gutter) + 'px';
        if (this.getScrollSize(this.element) > this.getOffsetSize(this.element)) {
            this.render();
        }
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
        let i = 0;            
        while (this.getScrollSize(this.backdrop) > this.getOffsetSize(this.backdrop)) {
            i++;
            this.deleteArrayWord();
            this.backdrop.innerHTML = this.setJoinWord() + this.options.added;
            if(i > 100) {
                console.log('too much word');
                break;
            }
        }
        this.setClampCharacter();
    }
    setClampCharacter() {
        this.backdrop.innerHTML = this.setJoinWord() + this.lastWord + this.options.added;
        this.character = this.lastWord.split('');
        let i = 0;
        while (this.getScrollSize(this.backdrop) > this.getOffsetSize(this.backdrop)) {
            i++;
            if(this.character.length < 1) {
                break;
            }
            this.deleteArrayCharacter();
            this.backdrop.innerHTML = this.setJoinWord() + this.setJoinCharacter() + this.options.added;
            if(i > 100) {
                console.log('too much character');
                break;
            }
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