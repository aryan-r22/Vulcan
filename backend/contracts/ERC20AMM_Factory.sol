// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

/// @title Contract Factory for publishing new ERC20 Spec Tokens
/// @notice For use by Owners only
/// @author Aryan Rastogi

import "./ERC20_AMM.sol";
import "./Treasury.sol";

contract ERC20AMM_Factory{

	address owner_addr;

	/// @notice Addresses of the deployed ERC20 (AMM) tokens.
	ERC20_AMM[] public erc20cts_AMM;

	/// @notice Addresses of the treasury contract.
	Treasury[] public treasury;

	/// @notice Event emitted when an ERC20 contract (AMM) is deployed.
	/// @param contract_addr: Address of the deployed contract.
	event Deployed_ERC20AMMto(address contract_addr);

	/// @notice Event emitted when a Treasury for ERC20 (AMM) is deployed.
	/// @param contract_addr: Address of the deployed contract.
	event Deployed_Treasuryto(address contract_addr);


	/// @notice Constructor to set owner of the contract.
	/// @param multisig_address: Address of the contract owner.
	constructor(address multisig_address) {
		owner_addr = multisig_address;
	}


	/// @notice Create new ERC20 AMM spec contracts using Bonding Curves. Accessible by the Owner.
	/// @param token_name: Name of the token.
	/// @param token_sym: Symbol of the token.
	/// @param founder_add: Address of the token founder.
	/// @param amt: Initial amount to mint.
	/// @param reserveRatio: The reserve ratio for the bonding curve.
    /// @param proj_hash: Token URI of the project details
    /// @param stable_coin: Contract address of the stablecoin to be used as collateral.
	function createNewERC20AMM(string memory token_name, string memory token_sym, 
		address founder_add, uint256 amt, uint256 reserveRatio,
		 string memory proj_hash, address stable_coin) public {
		require(msg.sender == owner_addr, 'You should be the owner to create ERC20 tokens');
		Treasury tr = new Treasury(owner_addr, founder_add, stable_coin);

		ERC20_AMM obj = new ERC20_AMM(token_name,token_sym,founder_add, owner_addr,
			amt, reserveRatio, address(tr), proj_hash);

		tr.setERC20Corr(address(obj));

		erc20cts_AMM.push(obj);

		treasury.push(tr);

		emit Deployed_ERC20AMMto(address(obj));
		emit Deployed_Treasuryto(address(tr));
	}


    /// @notice Get the address of the owner. Freely callable.
    /// @return Address of the owner.
    function getOwnerAddr() public view returns (address)
    {
        return owner_addr;
    }


}
