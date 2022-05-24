// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

import "./ERC_721full.sol";

contract ERC721Factory {

	address owner_addr;
	ERC_721full1[] public erc721cts;

	event Deployed_ERC721to(address contract_addr);


	constructor(address multisig_address) {
		owner_addr = multisig_address;

	}

	function createNewERC721(string memory token_name, string memory token_sym, address founder_add) public {
		require(msg.sender == owner_addr, 'You should be the owner to create ERC721 tokens');
		ERC_721full obj = new ERC_721full(token_name,token_sym,founder_add, owner_addr);

		erc721cts.push(obj);

		emit Deployed_ERC721to(address(obj));
	}


}