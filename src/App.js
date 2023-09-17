import './App.css';
import {mappls} from 'mappls-web-maps';


function App() {

    const styleMap = {width: '99%', height: '99vh', display: 'inline-block'}
    const mapProps = {center: [28.6330, 77.2194], traffic: false, zoom: 10, geolocation: false, clickableIcons: false}
    var mapObject;
    var mapplsClassObject = new mappls();

    mapplsClassObject.initialize("dae6dffdd3bcbc83df741fa48ae06e02", () => {
        mapObject = mapplsClassObject.Map({id: "map", properties: mapProps});
        mapObject.on("load", () => {

            // let markerObject = mapplsClassObject.Marker({
            //     map: mapObject,
            //     position: {lat: 28.5512908, lng: 77.26809282}
            // });

            let start = mapplsClassObject.Marker({
                map: mapObject,
                position: {lat: 28.55108, lng: 77.26913},
                popupHtml: 'Pipe1',
            });

            let end = mapplsClassObject.Marker({
                map: mapObject,
                position: {lat: 28.55179, lng: 77.26753},
                popupHtml: 'Pipe2',
            });

            let valve = mapplsClassObject.Marker({
                map: mapObject,
                position: {
                    lat: 28.55099,
                    lng: 77.26849
                },
                popupHtml: 'Valve',
            });


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


    return (
        <div>
            <div id="map" style={styleMap}></div>
        </div>
    );
}

export default App;
