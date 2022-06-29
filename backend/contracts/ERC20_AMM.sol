// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

/// @title Contract for managing ERC20 Spec Tokens using Bonding Curves
/// @notice For use by Owners, Founders and Users
/// @author Aryan Rastogi

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "solidity-math-utils/projects/contracts/BondingCurves.sol";


contract ERC20_AMM is ERC20Capped, Pausable {

    address founder_addr;
    address owner_addr;
    uint256 public reserveBalance;
    uint256 public reserveRatio;
    uint256 public token_price;
    string public projectURI;


    event BuySuccessfulFor(address backer);
    event SellSuccessfulFor(address backer);
    event BuyQuoteObtainedFor(address backer);
    event SellQuoteObtainedFor(address backer);
    event CollateralTransferOf(uint256);

    /// @notice List of backers
    mapping(address => uint256) public ownership;


    /// @notice Moderators of the contract
    mapping(address => bool) public whitelist;
    
    /// @notice Initializes ERC20 contracts spec
    /// @param token_name: Name of the token
    /// @param token_sym: Symbol of the token
    /// @param founder_add: Address of the token founder
    /// @param owner_add: Address of the owner
    /// @param amt: Initial amount to mint
    /// @param collateral: Initial collateral staked by the founder
    constructor(string memory token_name, string memory token_sym, address founder_add,
     address owner_add, uint amt ,uint256 res_rat, uint256 collateral, string memory project_hash) ERC20(token_name, token_sym) Ownable()
    {
        founder_addr= founder_add;
        owner_addr = owner_add;
        transferOwnership(owner_addr);
        _mint(msg.sender, amt);
        whitelist[founder_addr] = true;
        whitelist[owner_addr] = true;
        reserveRatio = res_rat;
        reserveBalance = collateral;
        projectURI = project_hash;

    }

    /// @notice Mints ERC20 tokens using inherent Bonding Curve
    /// @param amt: Amount of tokens to buy
    function buy_tokens(uint256 amt) public payable
    {
        require(amt>0; "Must send DAI to buy tokens");
        uint256 get_mint_value = buy(_totalSupply, reserveBalance, reserveRatio, amt);
        reserveBalance = reserveBalance.add(amt);
        _mint(msg.sender, get_mint_value);
        emit BuySuccessfulFor(msg.sender);
        ownership[msg.sender]+=get_mint_value;
        token_price = reserveBalance/(reserveRatio*_totalSupply);
    }

    /// @notice Returns a quote for the ERC20 tokens that can be bought for a given collateral
    /// @param amt: Amount of tokens expected to buy
    function get_buy_estimation(uint256 amt) public returns (uint256)
    {
        require(amt>0; "Must input DAI amount to get buy estimation");
        uint256 get_mint_value = buy(_totalSupply, reserveBalance, reserveRatio, amt);
        return get_mint_value;
        emit BuyQuoteObtainedFor(msg.sender);
    }

    /// @notice Burns ERC20 tokens and reimburses appropriate amount to the seller using Bonding Curves
    /// @param amt: Amount of tokens to sell
    function sell_tokens(uint256 amt) public
    {
        require(amt>0; "Must sell non-zero tokens");

        uint256 get_sell_value = sell(_totalSupply, reserveBalance, reserveRatio, amt);
        _burn(msg.sender, amt);
        msg.sender.transfer(get_sell_value);
        reserveBalance = reserveBalance.sub(get_sell_value);
        emit SellSuccessfulFor(msg.sender);
        ownership[msg.sender]-=get_mint_value;
        token_price = reserveBalance/(reserveRatio*_totalSupply);
    }

    /// @notice Returns a quote for the collateral that can be obtained by selling ERC20 tokens
    /// @param amt: Amount of tokens expected to sell   
    function get_sell_estimation(uint256 amt) public returns (uint256)
    {
        require(amt>0; "Must input token amount to get sell estimation");
        uint256 get_sell_value = sell(_totalSupply, reserveBalance, reserveRatio, amt);
        return get_sell_value;
        emit SellQuoteObtainedFor(msg.sender);
    }


    /// @notice Allows owners to transfer collateral to founder's account
    /// @param amt: Amount of tokens to transfer  
    function transfer_collateral(uint256 amt)
    {
        require(msg.sender==owner_addr, "Only Owners can transfer collateral to founders");
        founder_addr.transfer(amt);       
        reserveBalance = reserveBalance.sub(get_sell_value);     
        emit CollateralTransferOf(amt); 
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