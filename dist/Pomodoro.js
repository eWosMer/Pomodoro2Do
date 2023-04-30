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
let ambiance_menu_btn = document.getElementById("ambiance-btn");
let ambiance_menu = document.getElementById("ambiance-menu");
let ambiance_menu_kapat_btn = document.getElementById("ambiance-menu-kapat");
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
let videoIframe = document.querySelector("iframe");


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

kronometre_start_stop_btn.addEventListener("click", () => {   // kronometre başlat-durrdur butonu event listener
  if (kronometre_sayac_id) {
    clearInterval(kronometre_sayac_id);
    kronometre_sayac_id = undefined;
    kronometre_start_stop_btn.innerText = "Başlat";
  }
  else {
    kronometre_sayac_id = setInterval(() => {
      kronometre_saniye.style.setProperty("--value", parseInt(kronometre_saniye.style.getPropertyValue("--value")) + 1)
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




// menü buton fonksiyonları:

ses_menu_btn.addEventListener("click", () => {
  ambiance_menu.hidden = true;
  video_menu.hidden = true;
  ses_menu.hidden = false;
  tema_menu.hidden = true;
  pomodoro_menu.hidden = true;
})
ses_menu_kapat_btn.addEventListener("click", () => {
  ses_menu.hidden = true;
})

video_menu_btn.addEventListener("click", () => {
  ambiance_menu.hidden = true;
  video_menu.hidden = false;
  ses_menu.hidden = true;
  tema_menu.hidden = true;
  pomodoro_menu.hidden = true;
})
video_menu_kapat_btn.addEventListener("click", () => {
  video_menu.hidden = true;
})

ambiance_menu_btn.addEventListener("click", () => {
  ambiance_menu.hidden = false;
  video_menu.hidden = true;
  ses_menu.hidden = true;
  tema_menu.hidden = true;
  pomodoro_menu.hidden = true;
})
ambiance_menu_kapat_btn.addEventListener("click", () => {
  ambiance_menu.hidden = true;
})

tema_menu_btn.addEventListener("click", () => {
  ambiance_menu.hidden = true;
  video_menu.hidden = true;
  ses_menu.hidden = true;
  tema_menu.hidden = false;
  pomodoro_menu.hidden = true;
})
tema_menu_kapat_btn.addEventListener("click", () => {
  tema_menu.hidden = true;
})

pomodoro_menu_btn.addEventListener("click", () => {
  ambiance_menu.hidden = true;
  video_menu.hidden = true;
  ses_menu.hidden = true;
  tema_menu.hidden = true;
  pomodoro_menu.hidden = false;
})
pomodoro_menu_kapat_btn.addEventListener("click", () => {
  pomodoro_menu.hidden = true;
})



// pomodoro video menüsü kodları :

let videolar = [
  "https://www.youtube.com/embed/XlZuouvZAUM?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1&amp;start=63",
  "https://www.youtube.com/embed/jDIWaGxgF94?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1&amp;start=8",
  "https://www.youtube.com/embed/TURbeWK2wwg?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
  "https://www.youtube.com/embed/Pn2mzyU52yI?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1&amp;start=8",
  "https://www.youtube.com/embed/Dke_GEac8e8?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
  "https://www.youtube.com/embed/xP0CY-2wK0k?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
  "https://www.youtube.com/embed/e49o8oQYJtE?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
  "https://www.youtube.com/embed/yq-ajlkczMA?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
  "https://www.youtube.com/embed/j9KbVBWHb6w?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1&amp;start=127",
  "https://www.youtube.com/embed/9PgO3bDc7R8?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1&amp;start=3679"];


let video_buttonlari = document.querySelectorAll(".video-btn");
let video;
let donen_video;

video_buttonlari.forEach((video_btn, i) => {
  video_btn.addEventListener("click", () => {

    if (donen_video == videoIframe.src) {
      videoIframe.src = "";
    }
    else {
      videoIframe.src = videolar[i];
      donen_video = videoIframe.src;
    }

  })
});


// pomodoro ambiance menüsü kodları :


let ambiyanslar =[
    "https://www.youtube.com/embed/qhPr8XgRnrg?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
    "https://www.youtube.com/embed/W5KJsQMKbwM?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
    "https://www.youtube.com/embed/4FLK_r3PAh4?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
    "https://www.youtube.com/embed/GXZD0uJYr3k?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
    "https://www.youtube.com/embed/YQc4WT0yDH4?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
    "https://www.youtube.com/embed/bpgNEGweWP8?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
    "https://www.youtube.com/embed/tEHPDsIiIjc?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
    "https://www.youtube.com/embed/bn9F19Hi1Lk?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
    "https://www.youtube.com/embed/z8zdPVlkZQw?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1",
    "https://www.youtube.com/embed/KDJjrRVik5o?autoplay=1&mute=1&modestbranding=1&fs=0&rel=0&controls=0&loop=1"
                 ];


let ambiance_buttonlari = document.querySelectorAll(".ambiance-btn");
let ambiance;
let donen_ambiance;

ambiance_buttonlari.forEach((ambiance_btn, a) => {
  ambiance_btn.addEventListener("click", () => {

    if (donen_ambiance == videoIframe.src) {
      videoIframe.src = "";
    }
    else {
      videoIframe.src = ambiyanslar[a];
      donen_ambiance = videoIframe.src;
    }

  })
});




// pomodoro ses menüsü kodları :

let ses_butonlari = document.querySelectorAll(".ses-btn");
let ses;
let calisan_ses;

ses_butonlari.forEach((ses_btn) => {
  ses_btn.addEventListener("click", () => {
    if (calisan_ses == ses_btn.innerText) {
      ses.pause();
      ses = null;
      calisan_ses = null;
    }
    else {
      if (calisan_ses) {
        ses.pause();
      }
      calisan_ses = ses_btn.innerText;
      ses = new Audio("./sesler/" + ses_btn.innerText.toLowerCase() + ".mp3");
      ses.play();
    }
  })
})





// tarih ve saat kodları :


let tarih = document.getElementById("tarih");
setInterval(() => {
  let simdi = new Date();
  let saat = simdi.getHours();
  if (saat < 10) {
    saat = "0" + saat;
  }
  let dakika = simdi.getMinutes();
  if (dakika < 10) {
    dakika = "0" + dakika;
  }
  let ay = simdi.getMonth() + 1;  // js'de aylar sıfırdan(0) başladığından değişkene bir(1) ekledik.
  if (ay < 10) {
    ay = "0" + ay;
  }
  let gun = simdi.getDate();
  if (gun < 10) {
    gun = "0" + gun;
  }
  let saniye = simdi.getSeconds();
  if (saniye < 10) {
    saniye = "0" + saniye;
  }

  // buraya kadar olan kodlarda sayı tek haneliyse başına sıfır(0) ekledik.

  tarih.innerText = `${gun}/${ay}/${simdi.getFullYear()}  -  ${saat}:${dakika}:${saniye}`;
}, 1000);

