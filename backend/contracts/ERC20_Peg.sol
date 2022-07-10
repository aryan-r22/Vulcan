// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

/// @title Contract for managing ERC20 Spec Tokens
/// @notice For use by Owners, Founders and Users
/// @author Aryan Rastogi

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";


contract ERC20_Peg is ERC20, Ownable, Pausable {

    address founder_addr;
    address owner_addr;

    /// @notice Moderators of the contract
    mapping(address => bool) public whitelist;
    
    /// @notice Initializes ERC20 contracts spec
    /// @param token_name: Name of the token
    /// @param token_sym: Symbol of the token
    /// @param founder_add: Address of the token founder
    /// @param owner_add: Address of the owner
    /// @param amt: Initial amount to mint
    constructor(string memory token_name, string memory token_sym, address founder_add, address owner_add, uint amt) ERC20(token_name, token_sym)
    {
        founder_addr= founder_add;
        owner_addr = owner_add;
        _mint(msg.sender, amt);
        whitelist[founder_addr] = true;
        whitelist[owner_addr] = true;
    }

    /// @notice Mints ERC20 tokens. Accessible by the founder only.
    /// @param amt: Amount of tokens to mint
    function mint_more(uint256 amt) public 
    {
        _mint(msg.sender, amt);
    }

    function approveTransfer(uint256 amt, address spender) public
    {
        _approve(msg.sender, spender, amt);
    }

    /// @notice Burns ERC20 tokens with an address. Accessible by the founder only.
    /// @param amt: Amount of tokens to burn
    /// @param addr: Address location of the tokens to burn
    function burn_more(uint256 amt, address addr) public
    {
        require(msg.sender == founder_addr, "Tokens can be only burned by the owner");
        _burn(addr, amt);
    }

    /// @notice Pauses the contract. Accessible by the owner and the founder.
    function pause_contract() public whenNotPaused
    {
        require(whitelist[msg.sender], "Contract can be only paused by the owner or founder");
        _pause();
    }

    /// @notice Unpauses the contract. Accessible by the owner and the founder.
    function unpause_contract() public whenPaused
    {
        require(whitelist[msg.sender], "Contract can be only unpaused by the owner or founder");
        _unpause();
    }


    /// @notice Get the address of the owner.
    /// @return Address of the owner
    function getOwnerAddr() public view returns (address)
    {
        return owner_addr;
    }

    /// @notice Get the address of the ERC721 token founder.
    /// @return Address of the ERC721 token founder.
    function getFounderAddr() public view returns (address)
    {
        return founder_addr;
    }

}