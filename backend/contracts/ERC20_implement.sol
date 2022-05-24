// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ERC20_implement is ERC20Capped, Ownable {

    address owner_addr;

    constructor(uint256 cap, uint256 amt) ERC20("VCFI_1", "VCF1") ERC20Capped(cap * 10 **18){
        owner_addr= msg.sender;
        _mint(msg.sender, amt);
        }

    function mint_more(uint256 amt) public onlyOwner {
        require(msg.sender == owner_addr, "Tokens can be only minted by the owner");
        _mint(msg.sender, amt);
    }

    function burn_more(uint256 amt) public onlyOwner {
        require(msg.sender == owner_addr, "Tokens can be only burned by the owner");
        _burn(msg.sender, amt);
    }

    function transfer_ownership(address newOwner) public onlyOwner {
        require(msg.sender == owner_addr, "Ownership can be only transferred by the owner");
        transferOwnership(newOwner);
    }

}