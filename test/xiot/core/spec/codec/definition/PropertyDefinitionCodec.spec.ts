import { expect } from 'chai';
import 'mocha';
import {diff} from 'yajsondiff'
import * as fs from 'async-file';
import {PropertyDefinitionCodec} from "../../../../../../src/xiot/core/spec/codec/definition/PropertyDefinitionCodec";

describe('PropertyDefinitionCodec', async () => {

    let folder = './resources/spec/xiot/definition/properties/';
    let dir = await fs.readdir(folder);

    it('reading properties, folder: ' + folder, () => {
        expect(true).to.equal(true);
    });

    for (const file of dir) {
        it('  check: ' + file, async () => {
            let a = await fs.readFile(folder + file);
            const json = JSON.parse(a.toString());
            const def = PropertyDefinitionCodec.decode(json);

            const differences = diff(json, PropertyDefinitionCodec.encode(def));
            if (differences == null) {
                expect(true).to.equal(true);
            } else {
                expect(JSON.stringify(json)).to.equal(JSON.stringify(PropertyDefinitionCodec.encode(def)));
            }
        });
    }
});
