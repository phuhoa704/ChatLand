import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { centerCoorProps } from "./props";
import SideDrawer from "../../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { findOnePostById, readData, searchListPlanning, viewPostById } from "../../redux/apis/Planning";
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css'
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
import './style.scss';
import { GEOSERVER_SERVICE } from "../../configs/apiUrl";
import { saveCoordinates, saveSidebar } from "../../redux/slices/Common";
import { Sidebar } from 'primereact/sidebar';
import { Message } from 'primereact/message';
import { findAllKeywords } from "../../redux/apis/Keywords";
import { Button } from 'primereact/button';
import { getProvinces } from "../../redux/apis/Address";
import { getTypeMap } from "../../redux/apis/TypeMap";
import LayerPicker from "../../components/LayerPicker";
import axios from "axios";
import ModalSearch from "../../components/ModalSearch";
import HeaderPlaning from "../../components/Header";

// const accessToken = 'pk.eyJ1IjoicGhpbGhucTIwMDEiLCJhIjoiY2t6b3gyMnY1NjMwczJ3bXpzNHV1aTFqZCJ9.3Iyto1HJPC3fieRx-aTWlg';
const accessToken = 'pk.eyJ1IjoidGhvbmd0aW5sYW5kIiwiYSI6ImNsZHh5aDk2ZDBsaGQzcG52M240dTJtaDUifQ.bsuTcIH_fvF0T000bsG2tg';
mapboxgl.accessToken = accessToken;

interface MultipleSlidersLabel {
    label: string,
    layer: string
}

const Planning = () => {
    const dispatch = useAppDispatch();
    const data = useAppSelector(state => state.planning.readData);
    const keywords = useAppSelector(state => state.keyword.list);
    const postById = useAppSelector(state => state.planning.postById);
    const [centerCoor, setCenterCoor] = useState<centerCoorProps>({
        latCenter: 10.026228,
        lngCenter: 105.751445
    });
    const [showSlider, setShowSlider] = useState<boolean>(false);
    const [showSidebarInfor, setShowSidebarInfor] = useState<boolean>(false);
    const [distance, setDistance] = useState('');
    const [distanceMarkers, setDistanceMarkers] = useState<any[]>([]);
    const mapRef = useRef<any>(null);
    const mapContainer = useRef(null);
    const markerRef = useRef<any>(null);
    const [sourceIds, setSourceIds] = useState<string[]>([]);
    const [layerIds, setLayerIds] = useState<string[]>([]);
    const [multipleMode, setMultipleMode] = useState<boolean>(false);
    const [multipleSlidersLabel, setMultipleSlidersLabel] = useState<MultipleSlidersLabel[]>([]);
    const [current, setCurrent] = useState<'road' | 'satellite'>('satellite');
    const [currentLocation, setCurrentLocation] = useState<string>('');
    const getPosition = async () => {
        return new Promise((resolve, reject) => {
            if (!("geolocation" in navigator)) {
                reject();
            } else {
                navigator.geolocation.getCurrentPosition(position => {
                    var latitude = position.coords.latitude;
                    var longitude = position.coords.longitude;
                    resolve({ latitude, longitude });
                }, error => resolve(null))
            };
        })
    };
    const getCurrentLocation = async (lat: any, lng: any) => {
        let url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`;
        let config = {
            method: 'GET',
            url: url
        }
        await axios(config).then((res: any) => {
            let location = '';
            res?.data.features[0].context.forEach((item: any) => {
                location += ', ' + item?.text;
            })
            setCurrentLocation(location.slice(1, location.length))
        }).catch((err: any) => {
            console.log(err)
        })
    }
    useEffect(() => {
        dispatch(findAllKeywords([]));
        dispatch(getProvinces([]));
        dispatch(getTypeMap([]));
        getPosition().then((value: any) => {
            if (value) {
                setCenterCoor({
                    latCenter: value.latitude,
                    lngCenter: value.longitude
                })
            }
        });
    }, []);
    useEffect(() => {
        if (mapRef.current) return;
        mapRef.current = new mapboxgl.Map({
            container: "map", // container ID
            center: [centerCoor.lngCenter, centerCoor.latCenter],
            maxZoom: 24,
            zoom: 12, // starting zoom.
            attributionControl: false,
        });
        let tileLayer: any = {
            version: 8,
            sources: {
                "raster-tiles": {
                    type: "raster",
                    tiles: [
                        `https://mt1.google.com/vt/lyrs=s&hl=vi&x={x}&y={y}&z={z}`,
                    ],
                    tileSize: 256,
                },
            },
            layers: [
                {
                    id: "simple-tiles",
                    type: "raster",
                    source: "raster-tiles",
                    minzoom: 0,
                    maxzoom: 24,
                },
            ],
        };
        mapRef.current.setStyle(tileLayer);
        mapRef.current.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
        mapRef.current.addControl(new mapboxgl.ScaleControl());
        mapRef.current.addControl(new mapboxgl.FullscreenControl(), 'bottom-right');
        mapRef.current.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
            }), 'bottom-right'
        );
        //draw control
        let Draw = new MapboxDraw({
            displayControlsDefault: false,
            controls: {
                line_string: true,
                polygon: true,
                trash: true,
            },
        });
        mapRef.current.addControl(Draw, 'bottom-right');
        mapRef.current.on('load', () => {
            mapRef.current.on('draw.create', function (e: any) {
                if (e?.features[0]?.geometry?.type === 'LineString') {
                    let coord: any = [];
                    let markers: any = [];
                    e.features[0].geometry.coordinates.forEach((item: any, idx: number) => {
                        coord.push(item);
                        if (idx < e.features[0]?.geometry?.coordinates?.length - 1) {
                            let currentPoint = item;
                            let nextPoint = e.features[0].geometry.coordinates[idx + 1];
                            let lineString = turf.lineString([currentPoint, nextPoint]);
                            let lengthLine = turf?.length(lineString, { units: 'kilometers' });
                            let midPoint: [number, number] = [parseFloat(((currentPoint[0] + nextPoint[0]) / 2).toString()), parseFloat(((currentPoint[1] + nextPoint[1]) / 2).toString())];
                            const elm = document.createElement('div');
                            elm.className = 'distance_marker';
                            elm.innerHTML = lengthLine.toFixed(3).toString() + 'km';
                            let mark = new mapboxgl.Marker(elm).setLngLat(midPoint).addTo(mapRef.current);
                            markers.push(mark);
                        }
                    })
                    distanceMarkers.push({
                        id: e.features[0].id,
                        markers
                    })
                    let line = turf.lineString(coord);
                    let length = turf?.length(line, { units: 'kilometers' })
                    setDistance(length.toFixed(1));
                }
                if (e?.features[0]?.geometry?.type === 'Polygon') {
                    let area = turf.area({
                        type: 'FeatureCollection',
                        features: e.features
                    });
                    const elm = document.createElement('div');
                    elm.className = 'distance_marker';
                    elm.innerHTML = area.toFixed(3).toString() + `m<sup>2</sup>`;
                    let bbox = turf.bbox(e.features[0]);
                    let llb = new mapboxgl.LngLatBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]);
                    let marker = new mapboxgl.Marker(elm).setLngLat(llb.getCenter()).addTo(mapRef.current);
                    distanceMarkers.push({
                        id: e.features[0].id,
                        markers: marker
                    })
                }
            })
            mapRef.current.on('draw.delete', function (e: any) {
                if (e.features[0].geometry.type === 'LineString') {
                    setDistance('');
                    distanceMarkers.forEach((item: any) => {
                        if (item.id === e.features[0].id) {
                            item.markers.forEach((it: any) => {
                                it.remove();
                            })
                        }
                    })
                    let idx = distanceMarkers.findIndex((item: any) => item.id === e.features[0].id);
                    distanceMarkers.splice(idx, 1);
                }
                if (e.features[0].geometry.type === 'Polygon') {
                    distanceMarkers.forEach((item: any) => {
                        if (item.id === e.features[0].id) {
                            item.markers.remove();
                        }
                    })
                    let idx = distanceMarkers.findIndex((item: any) => item.id === e.features[0].id);
                    distanceMarkers.splice(idx, 1);
                }
                console.log(Draw.getAll());
                if (Draw.getAll().features.length === 0) {
                    mapRef.current.on('click', eventFindMaps);
                }
            })
            mapRef.current.on('draw.update', function (e: any) {
                if (e.features[0].geometry.type === 'LineString') {
                    if ((e.features?.length > 0) && (e.action === 'change_coordinates')) {
                        let coord: any = [];
                        let markerNewCoor: any[] = [];
                        let markerNewLength: any[] = [];
                        e.features[0].geometry.coordinates.forEach((item: any, idx: number) => {
                            coord.push(item);
                            if (idx < e.features[0].geometry.coordinates?.length - 1) {
                                let currentPoint = item;
                                let nextPoint = e.features[0].geometry.coordinates[idx + 1];
                                let lineString = turf.lineString([currentPoint, nextPoint]);
                                let lengthLine = turf?.length(lineString, { units: 'kilometers' });
                                let midPoint: [number, number] = [parseFloat(((currentPoint[0] + nextPoint[0]) / 2).toString()), parseFloat(((currentPoint[1] + nextPoint[1]) / 2).toString())];
                                markerNewCoor.push(midPoint);
                                markerNewLength.push(lengthLine)
                            }
                        })
                        distanceMarkers.forEach((item: any) => {
                            if (item.id === e.features[0].id) {
                                item.markers.forEach((it: any, idx: number) => {
                                    it.setLngLat(markerNewCoor[idx])
                                    it.getElement().innerHTML = markerNewLength[idx].toFixed(3).toString() + 'km'
                                })
                            }
                        })

                        let line = turf.lineString(coord);
                        let length = turf?.length(line, { units: 'kilometers' })
                        setDistance(length.toFixed(1));
                    }
                    if ((e.features?.length > 0) && (e.action === 'move')) {
                        let markerNewCoor: any[] = [];
                        e.features[0].geometry.coordinates.forEach((item: any, idx: number) => {
                            if (idx < e.features[0].geometry.coordinates?.length - 1) {
                                let currentPoint = item;
                                let nextPoint = e.features[0].geometry.coordinates[idx + 1];
                                let midPoint: [number, number] = [parseFloat(((currentPoint[0] + nextPoint[0]) / 2).toString()), parseFloat(((currentPoint[1] + nextPoint[1]) / 2).toString())];
                                markerNewCoor.push(midPoint);
                            }
                        })
                        distanceMarkers.forEach((item: any) => {
                            if (item.id === e.features[0].id) {
                                item.markers.forEach((it: any, idx: number) => {
                                    it.setLngLat(markerNewCoor[idx])
                                })
                            }
                        })
                    }
                }
                if (e.features[0].geometry.type === 'Polygon') {
                    let area = turf.area({
                        type: 'FeatureCollection',
                        features: e.features
                    });
                    let bbox = turf.bbox(e.features[0]);
                    let llb = new mapboxgl.LngLatBounds([bbox[0], bbox[1]], [bbox[2], bbox[3]]);
                    distanceMarkers.forEach((item: any) => {
                        if (item.id === e.features[0].id) {
                            item.markers.setLngLat(llb.getCenter());
                            item.markers.getElement().innerHTML = area.toFixed(3).toString() + `m<sup>2</sup>`;
                        }
                    })
                }
            })
            mapRef.current.on('click', eventFindMaps);
            mapRef.current.on('draw.modechange', (e: any) => {
                mapRef.current.off('click', eventFindMaps);
            })
        })
    }, []);
    useEffect(() => {
        getCurrentLocation(centerCoor.latCenter, centerCoor.lngCenter);
        dispatch(saveCoordinates(`${centerCoor.latCenter}, ${centerCoor.lngCenter}`))
        dispatch(searchListPlanning({
            coordinates: `${centerCoor.latCenter}, ${centerCoor.lngCenter}`,
            district_id: null,
            province_id: null,
            Title: null,
            typeMapId: null,
            wards: null
        }))
    }, [centerCoor]);

    const handleOnClick = async (Id: number) => {
        let rs: any = await dispatch(viewPostById(Id));
        if (rs.payload.action) {
            const data = rs.payload.data;
            const dataLayer = rs.payload.data.PostLayer;
            const sourceName = `source-${data.Id}`;
            const layerName = `layer-${data.Id}`;
            if (!multipleMode) {
                sourceIds.forEach(item => {
                    if (mapRef.current.getSource(item)) {
                        mapRef.current.removeSource(item)
                    }
                })
                layerIds.forEach(item => {
                    if (mapRef.current.getLayer(item)) {
                        mapRef.current.removeLayer(item)
                    }
                })
                let index = multipleSlidersLabel.findIndex(item => item.layer === layerName);
                setMultipleSlidersLabel(multipleSlidersLabel.splice(index, 1));
            }
            if (mapRef.current.getSource(sourceName) && mapRef.current.getLayer(layerName)) {
                mapRef.current.flyTo({
                    center: [data.Lng, data.Lat],
                    zoom: 15
                });
            } else {
                mapRef.current.addSource(`source-${data.Id}`, {
                    type: 'raster',
                    tiles: [
                        `${GEOSERVER_SERVICE}${dataLayer.FileUpload.name_source}`
                    ],
                    tileSize: 256,
                    maxzoom: 24,
                    minzoom: 1,
                });
                mapRef.current.addLayer({
                    'id': `layer-${data.Id}`,
                    'type': 'raster',
                    'source': `source-${data.Id}`,
                    'maxzoom': 24,
                    'minzoom': 1,
                    'paint': {
                        'raster-resampling': 'nearest'
                    },
                });
                mapRef.current.flyTo({
                    center: [data.Lng, data.Lat],
                    zoom: 15
                });
                dispatch(saveSidebar(false));
                setMultipleSlidersLabel([...multipleSlidersLabel, { label: data.title, layer: `layer-${data.Id}` }]);
                setShowSlider(true);
                setSourceIds([...sourceIds, `source-${data.Id}`]);
                setLayerIds([...layerIds, `layer-${data.Id}`]);
                mapRef.current.off('click', eventFindMaps);
            }
        }
    }

    const eventFindMaps = (e: any) => {
        if (markerRef.current) {
            markerRef.current.remove();
        }
        dispatch(saveSidebar(true));
        dispatch(searchListPlanning({
            coordinates: `${e.lngLat.lat}, ${e.lngLat.lng}`,
            district_id: null,
            province_id: null,
            Title: null,
            typeMapId: null,
            wards: null
        }));
        getCurrentLocation(e.lngLat.lat, e.lngLat.lng);
        markerRef.current = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(mapRef.current);
    }

    const handleChangeMapStyle = () => {
        layerIds.forEach((item, index) => {
            if (mapRef.current.getLayer(item)) {
                mapRef.current.removeLayer(item)
            }
            mapRef.current.addLayer({
                'id': item,
                'type': 'raster',
                'source': sourceIds.find((it, idx) => idx === index),
                'paint': {},
            });
        })
        if (current === 'road') {
            setCurrent('satellite');
            let tileLayer: any = {
                version: 8,
                sources: {
                    "raster-tiles": {
                        type: "raster",
                        tiles: [
                            `https://mt1.google.com/vt/lyrs=s&hl=vi&x={x}&y={y}&z={z}`,
                        ],
                        tileSize: 256,
                    },
                },
                layers: [
                    {
                        id: "simple-tiles",
                        type: "raster",
                        source: "raster-tiles",
                        minzoom: 0,
                        maxzoom: 22,
                    },
                ],
            };
            mapRef.current.setStyle(tileLayer);
        }
        if (current === 'satellite') {
            setCurrent('road');
            mapRef.current.setStyle('mapbox://styles/mapbox/streets-v12')
        }
    }
    return (
        <>
            <div style={{ width: '100%', height: '100vh', position: 'relative', zIndex: 1 }}>
                <SideDrawer handleOnClick={handleOnClick} currentLocation={currentLocation} />
                <Sidebar className="side_list" visible={showSidebarInfor} position="right" onHide={() => setShowSidebarInfor(false)}>
                    {(Object.keys(data).length > 0) ? (
                        <>
                            <div className="flex align-items-center justify-content-between mb-2">
                                <span className="text-900 font-medium text-lg">{data.data_file.name}</span>
                            </div>
                            {Object.keys(data.data).map(item => {
                                let finder = keywords.find(it => it.Key === item)
                                return (
                                    <div className="grid">
                                        <div className="col-6">
                                            <span className="text-600 font-medium text-sm">{finder ? finder.Value : item}</span>
                                        </div>
                                        <div className="col-6">
                                            <span className="text-600 font-medium text-sm">{data.data[item]}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </>
                    ) : <Message text='Không tìm thấy thông tin' />}
                </Sidebar>
                <Button style={{ zIndex: 100, position: 'absolute', bottom: 10, right: 50, fontSize: 12, padding: '8px 10px' }} icon='pi pi-map' label={multipleMode ? 'Chế độ lồng ghép' : 'Chế độ đơn'} onClick={() => setMultipleMode(!multipleMode)} />
                <LayerPicker current={current} setCurrent={handleChangeMapStyle} style={{ position: 'absolute', bottom: 50, right: 50, height: 65, width: 65, padding: 2, zIndex: 1 }} />
                <div className={`map-overlay surface-card shadow-2 border-round ${showSlider ? 'opacity-100' : 'opacity-0'}`}>
                    {multipleSlidersLabel.map(item => (
                        <div className="map-overlay-inner" key={item.layer}>
                            <label>{item.label}</label>
                            <input id="slider"
                                onChange={(e) => mapRef.current.setPaintProperty(
                                    item.layer,
                                    'raster-opacity',
                                    parseInt(e.target.value, 10) / 100
                                )} type="range" min="0" max="100" step="0" defaultValue={100}
                            />
                        </div>
                    ))}
                </div>
                <div id='map' style={{ height: '100%' }} ref={mapContainer}>
                </div>
            </div>
        </>
    );
}

export default Planning;