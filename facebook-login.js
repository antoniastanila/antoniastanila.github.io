// Include Facebook SDK
(function (d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  
    // Adaugă un fallback în cazul în care SDK-ul nu este încărcat
    js.onerror = function () {
      console.error("Facebook SDK failed to load.");
      alert("Facebook login is unavailable at the moment.");
    };
  })(document, "script", "facebook-jssdk");
  
  // Initialize Facebook SDK
  window.fbAsyncInit = function () {
    FB.init({
      appId: "981049047413825",
      xfbml: true,
      version: "v21.0",
    });
  
    // Funcție de autentificare
    loginWithFacebook = function () {
      FB.login(
        function (response) {
          if (response.authResponse) {
            console.log("Welcome! Fetching your information...");
            FB.api("/me", { fields: "name,email" }, function (response) {
              document.getElementById("profile").innerHTML =
                "Welcome, " +
                response.name +
                "! Your email is " +
                response.email;
              // Redirecționează către mainpage.html
              window.location.href = "mainpage.html";
            });
          } else {
            document.getElementById("profile").innerHTML =
              "Login cancelled or not authorized.";
            console.log("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "email,public_profile" }
      );
    };
  };
  