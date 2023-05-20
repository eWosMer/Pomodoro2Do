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
let video_container = document.getElementById("video-container");


//yukarıda bu kısımda kullanacağımız değişkenleri tanımladık veya html sayfasındaki karşılığından alarak yeni bir değişkene atadık




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


pomodoro_input.addEventListener("change", function () {                       //menü kısmındaki pomodoro'nun süresi değişince bu fonksiyona giriyor
  pomodoro_baslangic = pomodoro_input.value;                                  //pomodoro sayacının başlangıç değerini girilen değere eşitliyor
  if (calisma_vakti) {                                                        //pomodoro sayacı etkinse 
    dakika.style.setProperty("--value", pomodoro_input.value);      //sayacın dakika değerini girilen değere eşitliyor
    saniye.style.setProperty("--value", 0);                                   //saniyeyi sıfırlıyor
  }
}); // !!! pomodoro süre girdisi kodları burada bitiyor !!!


mola_input.addEventListener("change", function () {                           //menü kısmındaki mola'nın süresi değişince bu fonksiyona giriyor
  mola_baslangic = mola_input.value;                                          //mola sayacının başlangıç değerini girilen değere eşitliyor

  if (!calisma_vakti) {                                                       //eğer pomodoro sayacı etkin değilse yani ekranda mola sayacı görünüyorsa
    dakika.style.setProperty("--value", mola_input.value);                    //sayacın dakika değerini girilen değere eşitliyor
    saniye.style.setProperty("--value", 0);                                   //saniyeyi sıfırlıyor
  }
}); // !!! mola süre girdisi koodları burada bitiyor !!!


strt_stp_btn.addEventListener("click", function () {                          //başlat-durdur butonu click listener fonksiyonu
  if (sayac_id) {                                                             //eğer sayaç çalışıyorsa
    clearInterval(sayac_id);                                                  //sayacı durdur
    sayac_id = undefined;                                                     //
    strt_stp_btn.innerText = "Başlat";                                        //butonun yazısını başlat yap
  }
  else {                                                                      //eğer sayaç çalışmıyorsa
    sayac_id = setInterval(() => {                                            //sayacın mesafesini/süre değişimini şuna eşitle:
      sayac(sayac_id);                                                        //sayacı başlat
    }, 1000);                                                                 //her 1000 milisaniyede bir değeri değiştir
    strt_stp_btn.innerText = "Durdur";                                        //butonun yazısını durdur yap
  }
}); // !!! başlat-durdur butonu kodları burada bitiyor !!!


const sayac = function (id) {                                                                      //sayac fonksiyonu:
  if (saniye.style.getPropertyValue("--value") > 0) {                                              //--value değişkeninin saiyesini al ve eğer 0'dan büyükse
    saniye.style.setProperty("--value", (saniye.style.getPropertyValue("--value") - 1));           //saniyenin değerini 1 eksilt ve tekrar --value değişkenine eşitle
  }
  if (saniye.style.getPropertyValue("--value") == 0) {                                             //--value değişkeninin saniyesi 0'a eşitse
    if (dakika.style.getPropertyValue("--value") == 0) {                                           // aynı zamanda dakika değeri 0'a eşitse
      clearInterval(id);                                                                           //sayacı durdur
    }
    else {                                                                                         //saniye 0 ama dakika 0'dan farklıysa
      dakika.style.setProperty("--value", (dakika.style.getPropertyValue("--value") - 1));         //dakika değerini 1 eksit ve --value değişkenine eşitle
      saniye.style.setProperty("--value", 59);                                                     //saniye değerini 59'a ayarla ve --value değişkenine eşitle
    }
  }
} // !!! sayac fonksiyonu kodları burada bitiyor !!!


calisma_mola_btn.addEventListener("click", function () {                    //çalışma-mola butonu click listener

  clearInterval(sayac_id);                                                  //sayacı durdur
  sayac_id = undefined;                                                     //
  strt_stp_btn.innerText = "Başlat";                                        //başlat durdur butonunu başlat olarak ayarla

  if (calisma_vakti) {                                                      //çalışma vakti etkinse yani pomodoro sayacındaysak
    calisma_vakti = false;                                                  //çalışma vaktini false yap yani artık pomodoro sayacında değiliz
    dakika.style.setProperty("--value", mola_baslangic);                    //mola sayacının dakika değerini girilen mola inputuna eşitle
    saniye.style.setProperty("--value", 0);                                 //saniye değerini 0'a eşitle
    calisma_mola_btn.innerText = "Çalışmaya geç";                           //butonun yazısını çalışmaya geç olarak ayarla
  }

  else {                                                                    //pomodoro saycı etkin değilse yani moladaysak
    calisma_vakti = true;                                                   //çalışma vakti etkin yani artık pomodoro sayacındayız
    dakika.style.setProperty("--value", pomodoro_baslangic);                //sayacın dakika değerini girilen başlangıç inputuna eşitle
    saniye.style.setProperty("--value", 0);                                 //saniye değerini 0'a eşitle
    calisma_mola_btn.innerText = "Molaya geç";                              //butonun yazısını molaya geç olarak ayarla
  }
})

sifirla_btn.addEventListener("click", () => {                               //sıfırla butonu click listener

  if (calisma_vakti == true) {                                              //eğer çalışma vaktindeysek yani pomodoro sayacı etkinse
    dakika.style.setProperty("--value", pomodoro_baslangic);                //dakika değerini girilen başlangıç değerine eşitle
  }

  else {                                                                    //çalışma vaktinde değilsek yani moladaysak
    dakika.style.setProperty("--value", mola_baslangic);                    //dakika değerini girilen mola inputuna eşitle
  }

  saniye.style.setProperty("--value", 0);                                   //her iki durum için de saniye değerini 0'a eşitle

  if (sayac_id) {                                                           //eğer pomodoro sayaç çalışıyorsa
    clearInterval(sayac_id);                                                //sayacı durdur
    sayac_id = undefined;                                                   //
    strt_stp_btn.innerText = "Başlat";                                      //başlat-durdur butonunun yazısını başlat olarak ayarla
  }

})// !!! çalışma mola butonu kodları burada bitiyor!!!


// kronometre kodu aşağıdan başlıyor:

kronometre_btn.addEventListener("click", () => {                            //menüdeki kronometre butonu click listener
  kronometre_butonlar.hidden = !kronometre_butonlar.hidden;                 //eğer kronometre butonları gizliyse göster, gösteriliyorsa gizle
  kronometre.hidden = !kronometre.hidden;                                   //eğer kronometre sayacı gizliyse göster, gösteriliyorsa gizle
  pomodoro_sayac.hidden = !pomodoro_sayac.hidden;                           //eğer pomodoro sayacı gizliyse göster, gösteriliyorsa gizle
  pomodoro_sayac_butonlar.hidden = !pomodoro_sayac_butonlar.hidden;         //eğer pomodoro butonları gizliyse göster, gösteriliyorsa gizle
  clearInterval(kronometre_sayac_id);                                       //kronometre sayacını durdur
  clearInterval(sayac_id);                                                  //pomodoro sayacını durdur
  sayac_id = undefined;                                                     //sayac id'yi boşa aldık
  kronometre_sayac_id = undefined;                                          //kronometre sayac id'yi boşa aldık
  kronometre_start_stop_btn.innerText = "Başlat";                           //koronometre başlat-durdur butonunun yazısını başlat yap
  strt_stp_btn.innerText = "Başlat";                                        //pomodoro başlat durdur butonunun yazısını başlat yap

  if (kronometre_btn.innerText == "Kronometre") {                           //eğer menüdeki butonda kronometre yazıyorsa
    kronometre_btn.innerText = "Pomodoro";                                  //butonun yazısını pomodoro yap
  }
  else {                                                                    //eğer menüdeki butonda pomodoro yazıyorsa
    kronometre_btn.innerText = "Kronometre";                                //butonun yazısını kronometre yap
  }
}); // !!! menü içindeki kronometre-pomodoro geçiş butonu kodları burada bitiyor !!!


kronometre_start_stop_btn.addEventListener("click", () => {                 // kronometre başlat-durdur butonu click listener
  if (kronometre_sayac_id) {                                                //eğer kronometre sayacı çalışıyorsa
    clearInterval(kronometre_sayac_id);                                     //kronometre sayacını durdur
    kronometre_sayac_id = undefined;                                             //kronometre sayac id değişkenini boşa aldık ki sayacın çalışıp çalışmadığını kontrol edebilelim
    kronometre_start_stop_btn.innerText = "Başlat";                         //butonun yazısını başlat olarak ayarla
  }
  else {                                                                                                                        //kronometre sayacı çalışmıyorsa
    kronometre_sayac_id = setInterval(() => {                                                                                   //sayacın mesafe/değişim süresini şöyle ayarla:
      kronometre_saniye.style.setProperty("--value", parseInt(kronometre_saniye.style.getPropertyValue("--value")) + 1)         //--value değerini al, saniyeyi 1 artır ve tekrar --value değişkenine eşitle
    
      if (kronometre_saniye.style.getPropertyValue("--value") == 60) {                                                          //eğer saniye 60 olursa
        kronometre_dakika.style.setProperty("--value", parseInt(kronometre_dakika.style.getPropertyValue("--value")) + 1);      //--value değerini al, dakikayı 1 artır ve tekrar --value değişkenine eşitle
        kronometre_saniye.style.setProperty("--value", 0);                                                                      //saniye değerini 0'a eşitle
      }
    }, 1000);                                                                                                                   //değişim mesafesi/süresini 1000 milisaniye(1saniye) olarak ayarla

    kronometre_start_stop_btn.innerText = "Durdur";                                                                             //butonun içini durdur yap
  }
}); // !!! kronometre başlat-durdur butonu kodları burada bitiyor !!!


kronometre_reset_btn.addEventListener("click", () => {                            //koronometre sıfırla butonu click listener
  kronometre_saniye.style.setProperty("--value", 0);                              //kronometre saniye değerini 0'a eşitle
  kronometre_dakika.style.setProperty("--value", 0);                              //kronometre dakika değerini 0'a eşitle
  clearInterval(kronometre_sayac_id);                                             //kronometre sayacını durdur
  kronometre_sayac_id = undefined;                                                     //
  kronometre_start_stop_btn.innerText = "Başlat";                                 //kronometre başlat-durdur butonunun yazısını başlat yap
}); // !!! kronometre reset butonu kodları burada bitiyor !!!




// menü buton fonksiyonları:

ses_menu_btn.addEventListener("click", () => {                                    //ses menü butonu click listener
  ambiance_menu.hidden = true;                                                    //ambiyans menüsünü gizle
  video_menu.hidden = true;                                                       //video menüsünü gizle
  ses_menu.hidden = false;                                                        //ses menüsünü göster
  tema_menu.hidden = true;                                                        //tema menüsünü gizle
  pomodoro_menu.hidden = true;                                                    //pomodoro menüsünü gizle
});

ses_menu_kapat_btn.addEventListener("click", () => {                              //ses menüsü kapat butonu click listener
  ses_menu.hidden = true;                                                         //ses menüsünü gizle
});

video_menu_btn.addEventListener("click", () => {                                  //video menüsü click listener
  ambiance_menu.hidden = true;                                                    //ambiyans menüsünü gizle
  video_menu.hidden = false;                                                      //video menüsünü göster
  ses_menu.hidden = true;                                                         //ses menüsünü gizle
  tema_menu.hidden = true;                                                        //tema menüsünü gizle
  pomodoro_menu.hidden = true;                                                    //pomodoro menüsünü gizle
});

video_menu_kapat_btn.addEventListener("click", () => {                            //video menü kapat butonu click listener
  video_menu.hidden = true;                                                       //video menüsünü gizle
});

ambiance_menu_btn.addEventListener("click", () => {                               //ambiyans menüsüclick listener
  ambiance_menu.hidden = false;                                                   //ambiyans menüsünü göster
  video_menu.hidden = true;                                                       //video menüsünü gizle
  ses_menu.hidden = true;                                                         //ses menüsünü gizle
  tema_menu.hidden = true;                                                        //tema menüsünü gizle
  pomodoro_menu.hidden = true;                                                    //pomodoro menüsünü gizle
});

ambiance_menu_kapat_btn.addEventListener("click", () => {                         //ambiyans menüsü kapat butonu click listener
    ambiance_menu.hidden = true;                                                  //ambiyans menüsünü gizle
});

tema_menu_btn.addEventListener("click", () => {                                   //tema menüsü click listener
  ambiance_menu.hidden = true;                                                    //ambiyans menüsünü gizle
  video_menu.hidden = true;                                                       //video menüsünü gizle
  ses_menu.hidden = true;                                                         //ses menüsünü gizle
  tema_menu.hidden = false;                                                       //tema menüsünü göster
  pomodoro_menu.hidden = true;                                                    //pomodoro menüsünü gizle
});

tema_menu_kapat_btn.addEventListener("click", () => {                              //tema menü kapat butonu click listener
  tema_menu.hidden = true;                                                         //tema menüsünü gizle 
});

pomodoro_menu_btn.addEventListener("click", () => {                                //pomodoro menüsü click listener
  ambiance_menu.hidden = true;                                                     //ambiyans menüsünü gizle
  video_menu.hidden = true;                                                        //video menüsünü gizle
  ses_menu.hidden = true;                                                          //ses menüsünü gizle
  tema_menu.hidden = true;                                                         //tema menüsünü gizle 
  pomodoro_menu.hidden = false;                                                    //pomodoro menüsünü göster 
});

pomodoro_menu_kapat_btn.addEventListener("click", () => {                          //pomodoro menü kapat butonu click listener
  pomodoro_menu.hidden = true;                                                     //pomodoro menüsünü gizle
});



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


let video_buttonlari = document.querySelectorAll(".video-btn");     //video menüsündeki butonları buradaki değişkene eşitledik
let video;
let donen_video;                                                    //video ve dönen_video diye iki değişken tanımladık

video_buttonlari.forEach((video_btn, i) => {                        //video menüsündeki her bir buton için
  video_btn.addEventListener("click", () => {                       //video butonu click listener

    if (donen_video == videoIframe.src) {                           //eğer çalışan videoyla tıklanan butonun kaynağı aynıysa yani aynı butona ikinci kez tıklanmışsa
      videoIframe.src = "";                                         //video çerçevesinin kaynağını boşalttık böylece arkadaki video kayboldu
      video_container.hidden = true;                                //video çerçevemizi gizledik ki temamıza ve ekranımıza zarar vermesin
    }
    else {                                                          //eğer arka planda dönen video yoksa
      videoIframe.src = videolar[i];                                //çerçevnin kaynağını tıklanan butonun dizideki denk gelen kaynağına eşitledik
      donen_video = videoIframe.src;                                //dönen video değişkeniyle çerçevenin kaynağını aynı yaptık ki kontrol edebilelim
      video_container.hidden = false;                               //video çerçevesini görünür yaptık
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


let ambiance_buttonlari = document.querySelectorAll(".ambiance-btn");   //ambiyans menü butonlarını bu değişkene eşitledik
let ambiance;
let donen_ambiance;                                                     //iki yeni değişken oluşturduk

ambiance_buttonlari.forEach((ambiance_btn, a) => {                      //menüdeki her bir ambiyans butonu için
  ambiance_btn.addEventListener("click", () => {                        //ambiyans buton click listener

    if (donen_ambiance == videoIframe.src) {                            //eğer çalışan ambiyansla tıklanan butonun kaynağı aynıysa yani aynı butona ikinci kez tıklanmışsa
      videoIframe.src = "";                                             //video çerçevesinin kaynağını boşalttık böylece arkadaki ambiyans kayboldu
      video_container.hidden = true;                                    //video çerçevemizi gizledik ki temamıza ve ekranımıza zarar vermesin
    }
    else {                                                              //eğer arka planda dönen ambiyans yoksa
      videoIframe.src = ambiyanslar[a];                                 //çerçevnin kaynağını tıklanan butonun dizideki denk gelen kaynağına eşitledik
      donen_ambiance = videoIframe.src;                                 //dönen ambiyans değişkeniyle çerçevenin kaynağını aynı yaptık ki kontrol edebilelim
      video_container.hidden = false;                                   //video çerçevesini görünür yaptık

    }

  })
});




// pomodoro ses menüsü kodları :

let ses_butonlari = document.querySelectorAll(".ses-btn");                        //ses menü butonlarını bu değişkene eşitledik
let ses;
let calisan_ses;                                                                  //iki yeni değişken oluşturduk

ses_butonlari.forEach((ses_btn) => {                                              //her bir ses butonu için
  ses_btn.addEventListener("click", () => {                                       //ses butonu click listener 
    if (calisan_ses == ses_btn.innerText) {                                       //eğer çalışan sesle tıklanan butonun yazısı aynıysa yani butona ikince kez tıklanmışsa 
      ses.pause();                                                                //sesi durdur
      ses = null;                                                                 //ses değişkenini boş yap
      calisan_ses = null;                                                         //çalışan ses değişkenini boş yap
    }
    else {                                                                        //eğer çalışan ses yoksa veya farklıysa
      if (calisan_ses) {                                                          //şu an çalışsan ses varsa
        ses.pause();                                                              //sesi durdur ki sesler birbirine karışmasın
      }

      calisan_ses = ses_btn.innerText;                                            //çalışan sesi tıklanan butonun yazısına eşitle
      ses = new Audio("./sesler/" + ses_btn.innerText.toLowerCase() + ".mp3");    //ses değişkenini tıklanan butonun yazısına sonuna ".mp3" koyarak sesler dosyasındaki karşılığına eşitle ve yeni ses objesi oluştur
      ses.play();                                                                 //sesi oynat
    }
  })
})





// tarih ve saat kodları :


let tarih = document.getElementById("tarih");         //html'den tarih id'li elementi al ve bu değişkene eşitle
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
  let ay = simdi.getMonth() + 1;                      // js'de aylar sıfırdan(0) başladığından değişkene bir(1) ekledik.
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

  // buraya kadar olan kodlarda sayı tek haneliyse başına sıfır(0) ekledik ve bize gereken sistem verilerini aldık.

  tarih.innerText = `${gun}/${ay}/${simdi.getFullYear()}  -  ${saat}:${dakika}:${saniye}`;
}, 1000);

