export const API_URL = 'http://apitestgis.smartgis.vn:7979/v1';
export const GEOSERVER_SERVICE = 'http://apitestgis.smartgis.vn:8080/geoserver/smartgis_test/wms?bbox={bbox-epsg-3857}&format=image/png&service=WMS&version=1.1.1&request=GetMap&srs=EPSG:3857&transparent=true&width=256&height=256&layers=';

export const url = {
    //AUTH
    AUTH_LOGIN: 'auth/login',
    AUTH_SIGNUP: 'auth/',
    AUTH_LOGOUT: 'auth/logout',
    AUTH_GETPROFILE: 'auth/getProfile/me',

    //ADDRESS
    ADDRESS_PROVINCES: 'location/get-all-province',
    ADDRESS_DISTRICTS: 'location/getDistrictBy/', //id
    ADDRESS_WARDS: 'location/getWardBy/',//id

    //POST
    POST_SEARCH_CUSTOMER: 'post/search-form-by-customer',
    POST_FIND_ONE: 'post/findOne',

    //VIEW POST
    VIEW_POST: 'view-post', //id

    //READ DATA
    READ_DATA: 'read-data',

    //KEY WORD
    KEY_WORD_FIND_ALL: 'key-word/findAll',

    //TYPE MAP  
    TYPE_MAP_FIND_ALL_ACTIVE: 'type-map/getListAllActive'
}