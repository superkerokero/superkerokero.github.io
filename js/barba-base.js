var index = Barba.BaseView.extend({
    namespace: 'index',
    onEnter: function() {
        // The new Container is ready and attached to the DOM.
        //Get posts json list.
        var _this = this
        $.getJSON("posts.json", function(data) {
            for (var i = data.posts.length - 1; i > -1; i--) {
                _this.append_post(data.posts[i], i);
            };
            _this.append_older_button();
        });
    },
    onEnterCompleted: function() {
        // The Transition has just finished.
        console.log("Completed entering index.");
    },
    onLeave: function() {
        // A new Transition toward a new page has just started.
        console.log("Leaving index.");
    },
    onLeaveCompleted: function() {
        // The Container has just been removed from the DOM.
        console.log("Left index.");
    },

    // Script for auto-generating post previews.

    // Function that appends a single post preview.
    append_post: function(input, num) {
        $("#post-previews").append(
            '<div class="post-preview" id="post' + num.toString() + '">' +
            '<a href="post.html">' +
            '<h2 class="post-title">' +
            input.title +
            '</h2>' + '<h3 class="post-subtitle">' +
            input.subtitle +
            '</h3></a>' + ' <p class="post-meta">Posted by <a href=' +
            input.authorInfo + '>' + input.author +
            '</a> on ' + input.date + '</p>' + '</div>' + '<hr>'
        );
        $('<script>')
            .attr('type', 'text/javascript')
            .text('$("#post' + num.toString() + '").click(function() { localStorage.setItem("postSrc", "' + input.postAddress + '");});')
            .appendTo('head');
    },

    // Function that appends an "older posts" button.
    append_older_button: function(address = "#") {
        $("#post-previews").append(
            '<div class="clearfix">' +
            '<a class="btn btn-secondary float-right" href="' + address + '">Older Posts &rarr;</a>' +
            '</div>'
        );
    }
});

var FadeTransition = Barba.BaseTransition.extend({
    start: function() {
        /**
         * This function is automatically called as soon the Transition starts
         * this.newContainerLoading is a Promise for the loading of the new container
         * (Barba.js also comes with an handy Promise polyfill!)
         */

        // As soon the loading is finished and the old page is faded out, let's fade the new page
        Promise
            .all([this.newContainerLoading, this.fadeOut()])
            .then(this.fadeIn.bind(this));
    },

    fadeOut: function() {
        /**
         * this.oldContainer is the HTMLElement of the old Container
         */

        return $(this.oldContainer).animate({ opacity: 0 }).promise();
    },

    fadeIn: function() {
        /**
         * this.newContainer is the HTMLElement of the new Container
         * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
         * Please note, newContainer is available just after newContainerLoading is resolved!
         */

        var _this = this;
        var $el = $(this.newContainer);

        $(this.oldContainer).hide();

        $el.css({
            visibility: 'visible',
            opacity: 0
        });

        $el.animate({ opacity: 1 }, 400, function() {
            /**
             * Do not forget to call .done() as soon your transition is finished!
             * .done() will automatically remove from the DOM the old Container
             */

            _this.done();
        });
    }
});

/**
 * Next step, you have to tell Barba to use the new Transition
 */

Barba.Pjax.getTransition = function() {
    /**
     * Here you can use your own logic!
     * For example you can use different Transition based on the current page or link...
     */

    return FadeTransition;
};