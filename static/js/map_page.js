function myFunction(e) {
  axios.post('http://192.168.42.10:8000/recommend_api', {
    user_name: 'test_user',
    selected_name: e.target.id
  }).then((response) => {
    console.log(response.data.message)
    location.reload()
  })
};


function generate_current_table(current_spots){
  let names = current_spots["names"]
  names = names.reverse()

  let result = ''
  result += '<table class="table">'

  result += '<thead><tr>'
  result += '<th scope="col">Selected Spots</th>'
  result += '</tr></thead>'

  result += '<tbody>'
  for(let name of names){
    result += '<tr>';
    result += '<td>' + name + '</td>';
    result += '</tr>';
  }
  result += '</tbody>'
  result += '</table>'

  return result
}


function generate_recommendation_table(locations){
  let result = '';
  result += '<table class="table" id="recommendation_table">'

  result += '<thead><tr>'
  result += '<th scope="col">Name</th>'
  result += '<th scope="col">Distance</th>'
  result += '<th scope="col">Relative Count</th>'
  result += '<th scope="col">Select</th>'
  result += '</tr></thead>'

  result += '<tbody>'
  for(let location of locations){
    result += '<tr>';
    result += '<td>' + location[0] + '</td>';
    result += '<td>' + location[1] + '</td>';
    result += '<td>' + location[2] + '</td>';
    result += '<td>';
    result += '<button id="' + location[0] + '" class="btn btn-light" onclick="myFunction(event)">select</button>'
    result += '</td>';
    result += '</tr>';
  }
  result += '</tbody>'
  result += '</table>'

  return result
}


function recommendation_list(recommended_spots) {
  var names = recommended_spots.names
  var distances = recommended_spots.distances
  var relative_counts = recommended_spots.relative_counts

  var recommendation_list = []
  for(let i in recommended_spots["names"]) {
    recommendation_list.push([names[i], distances[i], relative_counts[i]])
  }

  return recommendation_list
}


function location_list(center_spot, recommended_spots) {
  var names = recommended_spots.names
  var lats = recommended_spots.lats
  var lngs = recommended_spots.lngs

  var location_list = []
  location_list.push([center_spot[0], center_spot[1], center_spot[2]])
  for(let i in recommended_spots["names"]) {
    location_list.push([names[i], lats[i], lngs[i]])
  }

  return location_list
}


axios.get('http://192.168.42.10:8000/map')
.then((response) => {
  // Fetch response data
  console.log(response);
  var recommended_spots = response.data.recommended_spots;
  var center_spot = response.data.center_spot;
  var current_spots = response.data.current_spots;
  var user = response.data.user;

  // Welcome message
  let greetings = "Hi, "
  let welcome_message = greetings.concat(user["name"]);
  document.getElementById("welcome_message").innerHTML = welcome_message;

  // Render recommendation spots table
  let recommended_list = recommendation_list(recommended_spots)
  let recommended_table = generate_recommendation_table(recommended_list)
  document.getElementById("recommend_spots").innerHTML = recommended_table

  // Render current spots
  let current_table = generate_current_table(current_spots)
  document.getElementById("current_spots").innerHTML = current_table

  // Render Google map
  center_info = [center_spot["name"], center_spot["lat"], center_spot["lng"]]
  locations = location_list(center_info, recommended_spots)

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(center_spot["lat"], center_spot["lng"]),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
  
  var infowindow = new google.maps.InfoWindow();

  var marker, i;
  
  for (i = 0; i < locations.length; i++) {  
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[i][1], locations[i][2]),
      map: map
    });
    
    google.maps.event.addListener(marker, 'click', (function(marker, i) {
      return function() {
        infowindow.setContent(locations[i][0]);
        infowindow.open(map, marker);
      }
    })(marker, i));
  }
})
