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

            function drawImage(imageObj, canvas_id) {
                var canvas = document.getElementById(canvas_id);
                var context = canvas.getContext('2d');
                var x = 0;
                var y = 0;
                context.imageSmoothingEnabled = false;
                context.drawImage(imageObj, x, y, imageObj.width, imageObj.height, x, y, canvas.width, canvas.height);

                var imageData = context.getImageData(x, y, imageObj.width, imageObj.height);
                var data = imageData.data;

                for (var i = 0; i < data.length; i += 4) {
                    var brightness = 0.34 * data[i] + 0.5 * data[i + 1] + 0.16 * data[i + 2];
                    // red
                    data[i] = brightness;
                    // green
                    data[i + 1] = brightness;
                    // blue
                    data[i + 2] = brightness;
                }

                // overwrite original image
                context.putImageData(imageData, x, y);
            }

            var imageObj1 = new Image();
            imageObj1.onload = function() {
                drawImage(this, 'imagectx1');
            };
            imageObj1.src = 'img/pg-ham.png';
            var imageObj2 = new Image();
            imageObj2.onload = function() {
                drawImage(this, 'imagectx2');
            };
            imageObj2.src = 'img/pg-springfes.png';
            //index.onEnter();
            console.log('about');
            break;
        case "contact":
            $(".site-heading").html("<h1>Contact</h1><span class='subheading'>No man is an island.</span>");
            $.getScript('https://www.google.com/recaptcha/api.js');
            $('#contactbtn').on('click', function(event) {
                event.preventDefault();
                let email = $('#InputEmail').val();
                let name = $('#InputName').val();
                let message = $('#Textarea').val();
                let data = {
                    'username': 'Web-form-notification',
                    'icon_emoji': ':bulb:',
                    'link_names': 1,
                    'text': '\nEmail: ' + email + '\nName: ' + name + '\nMessage: ' + message
                };

                if (email.length == 0) {
                    $("#status-area").html("Please fill in the email before submission!");
                    return;
                } else if (name.length == 0) {
                    $("#status-area").html("Please fill in the name before submission!");
                    return;
                } else if (message.length == 0) {
                    $("#status-area").html("Please fill in the message before submission!");
                    return;
                };

                let response = grecaptcha.getResponse();
                if (response.length == 0) {
                    $("#status-area").html('Please verify the captcha before submission!');
                    return;
                };

                $.ajax({
                    url: "https://superkerokero.ddns.net/captcha-verify",
                    type: "POST",
                    data: JSON.stringify({
                        "response": response
                    }),
                    //contentType: 'application/json',
                    datatype: 'json',
                    processData: false,
                    success: function(data) {
                        if (data['success']) {
                            $.ajax({
                                url: "https://hooks.slack.com/services/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",
                                type: "POST",
                                data: JSON.stringify(data),
                                //contentType: 'application/json',
                                datatype: 'json',
                                processData: false,
                                success: function(data) {
                                    $("#status-area").html('Your message is delivered successfully! <BR> I will try to get back to you within 24 hours!');
                                    $('#InputEmail').val("");
                                    $('#InputName').val("");
                                    $('#Textarea').val("");
                                },
                                error: function(XMLHttpRequest, textStatus) {
                                    console.log(XMLHttpRequest.status, textStatus)
                                    $("#status-area").html('Error upon AJAX POST request to slack server!');
                                }
                            });
                        } else {
                            $("#status-area").html('Verification of reCAPTCHA by Google failed!');
                        };
                    },
                    error: function(XMLHttpRequest, textStatus) {
                        console.log(XMLHttpRequest.status, textStatus)
                        $("#status-area").html('Error upon AJAX POST request to relay server!');
                    }
                });
            });
            //index.onEnter();
            console.log('about');
            break;
        default:
            console.log('other');
    }
});