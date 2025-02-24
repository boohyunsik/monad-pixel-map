// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract PixelMap {
    struct Pixel {
        uint8 r;
        uint8 g;
        uint8 b;
    }

    Pixel[][] public pixelMap;

    uint public width;
    uint public height;

    constructor(uint _width, uint _height) {
        require(_width > 0 && _height > 0, "Width and height must be greater than 0");

        width = _width;
        height = _height;

        for (uint i = 0; i < height; i++) {
            pixelMap.push();
            for (uint j = 0; j < width; j++) {
                pixelMap[i].push(Pixel(0, 0, 0));
            }
        }
    }

    function setPixel(uint x, uint y, uint8 r, uint8 g, uint8 b) public {
        require(x < width, "Invalid x coordinate");
        require(y < height, "Invalid y coordinate");

        pixelMap[y][x] = Pixel(r, g, b);
    }

    function readPixel(uint x, uint y) public view returns (uint8, uint8, uint8) {
        require(x < width, "Invalid x coordinate");
        require(y < height, "Invalid y coordinate");

        Pixel storage pixel = pixelMap[y][x];
        return (pixel.r, pixel.g, pixel.b);
    }
}