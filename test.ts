import load, { DATASETS } from '.';
import * as test from 'tape';

const names = Object.keys(DATASETS)

test('download and load', async t => {
    for (let index = 0; index < names.length; index++) {
        const dsName = names[index];
        const ds = await load(dsName)
        t.ok(ds.features.length > 0, `${dsName} contains features`)
    }

    for (let index = 0; index < names.length; index++) {
        const dsName = names[index];
        const ds = await load(dsName)
        t.ok(ds.features.length > 0, `${dsName} contains features`)
    }

    t.end()
})
