// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

/// @title Contract for managing ERC721 Spec Tokens
/// @notice For use by Owners, Founders and Users
/// @author Aryan Rastogi

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract ERC_721full is ERC721URIStorage, Ownable, Pausable {
    using Counters for Counters.Counter;

    /// @notice Stores IDs of the tokens.
    Counters.Counter public _tokenIds;

    address founder_addr;
    address owner_addr;
    
    /// @notice Records the total ownership of ERC721 tokens (NFTs) by a given address
    mapping(address=>tokenMetaData[]) public ownershipRecord;

    /// @notice Contains metadata of an existent ERC721 token (NFT)
    struct tokenMetaData
    {
        uint tokenId;
        uint timeStamp;
        string tokenURI;
    }

    /// @notice Moderators of the contract
    mapping(address => bool) public whitelist;

    /// @notice Initializes ERC721 contracts spec
    /// @param token_name: Name of the token
    /// @param tokenSYM: Symbol of the token
    /// @param founder_add: Address of the token founder
    /// @param owner_add: Address of the owner
    constructor(string memory token_name, string memory tokenSYM, address founder_add, address owner_add) ERC721(token_name, tokenSYM)
    {
        founder_addr= founder_add;
        owner_addr = owner_add;
        whitelist[founder_addr] = true;
        whitelist[owner_addr] = true;
    }

    /// @notice Mints ERC721 tokens (NFTs). Accessible by the founder only.
    /// @param recipient: Address of the recipient
    /// @param tokenURI: Data associated with the NFT
    /// @return Token ID of the newly minted NFT
    function mintNFT(address recipient, string memory tokenURI) public returns (uint256)
    {
        require(msg.sender == founder_addr, "NFTs can be only minted by the founder");
        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        ownershipRecord[recipient].push(tokenMetaData(newItemId, block.timestamp, tokenURI));
        _tokenIds.increment();
        return newItemId;
    }

    /// @notice Burns ERC721 tokens (NFTs). Accessible by the owner only.
    /// @param recipient: Address of the recipient
    /// @param ownedID: ID of the NFT as per ownershipRecord
    function burnNFT(address recipient, uint256 ownedID) public 
    {
        require(msg.sender == owner_addr, "NFTs can be only burned by the owner");
        _burn(ownershipRecord[recipient][ownedID].tokenId);
        delete ownershipRecord[recipient][ownedID];

    }

    /// @notice Pauses the contract. Accessible by the owner and the founder.
    function pause_NFTcontract() public whenNotPaused
    {
        require(whitelist[msg.sender], "Contract can be only paused by the owner or founder");
        _pause();
    }

    /// @notice Unpauses the contract. Accessible by the owner and the founder.
    function unpause_NFTcontract() public whenPaused
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