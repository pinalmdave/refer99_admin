(function() {
  'use strict';

  angular
    .module('angularSeedApp')
    .service('User', User);

  /** @ngInject */
  function User(Restangular, Storage, $rootScope) {
    var thisVar = this;
    this.login = function(data, type, next) {
      Restangular
        .one('members')
        .all('login')
        .post(data, {
          include: 'user'
        })
        .then(function(data) {
          // do on success
          if (type == "fb") {
            data.user_type = "fb";
          } else {
            data.user_type = "sys";
          }
          if (data.user.is_admin) {
            Storage.setUser(data.plain());
            Restangular.setDefaultRequestParams({
              access_token: data.id
            });
            return next(null, data.plain());
          } else {
            return next({
              "message": "Unauthorised User!"
            }, null);
          }
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.get_user_campaigns = function(next) {
      Restangular
        .one('members')
        .one('get_user_campaigns')
        .get()
        .then(function(data) {
          // do on success
          return next(null, data);
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.change_password = function(data, next) {
      Restangular
        .one('members')
        .all('change_password')
        .post(data)
        .then(function(data) {
          // do on success
          return next(null, data);
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.send_forget_password_email = function(data, next) {
      Restangular
        .one('members')
        .one('send_reset_password_link')
        .get(data)
        .then(function(data) {
          // do on success
          return next(null, data);
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.resetPassword = function(data, next) {
      Restangular
        .one('members')
        .all('reset_password')
        .post(data)
        .then(function(data) {
          // do on success
          return next(null, data);
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.registerUser = function(data, next) {
      Restangular
        .one('members')
        .one('sign_universal')
        .get(data)
        .then(function(data) {
          // do on success
          if (data) {
            // Storage.setUser(data.object);
            /*Notification.registerDevice(function() {
              thisVar.addDeviceToken(function(err, user) {
                if (err) {
                }
              });
              // do nothing
            });*/
            return next(null, data);
          } else {
            return next(data, null);
          }
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };


    this.getProfile = function(userId, next) {
      Restangular
        .one('members')
        .one(userId)
        .get()
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };


    this.updateProfile = function(id, data, next) {
      Restangular
        .one('members')
        .one(id)
        .customPUT(data)
        /*.get()*/
        .then(function(res) {
          // do on success
          return next(null, res.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };

    this.userlist = function(next) {
      Restangular
        .one('members')
        //.all('login')
        //.post(data)
        .get()
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };

    this.userCount = function(next) {
      Restangular
        .one('members')
        .one('count')
        //.all('login')
        //.post(data)
        .get()
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };

    this.addUser = function(data, next) {
      Restangular
        .one('members')
        .all('replaceOrCreate')
        .post(data)
        /*.get()*/
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };


    this.updateUser = function(id, data, next) {
      Restangular
        .one('members')
        .one(id)
        .customPUT(data)
        /*.get()*/
        .then(function(res) {
          // do on success
          return next(null, res.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.updateFaq = function(id, data, next) {
      Restangular
        .one('faqs')
        .one(id)
        .customPUT(data)
        /*.get()*/
        .then(function(res) {
          // do on success
          return next(null, res.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };

    this.deleteUser = function(id, next) {
      Restangular
        .one('members')
        .one(id)
        .remove()
        .then(function(res) {
          // do on success
          return next(null, res.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };

    this.forgotpassword = function(email, next) {
      Restangular
        .one('members')
        //.all('login')
        //.post(data)
        .get()
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.getCampaign = function(id, next) {
      var options = {
        filter: {
          "include": "members"
        }
      }
      Restangular
        .one('campaigns')
        .one(id)
        .get(options)
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.getCampaignCheck = function(id, next) {
      Restangular
        .one('campaigns')
        .one('get_campaign')
        .get({ cp_id: id })
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };
    this.getFaqs = function(next) {
      var options = {
        filter: {
          "include": "members",
          "order": "created desc"
        }
      };
      Restangular
        .one('faqs')
        .get(options)
        .then(function(data) {
          // do on success
          return next(null, data.plain());
        }, function(error) {
          // do on failure
          return next(error, null);
        });
    };



  }

})();
