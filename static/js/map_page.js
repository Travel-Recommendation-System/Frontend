function Select(render){
  document.getElementById("test").innerHTML = render;

  // Post data to backend
  // axios.post('http://192.168.58.241:8000/recommend', {
  //   user_name:
  //   selected_spot_id:
  // })

  // backend recommendation
  // render on this page again (refresh? redirect?)
  return
}


function generate_spot_list(locations){
  let result = '';
  result += '<table class="table">'

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
    // result += '<button class="btn btn-light" onclick="Select()">select</button>';
    result += '<button id="' + location[0] + '" class="btn btn-light">select</button>'
    result += '</td>';
    result += '</tr>';
  }
  result += '</tbody>'
  result += '</table>'

  return result
}


function doSomething(data) {
  console.log(data);
  document.getElementById("test").innerHTML = data.user_name;
}

axios.get('http://192.168.42.10:8000/map')
.then((response) => {
  doSomething(response.data);

  // Fetch response data
  console.log(response);
  var spot_names = response.data.names;
  var spot_ratings = response.data.ratings;
  var spot_distances = response.data.distance;
  var spot_lngs = response.data.lngs;
  var spot_lats = response.data.lats;
  var spot_relative_counts = response.data.relative_count;

  var center_name = response.data.center_spot_name;
  var center_lng = response.data.center_spot_lng;
  var center_lat = response.data.center_spot_lat;

  var user_name = response.data.user_name

  // Render table
  var render_table = [
    [center_name, 0, 'Last spot in current selected spots'],
    [spot_names[0], spot_distances[0], spot_relative_counts[0]],
    [spot_names[1], spot_distances[1], spot_relative_counts[1]],
    [spot_names[2], spot_distances[2], spot_relative_counts[2]],
    [spot_names[3], spot_distances[3], spot_relative_counts[3]],
    [spot_names[4], spot_distances[4], spot_relative_counts[4]],
    [spot_names[5], spot_distances[5], spot_relative_counts[5]],
    [spot_names[6], spot_distances[6], spot_relative_counts[6]],
    [spot_names[7], spot_distances[7], spot_relative_counts[7]],
    [spot_names[8], spot_distances[8], spot_relative_counts[8]],
    [spot_names[9], spot_distances[9], spot_relative_counts[9]],
  ];
  document.getElementById("recommend_spots").innerHTML = generate_spot_list(render_table);

  // Welcome message
  let text1 = "Hi, "
  let welcome_message = text1.concat(user_name);
  document.getElementById("welcome_message").innerHTML = welcome_message;

  // Google map
  var locations = [
    [center_name, center_lat, center_lng],
    [spot_names[0], spot_lats[0], spot_lngs[0]],
    [spot_names[1], spot_lats[1], spot_lngs[1]],
    [spot_names[2], spot_lats[2], spot_lngs[2]],
    [spot_names[3], spot_lats[3], spot_lngs[3]],
    [spot_names[4], spot_lats[4], spot_lngs[4]],
    [spot_names[5], spot_lats[5], spot_lngs[5]],
    [spot_names[6], spot_lats[6], spot_lngs[6]],
    [spot_names[7], spot_lats[7], spot_lngs[7]],
    [spot_names[8], spot_lats[8], spot_lngs[8]],
    [spot_names[9], spot_lats[9], spot_lngs[9]]
  ];

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(center_lat, center_lng),
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

  const select0 = document.getElementById(render_table[0][0]);
  select0.addEventListener('click', (event) => {
    document.getElementById("test").innerHTML = 'asdf';
    axios.post('http://192.168.58.241:8000/recommend', {
      test: "test"
    }).then((response) => {
      alert(response.data.message);
    })
  });
})

