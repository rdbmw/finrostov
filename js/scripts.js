$(function() {

  // переключение слайдера
  var cases = document.getElementsByClassName("slider-cases__item");

  for (var i = 0; i < cases.length; i++) {
    cases[i].addEventListener("click", function(event) {
      event.preventDefault();
      var slider = document.getElementById('slider');
      var prev = document.getElementsByClassName('slider-cases__item--active')[0];
      prev.classList.toggle("slider-cases__item--active");
      this.classList.toggle("slider-cases__item--active");
      slider.style.MozTransform = 'translate(calc(-100%/3*' + this.dataset.trans + '))';
      slider.style.WebkitTransform = 'translate(calc(-100%/3*' + this.dataset.trans + '))';
      slider.style.OTransform = 'translate(calc(-100%/3*' + this.dataset.trans + '))';
      slider.style.MsTransform = 'translate(calc(-100%/3*' + this.dataset.trans + '))';
      slider.style.transform = 'translate(calc(-100%/3*' + this.dataset.trans + '))';
      //
    });
  }

  // перемотка слайдера
  var slider_fwd = document.getElementById("slider-text__fwd");

  slider_fwd.addEventListener("click", function(event) {
    event.preventDefault();
    var slider = document.getElementById('slider');
    var cases = document.getElementsByClassName("slider-cases__item");

    for (var i = 0; i < cases.length; i++) {
      if (cases[i].classList.contains("slider-cases__item--active")) {
        cases[i].classList.toggle("slider-cases__item--active");
        if (i == cases.length - 1) {
          var j = 0;
        } else {
          var j = i + 1;
        }

        cases[j].classList.toggle("slider-cases__item--active");

        slider.style.MozTransform = 'translate(calc(-100%/3*' + cases[j].dataset.trans + '))';
        slider.style.WebkitTransform = 'translate(calc(-100%/3*' + cases[j].dataset.trans + '))';
        slider.style.OTransform = 'translate(calc(-100%/3*' + cases[j].dataset.trans + '))';
        slider.style.MsTransform = 'translate(calc(-100%/3*' + cases[j].dataset.trans + '))';
        slider.style.transform = 'translate(calc(-100%/3*' + cases[j].dataset.trans + '))';
        break;
      }
    }
  });

  var slider_bwd = document.getElementById("slider-text__bwd");

  slider_bwd.addEventListener("click", function(event) {
    event.preventDefault();
    var slider = document.getElementById('slider');
    var cases = document.getElementsByClassName("slider-cases__item");

    for (var i = 0; i < cases.length; i++) {
      if (cases[i].classList.contains("slider-cases__item--active")) {
        cases[i].classList.toggle("slider-cases__item--active");
        if (i == 0) {
          var j = cases.length - 1;
        } else {
          var j = i - 1;
        }

        cases[j].classList.toggle("slider-cases__item--active");

        slider.style.MozTransform = 'translate(calc(-100%/3*' + cases[j].dataset.trans + '))';
        slider.style.WebkitTransform = 'translate(calc(-100%/3*' + cases[j].dataset.trans + '))';
        slider.style.OTransform = 'translate(calc(-100%/3*' + cases[j].dataset.trans + '))';
        slider.style.MsTransform = 'translate(calc(-100%/3*' + cases[j].dataset.trans + '))';
        slider.style.transform = 'translate(calc(-100%/3*' + cases[j].dataset.trans + '))';
        break;
      }
    }
  });

  // кнопки заявки

  var btns = document.getElementsByClassName("btn");
  var modal = document.getElementsByClassName("modal-content")[0];
  var modalTitles = document.getElementsByClassName("modal-content__title");
  var modalDetails = document.getElementsByClassName("modal-content__details");
  var modal = document.getElementsByClassName("modal-content")[0];
  var overlay = document.getElementsByClassName("modal-overlay")[0];
  var header = document.getElementsByClassName("page-header")[0];
  var content = document.getElementsByClassName("page-content")[0];
  var footer = document.getElementsByClassName("page-footer")[0];
  var modalClose = document.getElementsByClassName("modal-content__close")[0];
  var modalSend = document.getElementsByClassName("lead-form__btn")[0];
  var modalOk = document.getElementsByClassName("lead-form__btn--ok")[0];

  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(event) {
      yaCounter45566046.reachGoal('ClickButton');
      event.preventDefault();
      modal.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
      header.classList.toggle("blur");
      content.classList.toggle("blur");
      footer.classList.toggle("blur");
    });
  }

  modalClose.addEventListener("click", function(event) {
    event.preventDefault();
    if (modalTitles[0].classList.contains("hidden")) {
      modalTitles[0].classList.toggle("hidden");
      modalTitles[1].classList.toggle("hidden");
      modalDetails[0].classList.toggle("hidden");
      modalDetails[1].classList.toggle("hidden");
    }
    document.getElementById("name").value = '';
    document.getElementById("phone").value = '';
    document.getElementById("error").innerHTML = "";
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
    header.classList.toggle("blur");
    content.classList.toggle("blur");
    footer.classList.toggle("blur");
  });

  modalOk.addEventListener("click", function(event) {
    event.preventDefault();
    modalTitles[0].classList.toggle("hidden");
    modalTitles[1].classList.toggle("hidden");
    modalDetails[0].classList.toggle("hidden");
    modalDetails[1].classList.toggle("hidden");
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
    header.classList.toggle("blur");
    content.classList.toggle("blur");
    footer.classList.toggle("blur");
  });

  // отправка формы

  var form = document.getElementById("leadForm");

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    if (document.getElementById("name").value == "" || document.getElementById("phone").value == "") {
      document.getElementById("error").innerHTML = "Заполните имя и телефон!";
    } else {
      yaCounter45566046.reachGoal('Lead');
      var xmlhttp = (window.XMLHttpRequest)
        ? new XMLHttpRequest()
        : new ActiveXObject("Microsoft.XMLHTTP");
      xmlhttp.open('POST', '/catch/', true);
      xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
      xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
          if (xmlhttp.status == 200) {
            document.getElementById("name").value = '';
            document.getElementById("phone").value = '';
            // form.getElementById("com").value='';
            document.getElementsByClassName("modal-content__title")[0].classList.toggle("hidden");
            document.getElementsByClassName("modal-content__title")[1].classList.toggle("hidden");
            document.getElementsByClassName("modal-content__details")[0].classList.toggle("hidden");
            document.getElementsByClassName("modal-content__details")[1].classList.toggle("hidden");
          } else if (xmlhttp.status == 500) {
            document.getElementById("error").innerHTML = "Сервер не отвечает!<br>" + xmlhttp.responseText + "<br>Попробуйте позже";
          } else {
            document.getElementById("error").innerHTML = "Ошибка!<br>" + xmlhttp.responseText;
          }
        }
      }
      xmlhttp.send(JSON.stringify({
        'name': document.getElementById("name").value, 'phone': document.getElementById("phone").value,
        // 'comment': form.getElementById("com").value
      }));
    }
  });
});
