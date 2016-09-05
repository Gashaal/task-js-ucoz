(function() {
    'use strict';

    var BookForm = function() {
        var instance = this;
        this.book = null;
        this.form = document.querySelector('.book-form');
        this.form.reset();

        // form fields
        this.fields = {};
        this.fields.name = this.form.querySelector('.book-form__name');
        this.fields.author = this.form.querySelector('.book-form__author');
        this.fields.year = this.form.querySelector('.book-form__year');
        this.fields.pages = this.form.querySelector('.book-form__pages');

        // prevent submit
        var preventDefault = function(e) {
            if (e.keyCode == 13) {
                e.preventDefault();
            }
        }
        for (var field in this.fields) {
            this.fields[field].addEventListener('keypress', preventDefault);
        }

        // form header
        this.header = this.form.querySelector('.book-form__header');
        // form error, show if validation was fail
        this.error = this.form.querySelector('.book-form__error');
        this.error_text = this.error.querySelector('.header');

        this.form.querySelector('.book-form__cancel').addEventListener('click', function(e) {
            e.preventDefault();
            instance.reset();
        });
        this.form.querySelector('.book-form__save').addEventListener('click', function(e) {
            e.preventDefault();
            instance.save();
        });

        /**
         * reset form
         */
        this.reset = function() {
            this.book = null;
            this.error.style.display = 'none';
            this.header.innerHTML = 'Создание новой книги';
            this.form.reset();

            return this;
        };

        /**
         * get data from form with simple validation
         * @return {object}
         */
        this.getData = function() {
            var data = {};

            data.name = this.fields.name.value;
            data.author = this.fields.author.value;
            data.year = +this.fields.year.value;
            data.pages = +this.fields.pages.value;

            if (!data.name || !data.author) {
                this.error_text.innerHTML = 'Заполните поля "Название" и "Автор"!';
                this.error.style.display = 'block';
                return false;
            } else if (data.year <= 0) {
                this.error_text.innerHTML = '"Год издания" должен быть больше 0!';
                this.error.style.display = 'block';
                return false;
            } else if (data.pages <= 0) {
                this.error_text.innerHTML = '"Количество страниц" должно быть больше 0!';
                this.error.style.display = 'block';
                return false;
            } else {
                this.error.style.display = 'none';
            }

            return data;
        };

        /**
         * save book and reset form
         */
        this.save = function() {
            var data = this.getData(),
                attrs;

            if (data) {
                if (!this.book) {
                    this.book = new app.Book(data);
                    var bookItemView = new app.BookItemView(this.book).render();
                    bookItemView.on('edit', this.setBook.bind(this));
                } else {
                    this.book.attrs = data;
                }

                this.book.save();
                this.reset();
            }

            return this;
        };

        /**
         * set book to form, fill form fields
         * @param {Book} book
         */
        this.setBook = function(book) {
            this.book = book;
            var attrs = book.attrs;
            this.book.on('remove', this.reset.bind(this));
            this.header.innerHTML = attrs.name;
            
            for (var attr in attrs) {
                this.fields[attr].value = attrs[attr];
            }

            return this;
        };

        BookForm = function() {
            return instance;
        }
    }

    app.BookForm = BookForm;
})();