# ./backend
Contains backend code for smart contracts, written on Solidity. 

## Folder Structure
- **abi** (depreceated) = abi of contracts generated externally.
- **artifacts** = ABI and Bytecode generated for the deployed contracts. 
- **cache** = Cache files required at runtime.
- **node_modules** = Required libraries and modules.
- **contracts** = Contains solidity code of the contracts.
- **scripts** = Contains code for deploying and interfacing contracts.
- **vulcan-graph** = Contains a graph wrapped around an ERC20 token (Address = 0x6aC72FE4b1e50A8cBfA957C7609aD010E82C811c).
- **hardhat-config** = Hardhat environment configured with Alchemy tooling, on Polygon Mumbai (Testnet).

## Currently implemented contracts
- **ERC20**
- **ERC721**  
More details can be found under `./contracts`.
