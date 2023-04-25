let saniye = document.getElementById("saniye");
let dakika = document.getElementById("dakika");
let pomodoro_input = document.getElementById("pomodoro-input");
let mola_input = document.getElementById("mola-input");
let calisma_mola_btn = document.getElementById("calisma-mola");
let sifirla_btn = document.getElementById("reset");
let strt_stp_btn = document.getElementById("start-stop");
let calisma_vakti = true;
let pomodoro_baslangic = 25;
let mola_baslangic = 5;
let sayac_id;
let ses_menu_btn = document.getElementById("ses-btn");
let video_menu_btn = document.getElementById("video-btn");
let tema_menu_btn = document.getElementById("tema-btn");
let pomodoro_menu_btn = document.getElementById("pomodoro-menu-btn");
let ses_menu_kapat_btn = document.getElementById("ses-menu-kapat");
let video_menu_kapat_btn = document.getElementById("video-menu-kapat");
let tema_menu_kapat_btn = document.getElementById("tema-menu-kapat");
let pomodoro_menu_kapat_btn = document.getElementById("pomodoro-menu-kapat");
let ses_menu = document.getElementById("ses-menu");
let video_menu = document.getElementById("video-menu");
let tema_menu = document.getElementById("tema-menu");
let pomodoro_menu = document.getElementById("pomodoro-menu");
let kronometre_btn = document.getElementById("kronometre-btn");
let kronometre = document.getElementById("kronometre");
let kronometre_butonlar = document.getElementById("kronometre-butonlar");
let pomodoro_sayac = document.getElementById("sayac");
let pomodoro_sayac_butonlar = document.getElementById("sayac-butonlar");
let kronometre_start_stop_btn = document.getElementById("kronometre-start-stop");
let kronometre_reset_btn = document.getElementById("kronometre-reset");
let kronometre_sayac_id;
let kronometre_dakika = document.getElementById("kronometre-dakika");
let kronometre_saniye = document.getElementById("kronometre-saniye");


let title = document.querySelector("title");       // title DOM elementini seçtik


const config = { attributes: true };              // attribute'u ayarlanabilir/değiştirilebilir kıldık 

// observer mutasyon(config nesnesindeki özelliklerde) gözlediğinde çalışan fonksiyon
function callback() {
  let dakikaTitle;   
  let saniyeTitle;
  if (kronometre_sayac_id) {
    dakikaTitle = kronometre_dakika.style.getPropertyValue("--value");
    saniyeTitle = kronometre_saniye.style.getPropertyValue("--value");
  }
  else {
    dakikaTitle = dakika.style.getPropertyValue("--value");   // sürekli değişen dakikayı getproperty fonksiyonu ile alıp dakikaTitle değişkenine eşitliyoruz
    saniyeTitle = saniye.style.getPropertyValue("--value");  // aynı işi saniye için de yapıyoruz
  }
  if (saniyeTitle < 10) {
    saniyeTitle = "0" + saniyeTitle;
  }
  if (dakikaTitle < 10) {
    dakikaTitle = "0" + dakikaTitle;
  }
  title.innerText = `${dakikaTitle}:${saniyeTitle} - Pomodoro2Do`;  // title'ın innertext'ini yukarıda eşitleme yaptığımız değişkenlerle değiştiriyoruz
};

// üstteki callback fonksiyonunu çağıran observer objesini oluşturma
const observer = new MutationObserver(callback);
const kronometre_observer = new MutationObserver(callback);

// observer objesinin saniye elementinin config içindeki özelliklerinin değişimini incelemeye başlamasını sağladık. Bu özellikler her değiştiğinde callback fonksiyonu çağırılacak
observer.observe(saniye, config);
kronometre_observer.observe(kronometre_saniye, config);


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
    saniye.style.setProperty("--value", (saniye.style.getPropertyValue("--value") - 1));
  }
  if (saniye.style.getPropertyValue("--value") == 0) {
    if (dakika.style.getPropertyValue("--value") == 0) {
      clearInterval(id);
    }
    else {
      dakika.style.setProperty("--value", (dakika.style.getPropertyValue("--value") - 1));
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

calisma_mola_btn.addEventListener("click", function () {  //çalışma-mola butonu event listener

  clearInterval(sayac_id);
  sayac_id = undefined;
  strt_stp_btn.innerText = "Başlat";

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

  if (calisma_vakti == true) {
    dakika.style.setProperty("--value", pomodoro_baslangic);
  }

  else {
    dakika.style.setProperty("--value", mola_baslangic);
  }

  saniye.style.setProperty("--value", 0);

  if (sayac_id) {
    clearInterval(sayac_id);
    sayac_id = undefined;
    strt_stp_btn.innerText = "Başlat";
  }

})

// kronometre kodu aşağıdan başlıyor:

kronometre_btn.addEventListener("click", () => {
  kronometre_butonlar.hidden = !kronometre_butonlar.hidden;
  kronometre.hidden = !kronometre.hidden;
  pomodoro_sayac.hidden = !pomodoro_sayac.hidden;
  pomodoro_sayac_butonlar.hidden = !pomodoro_sayac_butonlar.hidden;
  clearInterval(kronometre_sayac_id);
  clearInterval(sayac_id);
  sayac_id = undefined;
  kronometre_sayac_id = undefined;
  kronometre_start_stop_btn.innerText = "Başlat";
  strt_stp_btn.innerText = "Başlat";

  if (kronometre_btn.innerText == "Kronometre") {
    kronometre_btn.innerText = "Pomodoro";
  }
  else {
    kronometre_btn.innerText = "Kronometre";
  }
})

ses_menu_btn.addEventListener("click", () => {
  ses_menu.hidden = false;
  video_menu.hidden = true;
  tema_menu.hidden = true;
  pomodoro_menu.hidden = true;
})
ses_menu_kapat_btn.addEventListener("click", () => {
  ses_menu.hidden = true;
})

video_menu_btn.addEventListener("click", () => {
  video_menu.hidden = false;
  ses_menu.hidden = true;
  tema_menu.hidden = true;
  pomodoro_menu.hidden = true;
})
video_menu_kapat_btn.addEventListener("click", () => {
  video_menu.hidden = true;
})

tema_menu_btn.addEventListener("click", () => {
  tema_menu.hidden = false;
  ses_menu.hidden = true;
  video_menu.hidden = true;
  pomodoro_menu.hidden = true;
})
tema_menu_kapat_btn.addEventListener("click", () => {
  tema_menu.hidden = true;
})

pomodoro_menu_btn.addEventListener("click", () => {
  pomodoro_menu.hidden = false;
  ses_menu.hidden = true;
  video_menu.hidden = true;
  tema_menu.hidden = true;
})
pomodoro_menu_kapat_btn.addEventListener("click", () => {
  pomodoro_menu.hidden = true;
})


kronometre_start_stop_btn.addEventListener("click", () => {   // kronometre başlat-durrdur butonu event listener
  if (kronometre_sayac_id) {
    clearInterval(kronometre_sayac_id);
    kronometre_sayac_id = undefined;
    kronometre_start_stop_btn.innerText = "Başlat";
  }
  else {
    kronometre_sayac_id = setInterval(() => {
      kronometre_saniye.style.setProperty("--value", parseInt( kronometre_saniye.style.getPropertyValue("--value")) + 1)
      if (kronometre_saniye.style.getPropertyValue("--value") == 60) {
        kronometre_dakika.style.setProperty("--value", parseInt(kronometre_dakika.style.getPropertyValue("--value")) + 1);
        kronometre_saniye.style.setProperty("--value", 0);    
      }
    }, 1000);
     
    kronometre_start_stop_btn.innerText = "Durdur";
  }  
})

kronometre_reset_btn.addEventListener("click", () => {
  kronometre_saniye.style.setProperty("--value", 0);    
  kronometre_dakika.style.setProperty("--value", 0);
  clearInterval(kronometre_sayac_id);
  kronometre_sayac_id = undefined;
  kronometre_start_stop_btn.innerText = "Başlat";
})
