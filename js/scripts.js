// var eText = document.getElementById('text');
// eText.style.MozTransform = 'rotate(45deg)';
// eText.style.WebkitTransform = 'rotate(45deg)';
// eText.style.OTransform = 'rotate(45deg)';
// eText.style.MsTransform = 'rotate(45deg)';
// eText.style.transform = 'rotate(45deg)';
$(function() {
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
    btns[i].addEventListener("click" , function() {
      event.preventDefault();
      modal.classList.toggle("hidden");
      overlay.classList.toggle("hidden");
      header.classList.toggle("blur");
      content.classList.toggle("blur");
      footer.classList.toggle("blur");
    });
  }

  modalClose.addEventListener("click" , function() {
    event.preventDefault();
    modal.classList.toggle("hidden");
    overlay.classList.toggle("hidden");
    header.classList.toggle("blur");
    content.classList.toggle("blur");
    footer.classList.toggle("blur");
  });

  modalOk.addEventListener("click" , function() {
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

  modalSend.addEventListener("click" , function() {
    event.preventDefault();
    modalTitles[0].classList.toggle("hidden");
    modalTitles[1].classList.toggle("hidden");
    modalDetails[0].classList.toggle("hidden");
    modalDetails[1].classList.toggle("hidden");
  });

  // var form = document.getElementById("order-form");
  // form.addEventListener("submit", function(event) {
  //   if (form.getElementById("name").value=="" || form.getElementById("tel").value=="") {
	// 	form.getElementById("resorder").innerHTML="<span>Заполните имя и телефон!</span>";
	// } else {
	// 	var xmlhttp = (window.XMLHttpRequest) ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
	// 	xmlhttp.open('POST', '/catch/', true);
  //       xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  //       xmlhttp.onreadystatechange = function() {
	// 		if (xmlhttp.readyState == 4) {
	// 			if(xmlhttp.status == 200) {
  //         form.getElementById("name").value='';
  //         form.getElementById("tel").value='';
  //         form.getElementById("com").value='';
	// 				form.getElementById("resorder").innerHTML="<span>"+xmlhttp.responseText+"</span>";
	// 			} else if(xmlhttp.status == 500) {
	// 				form.getElementById("resorder").innerHTML="<span>Сервер не отвечает!<br>"+xmlhttp.responseText+"<br>Попробуйте позже</span>";
	// 			} else {
	// 				form.getElementById("resorder").innerHTML="<span>Ошибка!<br>"+xmlhttp.responseText+"</span>";
	// 			}
	// 		}
	// 	}
	// 	xmlhttp.send(JSON.stringify({
  //     'name': form.getElementById("name").value,
  //     'phone': form.getElementById("tel").value,
  //     'comment': form.getElementById("com").value
  //   }));
	// }
  //
	// event.preventDefault();
  // });
  // }
});
