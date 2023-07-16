export interface searchListPlanningDto {
    Title: string | null,
    province_id: string | null,
    district_id: string | null,
    wards: string | null,
    typeMapId: number | null,
    coordinates: string | null
}

export interface readDataDto {
    name_source: string | null,
    lat: string | null,
    lng: string | null,
    x: number | null,
    y: number | null,
    width: number | null,
    height: number | null,
    count: number | null
}