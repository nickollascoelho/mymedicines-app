(function() {
  'use strict'

  angular
    .module('myMedicines')
    .constant('ENDPOINT', {
      baseUrl: 'https://mymedicinesapi.herokuapp.com/',
      authUrl: 'https://mymedicinesapi.herokuapp.com/auths',
      usersUrl: 'https://mymedicinesapi.herokuapp.com/users',
      usersMedicinesUrl: 'https://mymedicinesapi.herokuapp.com/users/:id/medicines',
      medicinesUrl: 'https://mymedicinesapi.herokuapp.com/medicines'
    })
    .constant('AUTH_EVENTS', {
      notAuthenticated: 'auth-not-authenticated',
      invalidToken: 'auth-invalid-token',
      loginSuccess: 'auth-login-success',
      loginFailed: 'auth-login-failed',
      logoutSuccess: 'auth-logout-success',
      signUpSuccess: 'auth-signup-success',
      signUpFailed: 'auth-signup-failed',
      sessionTimeout: 'auth-session-timeout'
    });

})();
