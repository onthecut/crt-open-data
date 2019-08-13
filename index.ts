const fs = require('fs');
const path = require('path');
const axios = require('axios');
const debug = require('debug')('@onthecut/crt-open-data');

export const CACHE_PATH = path.resolve(__dirname, 'data')

export const DATASETS = {
    'canals': 'https://opendata.arcgis.com/datasets/dab91c04078b4deb890c4381f4a7141a_1.geojson',
    'canals-km': 'https://opendata.arcgis.com/datasets/dab91c04078b4deb890c4381f4a7141a_0.geojson',
    'tunnel-portals-public': 'https://opendata.arcgis.com/datasets/4eae02cb24de4cd8bb50216d2e9c972c_0.geojson',
    'winding-holes-public': 'https://opendata.arcgis.com/datasets/217a83d7789f45d6b4baa171ddf9e36f_0.geojson',
    'boat-lift-public': 'https://opendata.arcgis.com/datasets/b5a28a02b1cb4f9f8e98b0ecca550585_0.geojson',
    'dry-docks-public': 'https://opendata.arcgis.com/datasets/48f6c00d34f44735b0a230960432124f_0.geojson',
    'lakes-ponds-and-fisheries-public': 'https://opendata.arcgis.com/datasets/ce60146d79cf4f99a2efe5f72944c106_0.geojson',
    'canal-river-trust-planning-buffer': 'https://opendata.arcgis.com/datasets/724100f301db49a68d3ac3434a7696e1_0.geojson',
    'pumping-stations-public': 'https://opendata.arcgis.com/datasets/77638332361f49e3a76fb23eaf3e0ae4_0.geojson',
    'tunnels-public': 'https://opendata.arcgis.com/datasets/385dcf3b41b94703a01a950968a49581_0.geojson',
    'reservoirs-public': 'https://opendata.arcgis.com/datasets/71fa76ee89e947109e9bfcd76833d5f7_0.geojson',
    'locks-public': 'https://opendata.arcgis.com/datasets/69d977d61a4f4330ae0f864d0ee34cc7_0.geojson',
    'bridges-public': 'https://opendata.arcgis.com/datasets/5beade89b5e74fc08a11e444464e36c7_0.geojson',
    'aqueducts-public': 'https://opendata.arcgis.com/datasets/22dede88fffa43edaff5cde65beac65b_0.geojson',
    'sluices-public': 'https://opendata.arcgis.com/datasets/1edf99de86254b5392ce68da8292a48e_0.geojson',
    'weirs-public': 'https://opendata.arcgis.com/datasets/66aa1332091b46e7ae1ee4117926ea58_0.geojson',
    'culverts-public': 'https://opendata.arcgis.com/datasets/ff8250a255224f75b30d74c05b6c5f13_0.geojson',
    'embankments-public': 'https://opendata.arcgis.com/datasets/796f7f8e2a0f4b3598b9feffa81e8711_0.geojson',
    'outfalls-public': 'https://opendata.arcgis.com/datasets/79bd86ac1e644af5a983685cefcd9476_0.geojson',
    'wharves-public': 'https://opendata.arcgis.com/datasets/9e78f25819884c729af25f9b99c2820c_0.geojson',
    'docks-public': 'https://opendata.arcgis.com/datasets/3d3b807913dc4afa8fd0f6db746b1d14_0.geojson',
    'slipways-public': 'https://opendata.arcgis.com/datasets/86a6cb1afcd444f0afe1e8e9966a60ec_0.geojson',
    'lakes-ponds-and-fisheries-view-public': 'https://opendata.arcgis.com/datasets/93dfc8f5451340b28c43925f89a112b8_0.geojson',
    'embankments-view-public': 'https://opendata.arcgis.com/datasets/9c0fa84ede324ae1bbe61141032c4dc6_0.geojson',
    'bridges-view-public': 'https://opendata.arcgis.com/datasets/bf1a0763582242e4b5243bad98f48dad_0.geojson'
}

export async function download (dataset) {
    const datasetUrl = DATASETS[dataset];
    const datasetCachePath = path.resolve(CACHE_PATH, dataset + '.json');

    const response = await axios(datasetUrl);

    try {
        await fs.promises.writeFile(datasetCachePath, JSON.stringify(response.data, null, 2))
    } catch {
        debug('Failed to write to cache');
    }

    return response.data;
}

export default async function load (dataset) {
    if (!DATASETS[dataset]) {
        throw new Error(`Unknown dataset "${dataset}"`);
    }

    const datasetCachePath = path.resolve(CACHE_PATH, dataset + '.json');
    
    try {
        debug('Trying cache.')
        return JSON.parse(await fs.promises.readFile(datasetCachePath, 'utf8'))
    } catch {
        debug('Downloading dataset.')
    }

    return download(dataset)
}
