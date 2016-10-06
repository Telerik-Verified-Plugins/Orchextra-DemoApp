(function (global) {
  var DemoViewModel,
      geoTransitionListener = null,
      app = global.app = global.app || {},
      ORCHEXTRA_API_KEY = "41e8e773422bf0d4f8bd534344501214e9f312c3", // TODO change
      ORCHEXTRA_API_SECRET = "fcea9f4064d59b81eccbb05d50a63b0470017c5c",
      ORCHEXTRA_LOG_LEVEL = "all";
  
  DemoViewModel = kendo.data.ObservableObject.extend({
    
    initSDK: function () {
      if (!this.checkSimulator()) {
        OrchextraPlugin.init(
          {
              apiKey: ORCHEXTRA_API_KEY,
              apiSecret: ORCHEXTRA_API_SECRET,
              logLevel: ORCHEXTRA_LOG_LEVEL // optional, debug | error | warning | all
          },
          function (msg) {
            // may be called with a Custom URL Scheme like "myApp://news/international"
            alert(JSON.stringify(msg));
          },
          function (error) {
            alert("Error: " + error);
          }
        );
      }
    },

    startListening: function () {
      if (!this.checkSimulator()) {
        OrchextraPlugin.start(
          function () {
            alert("Success!");
          },
          function (error) {
            alert("Error: " + error);
          }
        );
      }
    },

    stopListening: function () {
      if (!this.checkSimulator()) {
        OrchextraPlugin.stop(
          function () {
            alert("Success!");
          },
          function (error) {
            alert("Error: " + error);
          }
        );
      }
    },

    openScanner: function () {
      if (!this.checkSimulator()) {
        OrchextraPlugin.openScanner(
          function () {
            console.log("Success opening scanner!");
          },
          function (error) {
            alert("Error: " + error);
          }
        );
      }
    },

    binduser: function () {
      if (!this.checkSimulator()) {
        OrchextraPlugin.bindUser(
          {
            crmId: 'eddy123',
            birthday: '1985/04/22',
            gender : 'M',
            tags : ['Visa', 'Master Card']
          },
          function () {
            alert("Success!");
          },
          function (error) {
            alert("Error: " + error);
          }
        );
      }
    },

    checkSimulator: function() {
      if (window.navigator.simulator === true) {
        alert('This plugin is not available in the simulator.');
        return true;
      } else if (window.OrchextraPlugin === undefined) {
        alert('Plugin not found. Maybe you are running in AppBuilder Companion app which currently does not support this plugin.');
        return true;
      } else {
        return false;
      }
    }
  });

  app.demoService = {
    viewModel: new DemoViewModel()
  };
})(window);