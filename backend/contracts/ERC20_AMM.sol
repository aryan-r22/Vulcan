// SPDX-License-Identifier: None

// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.8.9;

/// @title Contract for managing ERC20 Spec Tokens using Bonding Curves
/// @notice For use by Owners, Founders and Users
/// @author Aryan Rastogi

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "solidity-math-utils/project/contracts/BondingCurve.sol";


interface TreasuryContract{
    function deposit(address sender, uint256 amount) external;
    function withdraw(address receiver, uint256 amount) external;
    function transferToFounder(uint256 amount) external;
    function getCollateralAmount() external view returns(uint256);
}


contract ERC20_AMM is ERC20, Pausable, BondingCurve {

    address founder_addr;
    address owner_addr;
    uint256 public reserveRatio;
    uint256 public token_price;
    string public projectURI;
    TreasuryContract treasury;
    uint256 reserveBalance;


    event BuySuccessfulFor(address backer);
    event SellSuccessfulFor(address backer);
    event BuyQuoteObtainedFor(address backer);
    event SellQuoteObtainedFor(address backer);
    event CollateralTransferOf(uint256);
    event CollateralAmountIs(uint256);

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
    /// @param res_rat: Reserve ratio for the contract
    /// @param treasury_addr: Address of the treasury contract
    /// @param project_hash: Token URI of the project details
    constructor(string memory token_name, string memory token_sym, address founder_add,
     address owner_add, uint256 amt ,uint256 res_rat, address treasury_addr, 
     string memory project_hash) ERC20(token_name, token_sym) 
    {
        founder_addr= founder_add;
        owner_addr = owner_add;
        treasury = TreasuryContract(treasury_addr);
        _mint(msg.sender, amt);
        whitelist[founder_addr] = true;
        whitelist[owner_addr] = true;
        reserveRatio = res_rat;
        reserveBalance = treasury.getCollateralAmount();
        projectURI = project_hash;
    }

    /// @notice Mints ERC20 tokens using inherent Bonding Curve
    /// @param amt: Amount of tokens to buy
    function buyTokens(uint256 amt) public
    {
        require(amt>0, "Must send non-zero stablecoin to buy tokens");
        reserveBalance = treasury.getCollateralAmount();
        treasury.deposit(msg.sender, amt);
        uint256 get_mint_value = buy(totalSupply(), reserveBalance, reserveRatio, amt);
        _mint(msg.sender, get_mint_value);
        emit BuySuccessfulFor(msg.sender);
        ownership[msg.sender]+=get_mint_value;
        reserveBalance = treasury.getCollateralAmount();
        token_price = reserveBalance/(reserveRatio*totalSupply());
    }

    /// @notice Returns a quote for the ERC20 tokens that can be bought for a given collateral
    /// @param amt: Amount of tokens expected to buy
    /// @return Buy Estimation
    function getBuyEstimation(uint256 amt) public returns (uint256)
    {
        reserveBalance = treasury.getCollateralAmount();
        require(amt>0, "Must input non-zero stablecoin amount to get buy estimation");
        uint256 get_mint_value = buy(totalSupply(), reserveBalance, reserveRatio, amt);
        emit BuyQuoteObtainedFor(msg.sender);
        return get_mint_value;
    }

    /// @notice Burns ERC20 tokens and reimburses appropriate amount to the seller using Bonding Curves
    /// @param amt: Amount of tokens to sell
    function sell_tokens(uint256 amt) public
    {
        require(amt>0, "Must sell non-zero tokens");
        require(balanceOf(msg.sender)>=amt, "You do not have enough ERC20's");
        reserveBalance = treasury.getCollateralAmount();
        uint256 get_sell_value = sell(totalSupply(), reserveBalance, reserveRatio, amt);
        _burn(msg.sender, amt);
        treasury.withdraw(msg.sender, get_sell_value);       
        emit SellSuccessfulFor(msg.sender);
        ownership[msg.sender]-=get_sell_value;
        reserveBalance = treasury.getCollateralAmount();
        token_price = reserveBalance/(reserveRatio*totalSupply());
    }

    /// @notice Returns a quote for the collateral that can be obtained by selling ERC20 tokens
    /// @param amt: Amount of tokens expected to sell   
    /// @return Sell Estimation
    function get_sell_estimation(uint256 amt) public returns (uint256)
    {
        reserveBalance = treasury.getCollateralAmount();
        require(amt>0, "Must input token amount to get sell estimation");
        uint256 get_sell_value = sell(totalSupply(), reserveBalance, reserveRatio, amt);
        emit SellQuoteObtainedFor(msg.sender);
        return get_sell_value;
    }


    /// @notice Allows owners to transfer collateral to founder's account
    /// @param amt: Amount of tokens to transfer  
    function transfer_collateral(uint256 amt) public
    {
        require(msg.sender==owner_addr, "Only Owners can transfer collateral to founders");
        treasury.transferToFounder(amt);  
        emit CollateralTransferOf(amt); 
    }

    /// @notice Emits event with amount of collateral
    function get_collateral_amount() public
    {
        emit CollateralAmountIs(treasury.getCollateralAmount());
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