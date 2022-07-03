// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

/// @title Treasury contract
/// @notice For use by ERC20 (AMM) contract
/// @author Aryan Rastogi


interface StableCoin {
    function transfer(address rec, uint amt) external returns (bool);
    function balanceOf(address acc) external view returns (uint);
    function transferFrom(address sen, address rec, uint256 amt) external returns (bool);
}

contract Treasury{

	event Withdraw(address to, uint256 amount);
	event Deposit(address from, uint256 amount);
	event TransferCollateralToFounder(uint256 amount);


	address owner;
	StableCoin coll_token;
	address founder;
	address factory;
	address erc20_address;

    /// @notice Initializes Treasury contract
    /// @param founder_addr: Address of the token founder
    /// @param owner_addr: Address of the owner
    /// @param stable_cn: Contract address of the stablecoin to be used as collateral
    /// @param ini_coll: Initial collateral staked by the founder
	constructor(address owner_addr, address founder_addr,
	 uint256 ini_coll, address stable_cn) {
		owner = owner_addr;
		founder = founder_addr;
		factory = msg.sender;
		coll_token = StableCoin(stable_cn);
		coll_token.transferFrom(founder_addr, address(this), ini_coll);
		emit Deposit(founder_addr, ini_coll);
	}

    /// @notice Deposits collateral to this contract's address
    /// @param sender: Address of the token sender
    /// @param amount: Amount to deposit to the contract
	function deposit(address sender, uint256 amount) external{
		require(msg.sender == erc20_address, "Only corresponding ERC20 can access" );
		require(coll_token.balanceOf(sender)>=amount, "Insufficient funds to perform a buy transaction");
		coll_token.transferFrom(sender, address(this), amount);
		emit Deposit(sender, amount);
	}

    /// @notice Withdraws collateral from this contract's address
    /// @param receiver: Address of the token receiver
    /// @param amount: Amount to withdraw from the contract
	function withdraw(address receiver, uint256 amount) external{
		require(msg.sender == erc20_address, "Only corresponding ERC20 can access" );
		require(coll_token.balanceOf(address(this))>=amount,
			"Treasury doesn't have sufficient tokens");
		coll_token.transfer(receiver, amount);
		emit Withdraw(receiver, amount);
	}

    /// @notice Transfers collateral held by this contract to the founder
    /// @param amount: Amount to transfer to the founder
	function transferToFounder(uint256 amount) external{
		require(msg.sender == erc20_address, "Only corresponding ERC20 can access" );
		coll_token.transfer(founder, amount);
		emit TransferCollateralToFounder(amount);
	}

    /// @notice Returns total collateral held by the account
    /// @return Total held value
	function getCollateralAmount() external view returns(uint256){
		return coll_token.balanceOf(address(this));
	}

    /// @notice Set the corresponding ERC20 contract address
	function setERC20Corr(address erc20_addr) external {
		require(msg.sender == factory, "Only factory can set this attribute");
		erc20_address = erc20_addr;
	}


}