/*  const temalar = [pastel,light,dark,cupcake,bumblebee,emerald,corporate,
                    synthwave,retro,cyberpunk,valentine,halloween,garden,forest,
                     aqua,wireframe,black,luxury,draclua,cmyk,autumn,business,acid,
                    lemonade,night,coffee,]; 
*/
//26 tane var


let html = document.querySelector("html");  //html elementini seçtik ve bunu html adlı değişkene atadık

let tema = localStorage.getItem("theme");   //local storage'da depolanan theme verisini alıp tema değişkenine atadık
if (tema) {
  html.setAttribute("data-theme", tema);    //eğer local storage içinde depolanan bir tema değişkeni varsa onu tüm html sayfalarına uygulattık
}

let tema_butonlari = document.querySelectorAll(".tema-btn");  //tema butonları adlı değişkeni html kısmındaki tema menü butonlarına eşitledik
tema_butonlari.forEach((tema_btn) => {                        //her bir tema butonu için
  tema_btn.addEventListener("click", () => {                  //tema butonu için tıklama listener fonksiyonu
    let yeni_tema = tema_btn.innerText.toLowerCase();         //yeni tema adlı değişkene tıklanan butonun içindeki yazıyı küçülterek atadık
    html.setAttribute("data-theme", yeni_tema);               //html içindeki "data-theme" elementinin içeriğine yeni tema değişkenini yazdık
    localStorage.setItem("theme", yeni_tema);                 //local storage içindeki theme kısmına yeni tema değişkenini depoladık
  })
})






