"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// pick valid filterable filed
const pick = (obj, keys) => {
    const finalObj = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            let value = obj[key];
            if (typeof value === "string" && !isNaN(Number(value))) {
                value = Number(value);
            }
            finalObj[key] = value;
        }
    }
    return finalObj;
};
exports.default = pick;
