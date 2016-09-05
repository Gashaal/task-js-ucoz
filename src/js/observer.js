(function() {
    'use strict';
    //Observer pattern implementation

    var Observer = function() {};
    
    Observer.prototype.events = {};
    
    /**
     * Subscribe to event
     * @param  {string} id - event id
     * @param  {Function} callback
     */
    Observer.prototype.on = function(id, callback) {
        if (!this.events[id]) {
            this.events[id] = new Array();
        }
        return this.events[id].push(callback);
    }

    /**
     * Unsubscribe event
     * @param  {string} id - event id
     * @param  {Function} callback
     */
    Observer.prototype.off = function(id, callback) {
        var index;

        if (this.events[id]) {
            index = this.events[id].indexOf(callback);

            if (index !== -1) {
                callbacks.splice(index, 1);
            }
        }
    }
    
    /**
     * Trigger event
     * @param  {string} id
     * @return {any} data
     */
    Observer.prototype.trigger = function(id, data) {
        var callbacks;

        if (this.events[id]) {
            callbacks = this.events[id];
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i](data);
            }
        }
    }

    app.Observer = Observer;
})();