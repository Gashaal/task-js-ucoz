(function() {
    'use strict';
    // namespace application
    window.app = {
    	/**
    	 * Create book views and init book form
    	 */
    	init: function() {
    		var books = localStorage.getItem('books'),
    			form = new app.BookForm(),
    			bookModel,
    			bookItemView;
    		
    		if (books && books !== '{}') {
    			books = JSON.parse(books);
    		} else {
    			books = {};
    			localStorage.setItem('books', '{}');
    		}

    		for (var book in books) {
    			bookModel = new app.Book(books[book]);
    			bookItemView = new app.BookItemView(bookModel);
    			bookItemView.on('edit', form.setBook.bind(form));
    			bookItemView.render();
    		}
    	}
    }
})();