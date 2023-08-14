let map;
let marker;

// MAP
const getOnMap = (lat, lng) => {
  if (!map) {
    map = L.map("map").setView([lat, lng], 13);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "© OpenStreetMap",
    }).addTo(map);
  } else {
    map.setView([lat, lng], 13);
  }
};

// Function to fetch user IP
function getUserIPAddress() {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${'at_ZMnAYUxbk77vz7GaMGW8LjvcnptOr'}`
  )
    .then((response) => response.json())
    .then((data) => {
      const ipAddress = data.ip;
      console.log("User IP Address:", ipAddress);
      console.log(data);
      document.getElementById("IP-ADD").innerHTML = data.ip;
      document.getElementById("location").innerHTML =
        data.location.country +
        ", " +
        data.location.city +
        " " +
        data.location.postalCode;
      document.getElementById("timezone").innerHTML = data.location.timezone;
      document.getElementById("ISP").innerHTML = data.isp;
      getOnMap(data.location.lat, data.location.lng);

      if (map) {
        if (marker) {
          marker.remove();
        }
        marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
      }
    })
    .catch((error) => {
      console.error("Error fetching IP address:", error);
    });
}

function getUserIPAddressLocation(ipA) {
  fetch(
    `https://geo.ipify.org/api/v2/country,city?apiKey=${'at_ZMnAYUxbk77vz7GaMGW8LjvcnptOr'}&ipAddress=${ipA}`
  )
    .then((response) => response.json())
    .then((data) => {
      const ipAddress = data.ip;
      console.log("User IP Address:", ipAddress);
      console.log(data);
      document.getElementById("IP-ADD").innerHTML = data.ip;
      document.getElementById("location").innerHTML =
        data.location.country +
        ", " +
        data.location.city +
        " " +
        data.location.postalCode;
      document.getElementById("timezone").innerHTML = data.location.timezone;
      document.getElementById("ISP").innerHTML = data.isp;
      getOnMap(data.location.lat, data.location.lng);

      if (map) {
        if (marker) {
          marker.remove();
        }
        marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
      }
    })
    .catch((error) => {
      console.error("Error fetching IP address:", error);
    });
}

// Call the function when the page loads
window.addEventListener("load", getUserIPAddress());

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault(); // Prevents the default form submission
  const formData = document.getElementById("searchInput").value;
  getUserIPAddressLocation(formData);
});
