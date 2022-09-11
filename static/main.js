posts = [{'Username': '@internet_is_a_donout', 'PostContent':'The internet was created to connect and empower. But these benefits have always succumbed to vile acts of the wrong hands. Unsafe space for women is not only bound to the real world; the digital world does not hold back in oppressing them. Rape threats, body-shaming, and judgemental and obscene comments are faced by women daily.','image': 'user-1'}, {'Username': '@twitter_fly_off', 'PostContent':'These so-called \'trolls\' are like parasites infesting the internet, trolling women for existing, for being too fat, for being too thin, for being too slutty, for being too modest.','image': 'user-1'}, {'Username': '@make_it_sweeter', 'PostContent':'So, we decided to make the internet safer and Sweeter for the entire world, especially our women.','image': 'user-1'}, {'Username': '@make_it_sweeter', 'PostContent':'Sweeter uses AI trained on an extensive data set and can detect hate speech, profanity and even racial slurs. The Internet is in our hands; let\'s make it Sweeter together.','image': 'user-1'}]

var username = '@make_it_sweeter'
function populate(){
    var ContainerElement = document.getElementById('scroll')
    while (ContainerElement.hasChildNodes()) {
        ContainerElement.removeChild(ContainerElement.firstChild);
    }
    posts.forEach(element => {
        var PostElement = document.createElement('div')
        PostElement.setAttribute('class', 'text-container')
        var UserCElem = document.createElement('div')
        UserCElem.setAttribute('class', 'user-container')
        var UserC_PElem = document.createElement('div')
        UserC_PElem.setAttribute('class', 'user-profile')
        var UserC_NElem = document.createElement('div')
        UserC_NElem.setAttribute('class', 'user-name')
        UserC_NElem.innerText = element['Username']
        UserCElem.append(UserC_PElem)
        UserCElem.append(UserC_NElem)
        var ContentElem = document.createElement('div')
        ContentElem.setAttribute('class', 'content')
        ContentElem.innerHTML = element['PostContent']
        PostElement.append(UserCElem)
        PostElement.append(ContentElem)
        
        ContainerElement.append(PostElement)
    });
    // console.log(ContainerElement)
}

function SendText(){
    var text = $("#post-textarea")
    $.ajax({
        data : {
            text: text.val(),
        },
        type : 'POST',
        url : '/WordCheck'
    })
    .done(function(data){
        if (data['response']['state']){
            // console.log(data['response']['state'])
            $('#submit-btn').prop('disabled', true)
        }
    })
}

// function submit(){
//     $('#post-form').on('submit', function(event){
//         var text = $("#post-textarea")
//         $.ajax({
//             data : {
//                 text: text.val(),
//             },
//             type : 'POST',
//             url : '/AddPost'
//         })
//         .done(function(data){
//             console.log(data)
//         })
//         event.preventDefault()
//     })
// }


// $( document ).ready(function() {
//     console.log( "ready!" );
$(document).ready(function(){
    $('#post-textarea').keyup(function(){
        // console.log($('#post-textarea').val().length)
        if ($('#post-textarea').val().length != 0){
            $('#submit-btn').prop('disabled', false)
        }
        else{
            $('#submit-btn').prop('disabled', true)
        }
        SendText()
    });
    // $('#post-form').on('submit', function(event){
    //     var text = $("#post-textarea")
    //     console.log(text)
    //     $.ajax({
    //         data : {
    //             text: text.val(),
    //         },
    //         type : 'POST',
    //         url : '/AddPost'
    //     })
    //     .done(function(data){
    //         console.log(data)
    //     })
    //     event.preventDefault()
    // })
    $('#post-form').on('submit', function(event){
        var text = $("#post-textarea").val()
        var uname = username
        var img = ''
        posts.push({"Username": uname, "PostContent": text, 'image': img})
        populate()
        event.preventDefault()
    })
    populate()
    document.getElementById('sess-user').innerText = username
});


