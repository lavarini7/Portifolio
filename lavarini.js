const handlePhone = (event) => {
    let input = event.target
    input.value = phoneMask(input.value)
  }
  
  const phoneMask = (value) => {
    if (!value) return ""
    value = value.replace(/\D/g,'')
    value = value.replace(/(\d{2})(\d)/,"($1) $2")
    value = value.replace(/(\d)(\d{4})$/,"$1-$2")
    return value
  }


      const typedTextSpan = document.querySelector(".typed-text");
      const cursorSpan = document.querySelector(".cursor");

      const textArray = ["Davi Lavarini/>", "front-end develloper/>", "back-end develloper/>"];
      const typingDelay = 200;
      const erasingDelay = 100;
      const newTextDelay = 2000; // Delay between current and next text
      let textArrayIndex = 0;
      let charIndex = 0;

      function type() {
        if (charIndex < textArray[textArrayIndex].length) {
          if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
          typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
          charIndex++;
          setTimeout(type, typingDelay);
        }
        else {
          cursorSpan.classList.remove("typing");
          setTimeout(erase, newTextDelay);
        }
      }

      function erase() {
        if (charIndex > 0) {
          if (!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
          typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
          charIndex--;
          setTimeout(erase, erasingDelay);
        }
        else {
          cursorSpan.classList.remove("typing");
          textArrayIndex++;
          if (textArrayIndex >= textArray.length) textArrayIndex = 0;
          setTimeout(type, typingDelay + 1100);
        }
      }

      document.addEventListener("DOMContentLoaded", function () { // On DOM Load initiate the effect
        if (textArray.length) setTimeout(type, newTextDelay + 250);
      });
    
      class FormSubmit {
        constructor(settings) {
          this.settings = settings;
          this.form = document.querySelector(settings.form);
          this.formButton = document.querySelector(settings.button);
          if (this.form) {
            this.url = this.form.getAttribute("action");
          }
          this.sendForm = this.sendForm.bind(this);
        }
      
        displaySuccess() {
          this.form.innerHTML = this.settings.success;
        }
      
        displayError() {
          this.form.innerHTML = this.settings.error;
        }
      
        getFormObject() {
          const formObject = {};
          const fields = this.form.querySelectorAll("[name]");
          fields.forEach((field) => {
            formObject[field.getAttribute("name")] = field.value;
          });
          return formObject;
        }
      
        onSubmission(event) {
          event.preventDefault();
          event.target.disabled = true;
          event.target.innerText = "Enviando...";
        }
      
        async sendForm(event) {
          try {
            this.onSubmission(event);
            await fetch(this.url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify(this.getFormObject()),
            });
            this.displaySuccess();
          } catch (error) {
            this.displayError();
            throw new Error(error);
          }
        }
      
        init() {
          if (this.form) this.formButton.addEventListener("click", this.sendForm);
          return this;
        }
      }
      
      const formSubmit = new FormSubmit({
        form: "[data-form]",
        button: "[data-button]",
        success: "<h1 class='success'>Mensagem enviada!</h1>",
        error: "<h1 class='error'>Não foi possível enviar sua mensagem.</h1>",
      });
      formSubmit.init();