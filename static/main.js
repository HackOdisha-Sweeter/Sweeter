posts = ['1', '2', '3', '4']


function populate(){
    posts.forEach(element => {
        console.log(element)
    });
}

function SendText(){
    // $('#-form').on('submit', function(event){
    var text = $("#post-textarea")
    $.ajax({
        data : {
            text: text.val(),
        },
        type : 'POST',
        url : '/WordCheck'
    })
    .done(function(data){
        console.log(data)
    })
        // event.preventDefault()
    // })

}

function SendText(){
    $('#post-form').on('submit', function(event){
    var text = $("#post-textarea")
    $.ajax({
        data : {
            text: text.val(),
        },
        type : 'POST',
        url : '/Submit'
    })
    .done(function(data){
        console.log(data)
    })
        event.preventDefault()
    })

}


// $( document ).ready(function() {
//     console.log( "ready!" );
$( document ).ready(function(){
    $('#post-textarea').keydown(function(){
        
        $('#submit-btn').prop('disabled', false)
    });
}
    // populate

);


