Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
    switch (currentStatus.namespace) {
        case "index":
            $(".site-heading").html("<h1>Blog</h1><span class='subheading'>Good Good Study  Day Day Up</span>");
            particlesJS.load('particles-js', 'assets/particles-grid.json');
            console.log('index');
            break;
        case "about":
            $(".site-heading").html("<h1>About</h1><span class='subheading'>It takes one to know one</span>");
            particlesJS.load('particles-js', 'assets/particles-star.json');
            //index.onEnter();
            console.log('about');
            break;
        case "post":
            $(".site-heading").html("<h1>Posts</h1><span class='subheading'>Go the extra mile</span>");
            var postItem = localStorage.getItem("postSrc");
            $("#myIframe").attr("src", postItem);
            $("#myIframe").attr("width", $(".col-lg-8.offset-lg-2.col-md-10.offset-md-1").width());
            particlesJS.load('particles-js', 'assets/particles-star.json');
            //index.onEnter();
            console.log('about');
            break;
        case "playground":
            $(".site-heading").html("<h1>Playground</h1><span class='subheading'>A thing of beauty is a joy forever</span>");
            particlesJS.load('particles-js', 'assets/particles-bubble.json');
            //index.onEnter();
            console.log('about');
            break;
        case "contact":
            $(".site-heading").html("<h1>Contact</h1><span class='subheading'>No man is an island.</span>");
            particlesJS.load('particles-js', 'assets/particles-snow.json');
            //index.onEnter();
            console.log('about');
            break;
        default:
            console.log('other');
    }
});