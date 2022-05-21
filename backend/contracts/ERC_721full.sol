// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract ERC_721full is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter public _tokenIds;

    address owner_addr;
    
    mapping(address=>tokenMetaData[]) public ownershipRecord;
    struct tokenMetaData{
        uint tokenId;
        uint timeStamp;
        string tokenURI;
    }

    constructor() ERC721("Vulcan_NFT", "VLN") {
        owner_addr= msg.sender;
    }

    

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256)
    {
        require(msg.sender == owner_addr, "NFTs can be only minted by the owner");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _safeMint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);
        ownershipRecord[recipient].push(tokenMetaData(newItemId, block.timestamp, tokenURI));

        return newItemId;
    }

    function burnNFT(address recipient, uint256 ownedID) public onlyOwner
    {
        require(msg.sender == owner_addr, "NFTs can be only burned by the owner");
        _burn(ownershipRecord[recipient][ownedID].tokenId);
        delete ownershipRecord[recipient][ownedID];

    }

}
