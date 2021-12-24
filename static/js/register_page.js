function Redirect() {
    location.replace('http://localhost:3000/templates/map_page.html')
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

    // Send a POST request to url
    axios.post('http://192.168.42.10:8000/signup', {
        // "test_String"
        username: name_value,
        origin: origin_value,
        age: age_value,
        gender: gender_selected,
        coldstart: coldstart_selected
        // data
    }
        // headers: {
        //     'Content-Type': 'test/plain'
        // }
    ).then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
        alert(response.data.message);
    });
});