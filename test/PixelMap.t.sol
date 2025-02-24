// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {PixelMap} from "../src/PixelMap.sol";

contract PixelMapTest is Test {
    PixelMap public pixelMap;

    function setUp() public {
        pixelMap = new PixelMap(10, 10);
    }

    function test_setPixel() public {
        pixelMap.setPixel(0, 0, 11, 12, 13);
        (uint8 r, uint8 g, uint8 b) = pixelMap.readPixel(0, 0);
        assertEq(r, 11);
        assertEq(g, 12);
        assertEq(b, 13);
    }

    // function testFuzz_SetNumber(uint256 x) public {
    //     counter.setNumber(x);
    //     assertEq(counter.number(), x);
    // }
}
