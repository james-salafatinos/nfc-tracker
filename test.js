
require('dotenv').config()
const express = require('express')
const path = require('path')
const d3 = require('d3')
const PORT = process.env.PORT || 5000
const logs_table = require('./models/db_crud.js')

j = 10
cubesData = [];
var cnt = 0;

function makeCube(h, x, z){
    return [
        {x: x - 1, y: h, z: z + 1}, // FRONT TOP LEFT
        {x: x - 1, y: 0, z: z + 1}, // FRONT BOTTOM LEFT
        {x: x + 1, y: 0, z: z + 1}, // FRONT BOTTOM RIGHT
        {x: x + 1, y: h, z: z + 1}, // FRONT TOP RIGHT
        {x: x - 1, y: h, z: z - 1}, // BACK  TOP LEFT
        {x: x - 1, y: 0, z: z - 1}, // BACK  BOTTOM LEFT
        {x: x + 1, y: 0, z: z - 1}, // BACK  BOTTOM RIGHT
        {x: x + 1, y: h, z: z - 1}, // BACK  TOP RIGHT
    ];
}


var h = d3.randomUniform(-2, -7)();
for(var z = -j; z <= j; z = z + 3){
    for(var x = -j; x <= j; x = x + 3)
    console.log(h,x,z)
    var _cube = makeCube(h, x, z);
    _cube.id = 'cube_' + cnt++;
    _cube.height = h;
    cubesData.push(_cube);}