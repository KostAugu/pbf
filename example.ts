
const Tile_GeomType = {
    "UNKNOWN": {
        "value": 0,
        "options": {}
    },
    "POINT": {
        "value": 1,
        "options": {}
    },
    "LINESTRING": {
        "value": 2,
        "options": {}
    },
    "POLYGON": {
        "value": 3,
        "options": {}
    }
};

// Tile_Value ========================================

const Tile_Value_readField = (tag, obj, pbf) => {
    if (tag === 1) obj.string_value = pbf.readString();
    else if (tag === 2) obj.float_value = pbf.readFloat();
    else if (tag === 3) obj.double_value = pbf.readDouble();
    else if (tag === 4) obj.int_value = pbf.readVarint(true);
    else if (tag === 5) obj.uint_value = pbf.readVarint();
    else if (tag === 6) obj.sint_value = pbf.readSVarint();
    else if (tag === 7) obj.bool_value = pbf.readBoolean();
};
const Tile_Value_read = (pbf, end) => pbf.readFields(Tile_Value_readField, {string_value: "", float_value: 0, double_value: 0, int_value: 0, uint_value: 0, sint_value: 0, bool_value: false}, end);
const Tile_Value_write = (obj, pbf) => {
    if (obj.string_value) pbf.writeStringField(1, obj.string_value);
    if (obj.float_value) pbf.writeFloatField(2, obj.float_value);
    if (obj.double_value) pbf.writeDoubleField(3, obj.double_value);
    if (obj.int_value) pbf.writeVarintField(4, obj.int_value);
    if (obj.uint_value) pbf.writeVarintField(5, obj.uint_value);
    if (obj.sint_value) pbf.writeSVarintField(6, obj.sint_value);
    if (obj.bool_value) pbf.writeBooleanField(7, obj.bool_value);
};

const Tile_Value = {
    read: Tile_Value_read,
    write: Tile_Value_write,
};


// Tile_Envelope__FieldEntry1 ========================================

const Tile_Envelope__FieldEntry1_readField = (tag, obj, pbf) => {
    if (tag === 1) obj.key = pbf.readString();
    else if (tag === 2) obj.value = pbf.readString();
};
const Tile_Envelope__FieldEntry1_read = (pbf, end) => pbf.readFields(Tile_Envelope__FieldEntry1_readField, {key: "", value: ""}, end);
const Tile_Envelope__FieldEntry1_write = (obj, pbf) => {
    if (obj.key) pbf.writeStringField(1, obj.key);
    if (obj.value) pbf.writeStringField(2, obj.value);
};

const Tile_Envelope__FieldEntry1 = {
    read: Tile_Envelope__FieldEntry1_read,
    write: Tile_Envelope__FieldEntry1_write,
};


// Tile_Envelope__FieldEntry2 ========================================

const Tile_Envelope__FieldEntry2_readField = (tag, obj, pbf) => {
    if (tag === 1) obj.key = pbf.readString();
    else if (tag === 2) obj.value = pbf.readVarint(true);
};
const Tile_Envelope__FieldEntry2_read = (pbf, end) => pbf.readFields(Tile_Envelope__FieldEntry2_readField, {key: "", value: 0}, end);
const Tile_Envelope__FieldEntry2_write = (obj, pbf) => {
    if (obj.key) pbf.writeStringField(1, obj.key);
    if (obj.value) pbf.writeVarintField(2, obj.value);
};

const Tile_Envelope__FieldEntry2 = {
    read: Tile_Envelope__FieldEntry2_read,
    write: Tile_Envelope__FieldEntry2_write,
};


// Tile_Envelope ========================================

const Tile_Envelope_readField = (tag, obj, pbf) => {
    if (tag === 1)  { const entry = Tile_Envelope__FieldEntry1.read(pbf, pbf.readVarint() + pbf.pos); obj.kv[entry.key] = entry.value; }
    else if (tag === 2)  { const entry = Tile_Envelope__FieldEntry2.read(pbf, pbf.readVarint() + pbf.pos); obj.kn[entry.key] = entry.value; }
};
const Tile_Envelope_read = (pbf, end) => pbf.readFields(Tile_Envelope_readField, {kv: {}, kn: {}}, end);
const Tile_Envelope_write = (obj, pbf) => {
    if (obj.kv) for (const i in obj.kv) if (Object.prototype.hasOwnProperty.call(obj.kv, i)) pbf.writeMessage(1, Tile_Envelope__FieldEntry1.write, { key: i, value: obj.kv[i] });
    if (obj.kn) for (const i in obj.kn) if (Object.prototype.hasOwnProperty.call(obj.kn, i)) pbf.writeMessage(2, Tile_Envelope__FieldEntry2.write, { key: i, value: obj.kn[i] });
};

const Tile_Envelope = {
    read: Tile_Envelope_read,
    write: Tile_Envelope_write,
    _FieldEntry1: Tile_Envelope__FieldEntry1,
    _FieldEntry2: Tile_Envelope__FieldEntry2,
};


// Tile_Feature_Deep ========================================

const Tile_Feature_Deep_readField = (tag, obj, pbf) => {
    if (tag === 1) obj.deep_prop = pbf.readVarint();
};
const Tile_Feature_Deep_read = (pbf, end) => pbf.readFields(Tile_Feature_Deep_readField, {deep_prop: 0}, end);
const Tile_Feature_Deep_write = (obj, pbf) => {
    if (obj.deep_prop) pbf.writeVarintField(1, obj.deep_prop);
};

const Tile_Feature_Deep = {
    read: Tile_Feature_Deep_read,
    write: Tile_Feature_Deep_write,
};


// Tile_Feature ========================================

const Tile_Feature_readField = (tag, obj, pbf) => {
    if (tag === 1) obj.id = pbf.readVarint();
    else if (tag === 2) pbf.readPackedVarint(obj.tags);
    else if (tag === 3) obj.type = pbf.readVarint();
    else if (tag === 4) pbf.readPackedVarint(obj.geometry);
    else if (tag === 5) obj.deep.push(Tile_Feature_Deep.read(pbf, pbf.readVarint() + pbf.pos));
};
const Tile_Feature_read = (pbf, end) => pbf.readFields(Tile_Feature_readField, {id: 0, tags: [], type: {"value":0,"options":{}}, geometry: [], deep: []}, end);
const Tile_Feature_write = (obj, pbf) => {
    if (obj.id) pbf.writeVarintField(1, obj.id);
    if (obj.tags) pbf.writePackedVarint(2, obj.tags);
    if (obj.type != undefined && obj.type !== {"value":0,"options":{}}) pbf.writeVarintField(3, obj.type);
    if (obj.geometry) pbf.writePackedVarint(4, obj.geometry);
    if (obj.deep) for (let i = 0; i < obj.deep.length; i++) pbf.writeMessage(5, Tile_Feature_Deep.write, obj.deep[i]);
};

const Tile_Feature = {
    read: Tile_Feature_read,
    write: Tile_Feature_write,
    Deep: Tile_Feature_Deep,
};


// Tile_Layer ========================================

const Tile_Layer_readField = (tag, obj, pbf) => {
    if (tag === 15) obj.version = pbf.readVarint();
    else if (tag === 1) obj.name = pbf.readString();
    else if (tag === 2) obj.features.push(Tile_Feature.read(pbf, pbf.readVarint() + pbf.pos));
    else if (tag === 3) obj.keys.push(pbf.readString());
    else if (tag === 4) obj.values.push(Tile_Value.read(pbf, pbf.readVarint() + pbf.pos));
    else if (tag === 5) obj.extent = pbf.readVarint();
};
const Tile_Layer_read = (pbf, end) => pbf.readFields(Tile_Layer_readField, {version: 1, name: "", features: [], keys: [], values: [], extent: 4096}, end);
const Tile_Layer_write = (obj, pbf) => {
    if (obj.version != undefined && obj.version !== 1) pbf.writeVarintField(15, obj.version);
    if (obj.name) pbf.writeStringField(1, obj.name);
    if (obj.features) for (let i = 0; i < obj.features.length; i++) pbf.writeMessage(2, Tile_Feature.write, obj.features[i]);
    if (obj.keys) for (let i = 0; i < obj.keys.length; i++) pbf.writeStringField(3, obj.keys[i]);
    if (obj.values) for (let i = 0; i < obj.values.length; i++) pbf.writeMessage(4, Tile_Value.write, obj.values[i]);
    if (obj.extent != undefined && obj.extent !== 4096) pbf.writeVarintField(5, obj.extent);
};

const Tile_Layer = {
    read: Tile_Layer_read,
    write: Tile_Layer_write,
};


// Tile ========================================

const Tile_readField = (tag, obj, pbf) => {
    if (tag === 3) obj.layers.push(Tile_Layer.read(pbf, pbf.readVarint() + pbf.pos));
    else if (tag === 4) obj.whatever.push(Tile_Envelope.read(pbf, pbf.readVarint() + pbf.pos));
};
const Tile_read = (pbf, end) => pbf.readFields(Tile_readField, {layers: [], whatever: []}, end);
const Tile_write = (obj, pbf) => {
    if (obj.layers) for (let i = 0; i < obj.layers.length; i++) pbf.writeMessage(3, Tile_Layer.write, obj.layers[i]);
    if (obj.whatever) for (let i = 0; i < obj.whatever.length; i++) pbf.writeMessage(4, Tile_Envelope.write, obj.whatever[i]);
};

export const Tile = {
    read: Tile_read,
    write: Tile_write,
    GeomType: Tile_GeomType,
    Value: Tile_Value,
    Envelope: Tile_Envelope,
    Feature: Tile_Feature,
    Layer: Tile_Layer,
};

