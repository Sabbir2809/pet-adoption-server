"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.petSearchAbleFields = exports.petFilterableFields = void 0;
// for all filtering
exports.petFilterableFields = [
    "species",
    "breed",
    "age",
    "size",
    "location",
    "gender",
    "searchTerm",
];
// only for search term
exports.petSearchAbleFields = ["species", "breed", "age", "location"];
