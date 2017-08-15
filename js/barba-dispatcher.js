Barba.Dispatcher.on('newPageReady', function(currentStatus, oldStatus, container) {
    switch (currentStatus.namespace) {
        case "index":
            $(".site-heading").html("<h1>Blog</h1><span class='subheading'>Good Good Study  Day Day Up</span>");
            console.log('index');
            break;
        case "about":
            $(".site-heading").html("<h1>About</h1><span class='subheading'>It takes one to know one</span>");
            //index.onEnter();
            console.log('about');
            break;
        case "post":
            $(".site-heading").html("<h1>Posts</h1><span class='subheading'>Go the extra mile</span>");
            var postItem = localStorage.getItem("postSrc");
            $("#myIframe").attr("src", postItem);
            $("#myIframe").attr("width", $(".col-lg-8.offset-lg-2.col-md-10.offset-md-1").width());
            //index.onEnter();
            console.log('about');
            break;
        case "playground":
            $(".site-heading").html("<h1>Playground</h1><span class='subheading'>A thing of beauty is a joy forever</span>");
            //index.onEnter();
            console.log('about');
            break;
        case "contact":
            $(".site-heading").html("<h1>Contact</h1><span class='subheading'>No man is an island.</span>");
            //index.onEnter();
            console.log('about');
            break;
        default:
            console.log('other');
    }
});