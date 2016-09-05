(function() {
    'use strict';

    /**
     * Create instance BookItemView
     * @constructor
     * @param {Book} book
     */
    var BookItemView = function(book) {
        this.book = book;
        this.targetEl = document.querySelector('.list-wrapper');
        this.tagName = 'div';
        this.templateId = 'book-item';
        this.isRendered = false;

        this.book.on('save', this.update.bind(this));
    }

    // mixin event system
    BookItemView.prototype = Object.create(app.Observer.prototype);
    BookItemView.prototype.constructor = BookItemView;

    /**
     * render book view
     */
    BookItemView.prototype.render = function() {
        if (!this.isRendered) {
            var template = document.getElementById(this.templateId).innerHTML;

            var el = document.createElement(this.tagName);
            el.innerHTML = template;
            el.setAttribute('class', 'book-wrapper');
            el.querySelector('.book-action__edit').addEventListener('click', this.edit.bind(this));
            el.querySelector('.book-action__remove').addEventListener('click', this.destroy.bind(this));
            el.querySelector('.book-info__name').innerHTML = this.book.attrs.name;
            el.querySelector('.book-info__author').innerHTML = this.book.attrs.author;
            this.el = el;
            this.update();

            this.targetEl.appendChild(this.el);
            this.isRendered = true;
        }

        return this;
    }

    /**
     * update view
     */
    BookItemView.prototype.update = function() {
        this.el.querySelector('.book-info__name').innerHTML = this.book.attrs.name;
        this.el.querySelector('.book-info__author').innerHTML = this.book.attrs.author;

        return this;
    };

    // edit view
    BookItemView.prototype.edit = function() {
        this.trigger('edit', this.book);
        return this;
    }

    // destroy view, off book events, remove book;
    BookItemView.prototype.destroy = function() {
        this.targetEl.removeChild(this.el);
        this.book.off('save', this.update.bind(this));
        this.book.remove();
    }

    app.BookItemView = BookItemView;
})();