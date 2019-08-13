# onthecut / crt-open-data

> Canal and River Trust Open Data Loader

## Install

    npm install @onthecut/crt-open-data

## API

```js
import loadDataset, { DATASETS } from '@onthecut/crt-open-data';

const canals = await loadDataset('canals');
// >
// { type: 'FeatureCollection',
//  features:
//   [ { type: 'Feature', properties: [Object], geometry: [Object] },
//     { type: 'Feature', properties: [Object], geometry: [Object] },
// ...
```

## Datasets

- canals
- canals-km
- tunnel-portals-public
- winding-holes-public
- boat-lift-public
- dry-docks-public
- lakes-ponds-and-fisheries-public
- canal-river-trust-planning-buffer
- pumping-stations-public
- tunnels-public
- reservoirs-public
- locks-public
- bridges-public
- aqueducts-public
- sluices-public
- weirs-public
- culverts-public
- embankments-public
- outfalls-public
- wharves-public
- docks-public
- slipways-public
- lakes-ponds-and-fisheries-view-public
- embankments-view-public
- bridges-view-public


## Licence

The licences covering CRTs open data can be found on the relevant dataset page on https://data-canalrivertrust.opendata.arcgis.com.

This data loader module is released under the MIT licence.
