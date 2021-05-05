var form = $('form');

braintree.client.create({
  authorization: 'sandbox_g42y39zw_348pk9cgf3bgyw2b'
}, function(err, clientInstance) {
  if (err) {
    console.error(err);
    return;
  }

  braintree.hostedFields.create({
    client: clientInstance,
    styles: {
      input: {
        // change input styles to match
        // bootstrap styles
        'font-size': '1rem',
        color: '#495057'
      }
    },
    fields: {
      cardholderName: {
        selector: '#cc-name',
        placeholder: 'Name as it appears on your card'
      },
      number: {
        selector: '#cc-number',
        placeholder: '4111 1111 1111 1111'
      },
      cvv: {
        selector: '#cc-cvv',
        placeholder: '123'
      },
      expirationDate: {
        selector: '#cc-expiration',
        placeholder: 'MM / YY'
      }
    }
  }, function(err, hostedFieldsInstance) {
    if (err) {
      console.error(err);
      return;
    }
    function createInputChangeEventListener(element) {
      return function () {
        validateInput(element);
      }
    }

    function setValidityClasses(element, validity) {
      if (validity) {
        element.removeClass('is-invalid');
        element.addClass('is-valid');  
      } else {
        element.addClass('is-invalid');
        element.removeClass('is-valid');  
      }    
    }
    
    function validateInput(element) {
      // very basic validation, if the
      // fields are empty, mark them
      // as invalid, if not, mark them
      // as valid

      if (!element.val().trim()) {
        setValidityClasses(element, false);

        return false;
      }

      setValidityClasses(element, true);

      return true;
    }
    
    function validateEmail () {
      var baseValidity = validateInput(email);
      
      if (!baseValidity) {  
        return false;
      }

      if (email.val().indexOf('@') === -1) {
        setValidityClasses(email, false);
        return false;
      }
      
      setValidityClasses(email, true);
      return true;
    }

    var ccName = $('#cc-name');
    var email = $('#email');

    ccName.on('change', function () {
      validateInput(ccName);
    });
    email.on('change', validateEmail);


            hostedFieldsInstance.on('validityChange', function(event) {
      var field = event.fields[event.emittedBy];

      // Remove any previously applied error or warning classes
      $(field.container).removeClass('is-valid');
      $(field.container).removeClass('is-invalid');

      if (field.isValid) {
        $(field.container).addClass('is-valid');
      } else if (field.isPotentiallyValid) {
        // skip adding classes if the field is
        // not valid, but is potentially valid
      } else {
        $(field.container).addClass('is-invalid');
      }
    });

    hostedFieldsInstance.on('cardTypeChange', function(event) {
      var cardBrand = $('#card-brand');
      var cvvLabel = $('[for="cc-cvv"]');

      if (event.cards.length === 1) {
        var card = event.cards[0];

        // change pay button to specify the type of card
        // being used
        cardBrand.text(card.niceType);
        // update the security code label
        cvvLabel.text(card.code.name);
      } else {
        // reset to defaults
        cardBrand.text('Card');
        cvvLabel.text('CVV');
      }
    });

    form.submit(function(event) {
      event.preventDefault();

      var formIsInvalid = false;
      var state = hostedFieldsInstance.getState();

      // perform validations on the non-Hosted Fields
      // inputs
      if (!validateEmail()) {
        formIsInvalid = true;
      }

      // Loop through the Hosted Fields and check
      // for validity, apply the is-invalid class
      // to the field container if invalid
      Object.keys(state.fields).forEach(function(field) {
        if (!state.fields[field].isValid) {
          $(state.fields[field].container).addClass('is-invalid');
          formIsInvalid = true;
        }
      });

      if (formIsInvalid) {
        // skip tokenization request if any fields are invalid
        return;
      }

      hostedFieldsInstance.tokenize(function(err, payload) {
        if (err) {
          console.error(err);
          return;
        }

        // This is where you would submit payload.nonce to your server
        $('.toast').toast('show');

        // you can either send the form values with the payment
        // method nonce via an ajax request to your server,
        // or add the payment method nonce to a hidden inpiut
        // on your form and submit the form programatically
        // $('#payment-method-nonce').val(payload.nonce);
        // form.submit()
      });
    });
  });
});