import './App.css';
import React, {useEffect, useState} from 'react';
import {mappls} from 'mappls-web-maps';

const BASE_URL = "https://gis.radr.in"

function App() {

    const styleMap = {width: '99%', height: '99vh', display: 'inline-block'}
    const mapProps = {center: [28.6330, 77.2194], traffic: false, zoom: 3, geolocation: false, clickableIcons: false}


    const [pts, setPts] = useState([])

    // const [location, setLocation] = useState(null);
    //
    useEffect(() => {

        var mapObject;
        var mapplsClassObject = new mappls();

        mapplsClassObject.initialize("dae6dffdd3bcbc83df741fa48ae06e02", () => {
            mapObject = mapplsClassObject.Map({id: "map", properties: mapProps});
            mapObject.on("load", () => {

                fetch("https://gis.radr.in/line/1/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                }).then(res => res.json())
                    .then(data => {
                            // console.log(data)
                            setPts(data.points)
                            let polylineObject = mapplsClassObject.Polyline(
                                {
                                    map: mapObject,
                                    path: data.points,
                                    strokeColor: '#f1d608',
                                    strokeOpacity: 1.0,
                                    strokeWeight: 10,

                                })
                        }
                    ).catch(err => {
                    console.log(err)
                })

                // let markerObject = mapplsClassObject.Marker({
                //     map: mapObject,
                //     position: {lat: 28.5512908, lng: 77.26809282}
                // });

                let start = mapplsClassObject.Marker({
                    map: mapObject,
                    position: {lat: 10.0456354, lng: 76.3291719},
                    popupHtml: 'Pipe1',
                });

                // let polylineObject = mapplsClassObject.Polyline(
                //     {
                //         map: mapObject,
                //         path: [
                //             {
                //                 "lat": 10.0456354,
                //                 "lng": 76.3291719
                //             },
                //             {
                //                 "lat": 10.0456442,
                //                 "lng": 76.3291579
                //             },
                //             {
                //                 "lat": 10.0459417,
                //                 "lng": 76.3291249
                //             },
                //             {
                //                 "lat": 10.0460364,
                //                 "lng": 76.3292242
                //             },
                //             {
                //                 "lat": 10.0459227,
                //                 "lng": 76.3292173
                //             },
                //             {
                //                 "lat": 10.0459145,
                //                 "lng": 76.3292087
                //             },
                //             {
                //                 "lat": 10.0459618,
                //                 "lng": 76.3291733
                //             },
                //             {
                //                 "lat": 10.0458797,
                //                 "lng": 76.3290578
                //             },
                //             {
                //                 "lat": 10.0517265,
                //                 "lng": 76.3289828
                //             }
                //
                //         ],
                //         strokeColor: '#f1d608',
                //         strokeOpacity: 1.0,
                //         strokeWeight: 10,
                //
                //     })

                // let start = mapplsClassObject.Marker({
                //     map: mapObject,
                //     position: {lat: 28.55108, lng: 77.26913},
                //     popupHtml: 'Pipe1',
                // });
                //
                // let end = mapplsClassObject.Marker({
                //     map: mapObject,
                //     position: {lat: 28.55179, lng: 77.26753},
                //     popupHtml: 'Pipe2',
                // });
                //
                // let valve = mapplsClassObject.Marker({
                //     map: mapObject,
                //     position: {
                //         lat: 28.55099,
                //         lng: 77.26849
                //     },
                //     popupHtml: 'Valve',
                // });


                if ('geolocation' in navigator) {
                    // Use the Geolocation API to get the current location
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            const {latitude, longitude} = position.coords;
                            let currentLocation = mapplsClassObject.Marker({
                                map: mapObject,
                                position: {
                                    lat: latitude,
                                    lng: longitude
                                },
                                popupHtml: 'Current Location',
                            });
                        },
                        (error) => {
                            console.error('Error getting location:', error);
                        }
                    );
                }


                var pts =
                    [
                        {
                            lat: 28.55108,
                            lng: 77.26913
                        },
                        {
                            lat: 28.55106,
                            lng: 77.26906
                        },
                        {
                            lat: 28.55105,
                            lng: 77.26897
                        },
                        {
                            lat: 28.55101,
                            lng: 77.26872
                        },
                        {
                            lat: 28.55099,
                            lng: 77.26849
                        },
                        {
                            lat: 28.55097,
                            lng: 77.26831
                        },
                        {
                            lat: 28.55175,
                            lng: 77.26759
                        },
                        {
                            lat: 28.55177,
                            lng: 77.26755
                        },
                        {
                            lat: 28.55179,
                            lng: 77.26753
                        }
                    ];

                // let polylineObject = mapplsClassObject.Polyline(
                //     {
                //         map: mapObject,
                //         path: pts,
                //         strokeColor: '#f1d608',
                //         strokeOpacity: 1.0,
                //         strokeWeight: 10,
                //     }
                // );


            })
        });

   //     // Check if the Geolocation API is available in the browser
    //     if ('geolocation' in navigator) {
    //         // Use the Geolocation API to get the current location
    //         navigator.geolocation.getCurrentPosition(
    //             (position) => {
    //                 const {latitude, longitude} = position.coords;
    //                 setLocation({latitude, longitude});
    //                 console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)
    //             },
    //             (error) => {
    //                 console.error('Error getting location:', error);
    //             }
    //         );
    //     } else {
    //         console.error('Geolocation is not available in your browser.');
    //     }
    }, []);

    useEffect(() => {
        console.log(pts)
    },[pts]);





    const handleAdd = () => {
        if ('geolocation' in navigator) {
            // Use the Geolocation API to get the current location
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`)

                    // let currentLocation = mapplsClassObject.Marker({
                    //                     map: mapObject,
                    //     position: {
                    //         lat: latitude,
                    //         lng: longitude
                    //     },
                    //     popupHtml: 'Current Location',
                    // });

                    setPts((prev) => [...prev, {lat: latitude, lng: longitude}])


                    // let polylineObject = mapplsClassObject.Polyline(
                    //     {
                    //         map: mapObject,
                    //         path: pts,
                    //         strokeColor: '#f1d608',
                    //         strokeOpacity: 1.0,
                    //         strokeWeight: 10,
                    //     }
                    // );


                    fetch("https://gis.radr.in/line/1/add_point/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "lat": latitude,
                            "lng": longitude,
                        }),
                    }).then(res => res.json())
                        .then(data => {
                                console.log(data)
                            }
                        ).catch(err => {
                        console.log(err)
                    })
                },
            );
        }
    }


    return (
        <div>
            <div id="map" style={styleMap}></div>
            <div className={"addBtn"} onClick={handleAdd}></div>
        </div>
    );
}

export default App;
