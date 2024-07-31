const policeStations = {
    'B1': { latitude: 10.9921716, longitude: 76.9562735 },
    'B2': { latitude: 11.0054424, longitude: 76.9324248 },
    'B3': { latitude: 10.9979843, longitude: 76.961262 },
    'B4': { latitude: 10.9890605, longitude: 76.958964 },
    'C1': { latitude: 11.0150381, longitude: 76.9656685 },
    'C2': { latitude: 11.0016095, longitude: 76.9689377 },
    'C3': { latitude: 11.0019282, longitude: 76.9715456 },
    'C4': { latitude: 11.026306, longitude: 76.9610092 },
    'D1': { latitude: 11.002793, longitude: 76.9885109 },
    'B10': { latitude: 10.9884479, longitude: 76.9330695 },
    'D3': { latitude: 10.9395281, longitude: 76.9706621 },
    'B14': { latitude: 10.9388611, longitude: 76.9485472 },
    'E2': { latitude: 11.000531, longitude:77.027092817},
    'E1': { latitude: 11.0254131, longitude: 77.0074821 },
    'E3': { latitude: 11.07472, longitude: 77.00018 },
  };

  function getAndCompareLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const userLatitude = position.coords.latitude;
          const userLongitude = position.coords.longitude;

          const nearestStation = findNearestStation(userLatitude, userLongitude);

          displayLocationInfo(userLatitude, userLongitude, nearestStation);
        },
        function (error) {
          console.error("Error getting location:", error.message);
          if (error.code === error.PERMISSION_DENIED) {
            alert("Location permission denied. Please enable location services.");
          }
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function findNearestStation(userLatitude, userLongitude) {
    let nearestStation = '';
    let minDistance = Number.MAX_SAFE_INTEGER;
    let iterations = 100;

    for (const station in policeStations) {
      const stationLatitude = policeStations[station].latitude;
      const stationLongitude = policeStations[station].longitude;

      const distance = vincenty(userLatitude, userLongitude, stationLatitude, stationLongitude);

      if (distance < minDistance) {
        minDistance = distance;
        nearestStation = station;
      }
    }

    return nearestStation;
  }

  function displayLocationInfo(userLatitude, userLongitude, nearestStation) {
    const locationInfoElement = document.getElementById("location-info");

    // Display the result
    locationInfoElement.innerHTML =
      `Your Location: Latitude ${userLatitude}, Longitude ${userLongitude}<br>` +
      `Nearest Police Station: ${nearestStation}<br>` +
      `<button onclick="openMap(${userLatitude}, ${userLongitude}, '${nearestStation}')">Open Map</button>`;
  }

  function openMap(userLatitude, userLongitude, nearestStation) {
    const station = policeStations[nearestStation];
    const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLatitude},${userLongitude}&destination=${station.latitude},${station.longitude}`;
    window.open(mapUrl, '_blank');
  }

  function vincenty(lat1, lon1, lat2, lon2) {
    const a = 6378137; // semi-major axis of the ellipsoid in meters
    const f = 1 / 298.257223563; // flattening
    const b = (1 - f) * a; // semi-minor axis
    let iterations = 100;

    const phi1 = deg2rad(lat1);
    const phi2 = deg2rad(lat2);
    const lambda1 = deg2rad(lon1);
    const lambda2 = deg2rad(lon2);

    const U1 = Math.atan((1 - f) * Math.tan(phi1));
    const U2 = Math.atan((1 - f) * Math.tan(phi2));
    const L = lambda2 - lambda1;
    const sinU1 = Math.sin(U1);
    const cosU1 = Math.cos(U1);
    const sinU2 = Math.sin(U2);
    const cosU2 = Math.cos(U2);

    let lambda = L;
    let lambdaP, sinSigma, cosSigma, sigma, sinAlpha, cosSqAlpha, cos2SigmaM, C;

    do {
      const sinLambda = Math.sin(lambda);
      const cosLambda = Math.cos(lambda);
      sinSigma = Math.sqrt((cosU2 * sinLambda) ** 2 + (cosU1 * sinU2 - sinU1 * cosU2 * cosLambda) ** 2);
      cosSigma = sinU1 * sinU2 + cosU1 * cosU2 * cosLambda;
      sigma = Math.atan2(sinSigma, cosSigma);
      sinAlpha = cosU1 * cosU2 * sinLambda / sinSigma;
      cosSqAlpha = 1 - sinAlpha ** 2;
      cos2SigmaM = cosSigma - 2 * sinU1 * sinU2 / cosSqAlpha;
      C = f / 16 * cosSqAlpha * (4 + f * (4 - 3 * cosSqAlpha));
      lambdaP = lambda;
      lambda = L + (1 - C) * f * sinAlpha * (sigma + C * sinSigma * (cos2SigmaM + C * cosSigma * (-1 + 2 * cos2SigmaM ** 2)));
    } while (Math.abs(lambda - lambdaP) > 1e-12 && --iterations > 0);

    if (iterations === 0) {
      console.warn("Vincenty formula did not converge.");
      return NaN;
    }

    const uSq = cosSqAlpha * (a ** 2 - b ** 2) / (b ** 2);
    const A = 1 + uSq / 16384 * (4096 + uSq * (-768 + uSq * (320 - 175 * uSq)));
    const B = uSq / 1024 * (256 + uSq * (-128 + uSq * (74 - 47 * uSq)));
    const deltaSigma = B * sinSigma * (cos2SigmaM + B / 4 * (cosSigma * (-1 + 2 * cos2SigmaM ** 2) - B / 6 * cos2SigmaM * (-3 + 4 * sinSigma ** 2) * (-3 + 4 * cos2SigmaM ** 2)));
    const s = b * A * (sigma - deltaSigma);

    return s;
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }

  function compareLocationManually() {
    const inputLatitude = parseFloat(document.getElementById("latitude").value);
    const inputLongitude = parseFloat(document.getElementById("longitude").value);

    if (!isNaN(inputLatitude) && !isNaN(inputLongitude)) {
      const nearestStation = findNearestStation(inputLatitude, inputLongitude);
      displayLocationInfo(inputLatitude, inputLongitude, nearestStation);
    } else {
      alert("Please enter valid latitude and longitude.");
    }
  }