const truffleContract = require("../node_modules/@truffle/contract");

const storageContract = require('../build/contracts/SimpleStorage.json');

const web3provider = 'HTTP://127.0.0.1:7545';

const storage = truffleContract(storageContract);
storage.setProvider(web3provider);

contract('SimpleStorage', (accounts) => {
    let storageInstance;
    const owner = accounts[0];
    const user1 = accounts[1];
    before( async () => {
        storageInstance = await storage.deployed();
    });

    it('should set and get a value', async () => {
        const settingValue = 32;

        await storageInstance.setStorageF(settingValue, { from: owner });
        
        const storedValue = await storageInstance.getStorageF();
        console.log(storedValue);
        //web3.utils.toWei("1", "ether"); //String olarak bu değeri verip bu şekilde almak için ve büyük veri BD ile uğraştığımız için dikkat etmeliyiz.
        assert.equal(settingValue, storedValue, ' set ile get değerleri eşit değil..');
        

        
    });
});


