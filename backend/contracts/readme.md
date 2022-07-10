# ./contracts
Contains Solidity files for the deployed contracts on Polygon Mumbai testnet.  
Required Solidity version ``>=0.8.9``.  

## Contract details  

- **ERC20full_Factory.sol**  
Contains code for creating and deploying ERC20 base contracts on demand.  
    - Accessible by the ``Owner``.  
    - Implements ***ERC_20full.sol***.    

- **ERC20AMM_Factory.sol**  
Contains code for creating and deploying ERC20 AMM (Bonding Curve) contracts on demand.  
    - Accessible by the ``Owner``.  
    - Implements ***ERC20_AMM.sol*** together with ***Treasury.sol***.    

- **ERC721_Factory.sol**
Contains code for creating and deploying ERC721 contracts on demand.  
    - Accessible by the ``Owner``.  
    - Implements ***ERC_721full.sol***.  

- **ERC_721full.sol**
Contains code for interacting with ERC721 contracts.  
    - Accessible by the ``Owner``, ``Founder`` and ``Backer``.
    - Implements the following core ERC721 functionality i.e. non fungibility and the ability to trade: 
         - [x] {ERC721}: The core and metadata extensions, with a base URI mechanism. 
         - [x] {IERC721}: Core functionality required in all compliant implementation.
         - [x] {IERC721Receiver}: An interface that must be implemented by contracts if they want to accept tokens through safeTransferFrom.
         - [x] {ERC721Holder}: A bare bones implementation of the receiver interface.
         - [x] {ERC721Pausable}: A primitive to pause contract operation.
         
       Richer mechanism for managing `metadata{}`
         - [x] {IERC721Metadata}: Optional extension that adds name, symbol, and token URI, almost always included.
         - [x] {ERC721URIStorage}: A more flexible but more expensive way of storing metadata.  

Individual functions provided by the contract may be looked up into the *natspec* comments for the contract.  

- **ERC_20full.sol**
Contains code for interacting with ERC20 contracts.  
    - Accessible by the ``Owner``, ``Founder`` and ``Backer``.
    - Implements the following core ERC20 functionality:
         - [x] {IERC20}: the interface all ERC20 implementations should conform to. 
         - [x] {IERC20Metadata}: the extended ERC20 interface including the name, symbol and decimals functions.
         - [x] {ERC20}: the implementation of the ERC20 interface, including the name, symbol and decimals optional standard extension to the base interface.
         
       Additional functionality is provided by the following extensions:
         - [x] {ERC20Pausable}: ability to pause token transfers.
         - [x] {ERC20Burnable}: destruction of own tokens.
         - [x] {ERC20Capped}: enforcement of a cap to the total supply when minting tokens.

Individual functions provided by the contract may be looked up into the *natspec* comments for the contract.  

- **ERC20_AMM.sol**  
Implements ERC_20full with Bancorised bonding curve as AMM.  
    - Uses ``solidity-math-utils`` to implement the bonding curve formulas.  
    - Incorporates all the functionalities of `ERC_20full.sol`.  
    - Has *buy* and *sell* functions.  


- **Treasury.sol**  
Implements treasury for holding collateral.  
    - Stores collateral in the currency set by the ***ERC20_Factory.sol***.
    - Closely linked with ***ERC20_AMM***.


