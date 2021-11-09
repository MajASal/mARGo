     if(!'geolocation' in navigator){
        console.log('geolocation not available')
    }
    else {
        navigator.geolocation.getCurrentPosition( async position => {
            const lat = position.coords.latitude
            const lon = position.coords.longitude
    
            const data = {lat, lon};
            const options = {
                method : 'POST',
                headers : {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }
            const reponse = await fetch('api', options)
            const jsonData = await reponse.json();
            console.log(jsonData)
    
            convertToUtM(lon, lat)
    
            }) 
            fetch('api/getdata')
            fetch('api/insert')
        }; 

        function convertToUtM(longitude, latitude) {
            var destination = new proj4.Proj("+proj=utm +zone=32 +ellps=intl +units=m +no_defs"); // see http://spatialreference.org/ref/epsg/2078/
            var projection = new proj4.Point(longitude, latitude);   //any object will do as long as it has 'x' and 'y' properties
            var result = proj4.transform(proj4.WGS84,destination, projection);      //do the transformation.  x and y are modified in place
            
            console.log(result)
            let utm32Lat = Math.round(result.x)
            console.log(utm32Lat)
            let utm32Long = Math.round(result.y)
            console.log(utm32Long)
        }

        /**this is a different way of retriving the coordinates of a user
         * uncomment to test it
         * i used geoapfiy for this function
         */
       /*  function getLocation(){
            var requestOptions = {
                method: 'GET',
              };
              fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=1862cc2d9eee4624aa0d4f93a2a0c56b", requestOptions)
                .then(response => response.json())
                .then( result => {
                    const lat = result.location.latitude
                    const long = result.location.longitude
                    console.log(result)
                    convertToUtM(long, lat)
                }).catch(error => console.log('error', error));
               fetch(`api/getdata/${utm32Lat}/${utm32Long}`, requestOptions)
        }
        getLocation() */





