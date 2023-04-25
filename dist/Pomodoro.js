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

kronometre_btn.addEventListener("click", () => {
  kronometre_butonlar.hidden = !kronometre_butonlar.hidden;
  kronometre.hidden = !kronometre.hidden;
  pomodoro_sayac.hidden = !pomodoro_sayac.hidden;
  pomodoro_sayac_butonlar.hidden = !pomodoro_sayac_butonlar.hidden;
  if (kronometre_btn.innerText == "Kronometre") {
    kronometre_btn.innerText = "Pomodoro";
  }
  else{
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
video_menu_kapat_btn.addEventListener("click", ()=>{
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



let title = document.querySelector("title");       // title DOM elementini seçtik


const config = { attributes: true };              // attribute'u ayarlanabilir/değiştirilebilir kıldık 

// observer mutasyon(config nesnesindeki özelliklerde) gözlediğinde çalışan fonksiyon
function callback(){
  let dakikaTitle = dakika.style.getPropertyValue("--value");   // sürekli değişen dakikayı getproperty fonksiyonu ile alıp dakikaTitle değişkenine eşitliyoruz
  let saniyeTitle = saniye.style.getPropertyValue("--value");  // aynı işi saniye için de yapıyoruz
  if (saniyeTitle == 0) {
    saniyeTitle = "00";
  }
  if (dakikaTitle == 0) {
    dakikaTitle = "00";
  }
  title.innerText = `${dakikaTitle}:${saniyeTitle} - Pomodoro2Do`;  // title'ın innertext'ini yukarıda eşitleme yaptığımız değişkenlerle değiştiriyoruz
};

// üstteki callback fonksiyonunu çağıran observer objesini oluşturma
const observer = new MutationObserver(callback);

// observer objesinin saniye elementinin config içindeki özelliklerinin değişimini incelemeye başlamasını sağladık. Bu özellikler her değiştiğinde callback fonksiyonu çağırılacak
observer.observe(saniye, config);

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

calisma_mola_btn.addEventListener("click", function () {  //çalışma-mola butonu event listener

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


