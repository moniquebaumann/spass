// SPDX-License-Identifier: GNU AFFERO GENERAL PUBLIC LICENSE Version 3

// We fund freedom.
// We stop state criminals.
// We make crypto cypherpunk again.
// We love Geo Caching with Geo Cash.
// We foster Freedom, Justice and Peace.
// We combine Freedom Education with Geo Caching.
// We foster sustainable liquidity infrastructures.
// We separate money from state criminals like religion has been separated from state criminals.
// We foster ever emerging architectures of freedom by rewarding those who help themselves and others to be free.

pragma solidity 0.8.20;

import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.4/contracts/token/ERC20/ERC20.sol";
import "https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/v4.9.4/contracts/utils/math/Math.sol";

contract Spass is ERC20 {

    constructor() ERC20("Spass", "SPASS") {
        _mint(msg.sender, getLightSpeedInMetersPerSecond() * 10 ** decimals()); 
    }

    function getLightSpeedInMetersPerSecond() public pure returns(uint256) {
        return 299792458; // The amount of Spaß is defined by light
    }
    function getFibbonacciSequence(uint256 amountOfEntries) public pure returns(uint256[360] memory) {
        uint256 counter = 2;
        uint256[360] memory result;
        result[0] = 0;
        result[1] = 1;
        while (counter < amountOfEntries) {
            result[counter] = (result[counter - 2] + result[counter - 1]);
            counter++;
        }
        return result;
    }
    function getProportion() external pure returns(uint256) {
        uint256[360] memory fibbonacciSequence = getFibbonacciSequence(360);
        return Math.mulDiv(10**18, fibbonacciSequence[360 - 1], fibbonacciSequence[360 - 2]);
    }
    function ruleOfThree(uint256 a, uint256 b, uint256 c) external pure returns(uint256) {
        return (b * c) / a;
    }
}
