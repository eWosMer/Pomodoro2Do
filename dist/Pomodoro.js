let saniye = document.getElementById("saniye");
let dakika = document.getElementById("dakika");
let pomodoro_input = document.getElementById("pomodoro-input");
let mola_input = document.getElementById("mola-input");
let calisma_mola_btn = document.getElementById("calisma-mola");
let sifirla_btn = document.getElementById("reset");
let strt_stp_btn = document.getElementById("start-stop");
let calisma_vakti = true;
let pomodoro_baslangic=25;
let mola_baslangic=5;
let sayac_id;

pomodoro_input.addEventListener("change", function () {
  pomodoro_baslangic = pomodoro_input.value;
  if (calisma_vakti) {
    dakika.style.setProperty("--value", parseInt(pomodoro_input.value));
    saniye.style.setProperty("--value", 0);
  }
})

strt_stp_btn.addEventListener("click", function () {
  if (sayac_id) {
    clearInterval(sayac_id);
    sayac_id = undefined;
    strt_stp_btn.innerText = "Başlat";
  }
  else {
    sayac_id = setInterval(() => {
      sayac(sayac_id);
    }, 1000);
    strt_stp_btn.innerText = "Durdur";
  }
});


const sayac = function (id) {
  if (saniye.style.getPropertyValue("--value") > 0) {
    saniye.style.setProperty("--value", (saniye.style.getPropertyValue("--value")-1));
  }
  if (saniye.style.getPropertyValue("--value") == 0) {      
    if (dakika.style.getPropertyValue("--value") == 0) {
      clearInterval(id);
    }
    else {
      dakika.style.setProperty("--value", (dakika.style.getPropertyValue("--value")-1));
      saniye.style.setProperty("--value", 59);
    }
  }
}

mola_input.addEventListener("change", function () {

  mola_baslangic = mola_input.value;

  if (!calisma_vakti) {
    dakika.style.setProperty("--value", mola_input.value);
    saniye.style.setProperty("--value", 0);
  }
})

calisma_mola_btn.addEventListener("click", function () {

    clearInterval(sayac_id);
    sayac_id = undefined;     
    strt_stp_btn.innerText="Başlat";

  if (calisma_vakti) {
    calisma_vakti = false;
    dakika.style.setProperty("--value", mola_baslangic);
    saniye.style.setProperty("--value", 0);
    calisma_mola_btn.innerText = "Çalışmaya geç";
  }

  else {
    calisma_vakti = true;
    dakika.style.setProperty("--value", pomodoro_baslangic);
    saniye.style.setProperty("--value", 0);
    calisma_mola_btn.innerText = "Molaya geç";
  }
})

sifirla_btn.addEventListener("click", () => {

  if(calisma_vakti == true){
    dakika.style.setProperty("--value", pomodoro_baslangic);
  }

  else{
    dakika.style.setProperty("--value", mola_baslangic);
  }

  saniye.style.setProperty("--value", 0);
  
  if (sayac_id) {
    clearInterval(sayac_id);
    sayac_id = undefined;
    strt_stp_btn.innerText = "Başlat";
  }

})


