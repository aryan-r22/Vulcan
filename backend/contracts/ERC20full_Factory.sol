// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

/// @title Contract Factory for publishing new ERC20 Spec Tokens
/// @notice For use by Owners only
/// @author Aryan Rastogi


import "./ERC_20full.sol";

contract ERC20_Factory{

	address owner_addr;

	/// @notice Addresses of the deployed ERC20 (base) tokens.
	ERC_20full[] public erc20cts;


	/// @notice Event emitted when an ERC20 contract (base) is deployed.
	/// @param contract_addr: Address of the deployed contract.
	event Deployed_ERC20to(address contract_addr);


	/// @notice Constructor to set owner of the contract.
	/// @param multisig_address: Address of the contract owner.
	constructor(address multisig_address) {
		owner_addr = multisig_address;
	}

	/// @notice Create new ERC20 base spec contracts. Accessible by the Owner.
	/// @param token_name: Name of the token.
	/// @param token_sym: Symbol of the token.
	/// @param founder_add: Address of the token founder.
	/// @param cap: Upper Limit of the mintable tokens.
	/// @param amt: Initial amount to mint.
	function createNewERC20(string memory token_name, string memory token_sym, address founder_add,
	 uint256 cap, uint256 amt) public {
		require(msg.sender == owner_addr, 'You should be the owner to create ERC20 tokens');
		ERC_20full obj = new ERC_20full(token_name,token_sym,founder_add, owner_addr,cap,amt);

		erc20cts.push(obj);

		emit Deployed_ERC20to(address(obj));
	}


    /// @notice Get the address of the owner. Freely callable.
    /// @return Address of the owner.
    function getOwnerAddr() public view returns (address)
    {
        return owner_addr;
    }


}
