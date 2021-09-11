App = {

  web3Provider: null,
  contracts: {},

  init: function() {
    return App.initweb3();
  },

  //todo
  initweb3: function() {
    //init web3 adn set the provider
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      App.setStatus("MetaMask Detected");
    } else {
      //set one
      alert("Please Install MetaMask and Retry");
      App.web3Provider = new web3.web3Providers.HttpProvider('http://localhost:8545');
      return null;
    }

    //Get the Initial Account Balance
    web3.eth.getAccounts(function(err,accs) {
      if (err != null) {
        alert("There is an Issue While Fetching Your Account Please Refresh and Try Again");
        return;
      }
      account = accs[0];
      if (!account) {
        App.setStatus("Please Login to MetaMask");
        alert("Can't Fetch Your Account Make Sure You Are Logged in Using MetaMask or Refresh the Page");
        return;
      }
      return App.initContract();
  });
},

//todo
initContract: function() {
$.getJson('ChatWei.json', function(ChatWeiArtifact){
  App.contracts.ChatWei = TruffleContract(ChatWeiArtifact);
  //setting the providor for The contract
  App.contracts.ChatWei.setProvider(App.web3Provider);
  return App.getContractProperties();
});
},
//todo
getContractProperties : function() {
  var self = this;
  var meta;
  App.contracts.ChatWei.deployed().then(function(instance)
  {
    meta = instance;
    return meta.getContractProperties.call({from: account});
  }).then(function(value) {
    var networkAddress = App.contracts.ChatWei.address;
    document.getElementById("contractAddress").innerHTML = networkAddress;
    var by = value[0];
    var registeredUserAddress = value[1];
    var numRegisteredUsers = registeredUserAddress.length;
    for (i = 0; i<numRegisteredUsers; i++) {
      select += '<option val '+ i + '>' + registeredUserAddress[i] + '</option>';
    }
    $('$registeredUsersAddressMenu').html(select);
    document.getElementById('contractOwner').innerHTML = by;
  }).catch(function(e){
    console.log(e)
    self.setStatus("");
  });

  return App.displayMyAccountInfo();
},

//todo
displayMyAccountInfo: function() {
  
},

setStatus: function(message) {
  document.getElementById('status').innerHTML = message;

}

};

$(document).ready(function()
{
  App.init();

});
