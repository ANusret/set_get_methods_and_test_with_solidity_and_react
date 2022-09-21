pragma solidity <= 0.8.17;

contract SimpleStorage{


    uint storageF;

    function setStorageF(uint _storageF) public{
        storageF = _storageF;
    }

    function getStorageF() public view returns(uint){
        return storageF;
    }


}