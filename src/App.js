import './App.css';
import React, {useEffect, useState} from 'react';
import {mappls} from 'mappls-web-maps';


function App() {

    // const [location, setLocation] = useState(null);
    //
    // useEffect(() => {
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
    // }, []);

    const styleMap = {width: '99%', height: '99vh', display: 'inline-block'}
    const mapProps = {center: [28.6330, 77.2194], traffic: false, zoom: 3, geolocation: false, clickableIcons: false}
    var mapObject;
    var mapplsClassObject = new mappls();

    mapplsClassObject.initialize("dae6dffdd3bcbc83df741fa48ae06e02", () => {
        mapObject = mapplsClassObject.Map({id: "map", properties: mapProps});
        mapObject.on("load", () => {

            // let markerObject = mapplsClassObject.Marker({
            //     map: mapObject,
            //     position: {lat: 28.5512908, lng: 77.26809282}
            // });

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

            let polylineObject = mapplsClassObject.Polyline(
                {
                    map: mapObject,
                    path: pts,
                    strokeColor: '#f1d608',
                    strokeOpacity: 1.0,
                    strokeWeight: 10,
                }
            );


        })
    });

    const [pts, setPts] = useState([])

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


                    let polylineObject = mapplsClassObject.Polyline(
                        {
                            map: mapObject,
                            path: pts,
                            strokeColor: '#f1d608',
                            strokeOpacity: 1.0,
                            strokeWeight: 10,
                        }
                    );


                    fetch("http://gis.radr.in/line/1/add_point/", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            "lat": latitude,
                            "long": longitude,
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
            <div className={"addBtn"} onClick={handleAdd}>ADD</div>
        </div>
    );
}

export default App;
