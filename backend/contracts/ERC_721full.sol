// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract ERC_721full is ERC721URIStorage, Ownable, Pausable {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    address founder_addr;
    address owner_addr;
    
    mapping(address=>tokenMetaData[]) public ownershipRecord;
    struct tokenMetaData
    {
        uint tokenId;
        uint timeStamp;
        string tokenURI;
    }
    mapping(address => bool) public whitelist;

    constructor(string memory token_name, string memory tokenSYM, address founder_add, address owner_add) ERC721(token_name, tokenSYM)
    {
        founder_addr= founder_add;
        owner_addr = owner_add;
        whitelist[founder_addr] = true;
        whitelist[owner_addr] = true;
    }

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

    function burnNFT(address recipient, uint256 ownedID) public 
    {
        require(msg.sender == owner_addr, "NFTs can be only burned by the owner");
        _burn(ownershipRecord[recipient][ownedID].tokenId);
        delete ownershipRecord[recipient][ownedID];

    }

    function pause_NFTcontract() public whenNotPaused
    {
        require(whitelist[msg.sender], "Contract can be only paused by the owner or founder");
        _pause();
    }

    function unpause_NFTcontract() public whenPaused
    {
        require(whitelist[msg.sender], "Contract can be only unpaused by the owner or founder");
        _unpause();
    }

    function getOwnerAddr() public view returns (address)
    {
        return owner_addr;
    }
    function getFounderAddr() public view returns (address)
    {
        return founder_addr;
    }


}