function Redirect() {
    location.replace('/Users/sunny/Desktop/eyes_frontend/templates/map_page.html')
}

const form  = document.getElementById('signup');
form.addEventListener('submit', (event) => {
    // Get value from form
    var name_value = document.getElementById("name").value;
    var origin_value = document.getElementById("origin").value;
    var age_value = document.getElementById("age").value;
    var gender_values = document.getElementsByName("gender");
    var coldstart_values = document.getElementsByName("coldstart");

    var coldstart_selected = [];
    for (var i=0; i<coldstart_values.length; i++){
        if(coldstart_values[i].checked){
            coldstart_selected.push(coldstart_values[i].value)
        }
    }
    var gender_selected = [];
    for (var i=0; i<gender_values.length; i++){
        if(gender_values[i].checked){
            gender_selected.push(gender_values[i].value)
        }
    }

    // alert(coldstart_selected)
    // alert(gender_selected)


    // Send a POST request to url
    axios.post('http://192.168.58.241:8000/signup', {
        username: name_value,
        origin: origin_value,
        age: age_value,
        gender: gender_selected,
        coldstart: coldstart_selected
    }).then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        alert(response.data.message);

        if(response.data.message == "POST, this is a new user") {
            alert(response.data.message);
            // window.location.href = 'file:///Users/sunny/Desktop/eyes_frontend/templates/map_page.html';
            // window.location.href = '/Users/sunny/Desktop/eyes_frontend/templates/map_page.html';
        }
        else if(response.data.message == "POST, this is not a new user") {
            // window.location.href = 'register_page.html';
            // window.location.href = '/Users/sunny/Desktop/eyes_frontend/templates/register_page.html';
        }
    });

    // window.location.href = '/Users/sunny/Desktop/eyes_frontend/templates/map_page.html';
    // window.location.replace('/Users/sunny/Desktop/eyes_frontend/templates/map_page.html')
});