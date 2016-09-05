(function() {
    'use strict';

    /**
     * Create instance Book
     * @constructor
     * @param {object} attrs
     */
    var Book = function(attrs) {
        if (!attrs.author || !attrs.name || !attrs.year || !attrs.pages) {
            throw new TypeError('params is not valid');
        }

        if (attrs.id) {
            this.id = attrs.id;
            delete attrs.id;
        }

        this.attrs = attrs;
    }

    // mixin event system
    Book.prototype = Object.create(app.Observer.prototype);
    Book.prototype.constructor = Book;

    /**
     * Check the book is new
     * @return {Boolean}
     */
    Book.prototype.isNew = function() {
        if (this.id) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Save book to localStorage
     * @return {[type]}
     */
    Book.prototype.save = function() {
        var books = JSON.parse(localStorage.getItem('books')),
            attrs = this.attrs;
        
        if (!this.isNew()) {
            // generate id for book
            this.id = Math.random().toString(36).slice(2);
            books[this.id] = {};
        }

        for (var attr in attrs) {
            books[this.id][attr] = attrs[attr];
        }

        books[this.id]['id'] = this.id;
        localStorage.setItem('books', JSON.stringify(books));
        this.trigger('save');
    }

    /**
     * Remove book from localStorage
     * @return {[type]}
     */
    Book.prototype.remove = function() {
        if (!this.isNew()) {
            throw new ReferenceError('this book is not saved in localStorage yet');
        }

        var books = JSON.parse(localStorage.getItem('books'));
        delete books[this.id];
        localStorage.setItem('books', JSON.stringify(books));
        this.trigger('remove');
    }

    app.Book = Book;
})();