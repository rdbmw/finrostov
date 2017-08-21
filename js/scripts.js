function funcF(x, credit, payment, months) {
  var summ = -credit;
  for (var i = 1; i <= months; i++) {
    summ = summ + Math.pow(x, i) * payment;
  }
  return summ;
}

function funcFDiff(x, payment, months) {
  var summ = payment;
  for (var i = 1; i < months; i++) {
    summ = summ + Math.pow(x, i) * payment * (i + 1);
  }
  return summ;
}

function calcRate(credit, payment, months) {
  var fault = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.0001;

  var koeff = 1;
  var ratePrev = 0;

  koeff = koeff - funcF(koeff, credit, payment, months) / funcFDiff(koeff, payment, months);
  var rateNext = Math.pow(koeff, -12) - 1;
  //console.log(koeff, " - ", rateNext, " - ", Math.abs(rateNext - ratePrev));

  while (Math.abs(rateNext - ratePrev) > fault) {
    ratePrev = rateNext;
    koeff = koeff - funcF(koeff, credit, payment, months) / funcFDiff(koeff, payment, months);
    rateNext = Math.pow(koeff, -12) - 1;
    //console.log(koeff, " - ", rateNext, " - ", Math.abs(rateNext - ratePrev));
  }

  return rateNext;
}

function formatVal(val) {
      var valParts = val.toFixed(2).split('.');
      var intPart = valParts[0];
      var str_temp = '';
      if (intPart.length > 3) {
        var intArr = intPart.split('');
        for (var i = intArr.length - 1, j = 1; i >= 0; i--, j++) {
          str_temp = intArr[i] + str_temp;
          if (j % 3 == 0) str_temp = " " + str_temp;
        }
      } else {
        str_temp = intPart;
      }
      return str_temp.replace(/-\s/g, '-') + "," + valParts[1]; //дополнительно убираем пробел при "-"
    }

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
  var leadComment = document.getElementById("leadComment");
  var calc = document.querySelector(".calculator__form");
  var btnCalc = document.querySelector(".calculator__btn");
  var modalCalc = document.querySelector(".modal-content__calc");

  for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function(event) {
      event.preventDefault();

      if (this.classList.contains("calculator__btn")) {
        // Расчет калькулятор
        if (calc.elements.creditAmount.value == "" || calc.elements.monthCount.value == "" || calc.elements.monthPayment.value == "" || calc.elements.salary.value == "") {
            document.getElementById("calculator__error").innerHTML = "Заполните все поля!";
        } else {
          document.getElementById("calculator__error").innerHTML = "";
          var creditAmount = +calc.elements.creditAmount.value;
          var monthPayment = +calc.elements.monthPayment.value;
          var monthCount = +calc.elements.monthCount.value;
          var salary = +calc.elements.salary.value;

          var rate = calcRate(creditAmount, monthPayment, monthCount);
            console.log (rate);
          var saving = (monthCount - 3 + 36) * rate * creditAmount / 12;
          console.log (saving);
          var maxPayment = calc.elements.kids.checked  ? salary * 0.25 : salary * 0.5;
          console.log (maxPayment);
          document.getElementById("calcRate").innerHTML = formatVal(rate*100) + "%";
          document.getElementById("calcPercent").innerHTML = formatVal(saving) + " руб.";
          document.getElementById("calcPayment").innerHTML = formatVal(maxPayment) + " руб.";
          modalCalc.classList.remove("hidden");
          yaCounter45566046.reachGoal('ClickButton');
          modal.classList.toggle("hidden");
          overlay.classList.toggle("hidden");
          header.classList.toggle("blur");
          content.classList.toggle("blur");
          footer.classList.toggle("blur");
          leadComment.value = "кнопка '" + this.textContent +"'";
        }
      } else {
        yaCounter45566046.reachGoal('ClickButton');
        yaCounter45566046.reachGoal('CalcButton');
        modal.classList.toggle("hidden");
        overlay.classList.toggle("hidden");
        header.classList.toggle("blur");
        content.classList.toggle("blur");
        footer.classList.toggle("blur");
        leadComment.value = "кнопка '" + this.textContent +"'";
      }
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
        'name': document.getElementById("name").value, 'phone': document.getElementById("phone").value, 'comment': document.getElementById("leadComment").value
      }));
    }
  });
});
