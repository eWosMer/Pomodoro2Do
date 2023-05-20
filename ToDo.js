                                                                                   //local storage sadece string kabul ettiğinden array'i stringe çevirip kullandık
let gorevler = JSON.parse(localStorage.getItem("gorevler"));                       //local storge'ın string olarak gördüğü datayı tekrar array haline çevirdik

let tamamlanmisGorevler = JSON.parse(localStorage.getItem("tamamlanmis"));

if (gorevler == null) {
  gorevler = [];                                                                   //local storage boşken array olmadığından burada boşken de array'e çevirdik böylece ilk kez kullanan biri görev eklediğinde kaydedebileceğiz
}

if (tamamlanmisGorevler == null) {                                                //local storage boşken array olmadığından burada boşken de array'e çevirdik böylece ilk kez kullanan biri görev eklediğinde kaydedebileceğiz
  tamamlanmisGorevler = [];
}

let devamEdenlerContainer = document.getElementById("devam-edenler-container");   //html sayfasından devam eden görevler kutusunu alıp değişkene atadık
let tamamlanmisContainer = document.getElementById("tamamlanmis-container");      //html sayfasından biten görevler kutusunu alıp değişkene atadık

let tamamlanmisTab = document.getElementById("tamamlanmis-tab");                  //html'den tamamlanan görev butonunu alıp değişkene atadık
tamamlanmisTab.addEventListener("click", () => {                                  //tamamlanmış görev butonuna tıklanırsa

  devamEdenlerContainer.hidden = true;                                            //devam eden görevler kutusunu gizle
  tamamlanmisContainer.hidden = false;                                            //tamamlanan görevler kutusunu göster
  devamEdenTab.classList.remove("tab-active");                                    //devam edenler butonundan aktif efektini kaldır
  tamamlanmisTab.classList.add("tab-active");                                     //tamamlananlar butonunu aktif efekti ekle

}); // !!! tamamlanan görevler butonu event listener kodu burada bitiyor !!!


let devamEdenTab = document.getElementById("devam-eden-tab");                     //html'den devam eden görevler butonunu alıp değişkene atadık
devamEdenTab.addEventListener("click", () => {                                    //devam edenler butonuna tıklanırsa

  devamEdenlerContainer.hidden = false;                                           //devam edenler kutusunu göster
  tamamlanmisContainer.hidden = true;                                             //tamamlananlar kutusunu gizle
  devamEdenTab.classList.add("tab-active");                                       //devam edenler butonuna aktif efekti ekle 
  tamamlanmisTab.classList.remove("tab-active");                                  //tamamlananlar butonundan aktif efektini kaldır


}); // !!! devam eden görevler butonu event listener kodu burada bitiyor!!!







tamamlanmisRenderla();                                                            //tamamlanan görevleri yeniden kontrol ettiğimiz fonksiyonnu çağırıyoruz, to-do sayfası ilk açıldığında çalışan fonksiyon bunlar
gorevleriRenderla();                                                              //devam eden görevleri yeniden kontrol ettiğimiz fonksiyonu çağırıyoruz, to-do sayfası ilk açıldığında çalışan fonksiyon bu da

let ekleInput = document.getElementById("ekle-input");                            //görev eklediğimiz input elementini html'den alıp değişkene atadık
let ekleBtn = document.getElementById("ekle-btn");                                //ekle butonunu html'den alıp değişkene atadık

ekleBtn.addEventListener("click", () => {                                         //ekle butonu click listener
  let yeniGorevInput = ekleInput.value;                                           //yenigörevinput adlı bir değişken oluşturup bunu girilen değere eşitledik
  gorevler.push(yeniGorevInput);                                                  //oluşturduğumuz bu yenigörev değişkenini görevler dizisini pushladık/ekledik
  localStorage.setItem("gorevler", JSON.stringify(gorevler));                     //görevler dizisini stringleştirerek local storage'a "gorevler" olarak kaydettik
  gorevleriRenderla();                                                            //görevlere ekleme yapıldığı için görevlerirenderl fonksiyonunu çağırdık ki değişiklikler işlensin
  ekleInput.value = "";                                                           //input çubuğumuzun içini temizledik ki kullanıcı silmek zorunda kalmasın

}); // !!! ekle butonu event listener kodu burada bitiyor !!!

ekleInput.addEventListener("keypress", function (event) {                         //ekle input yani girdi çubuğu event listener

  if (event.key === "Enter") {                                                    //eğer kullanıcı input aktifken enter tuşuna basarsa

    ekleBtn.click();                                                              // ekle butonuna tıklanmış gibi aksiyon al
  }
}); // !!! ekle input event listener bu kadar !!!


function gorevleriRenderla() {                                                    //görevleri yeniden kontrol edip düzenleme yaptığımız fonksiyon :

  gorevler = JSON.parse(localStorage.getItem("gorevler"));                        //local storage içindeki görevler dizisinde görev varsa bunlaru burdaki değişkene aldık 
  
  if (gorevler == null) {                                                         //eğer local storage içinde hiç görev yoksa
    gorevler = [];                                                                //görevler adında boş bir dizi oluştur
  }

  let devamEdenler = document.getElementById("devam-edenler");                    //html'den devam edenler adlı listeyi alıp değişkene atadık
  devamEdenler.innerHTML = "";                                                    // array elementlerini tekrar yazmasını engellemek için önceden kaydedilen verileri sıfırlamış gibi olduk

  for (let i = 0; i < gorevler.length; i++) {                                     // i bizim listemizin indisi, eğer listedeki görev sayısı görevler dizisindeki görev sayısından eksikse indis sayısını bir artır ve bu fonksiyona gir :

    let yeniGorevContainer = document.createElement("li");                        //yeni görev kutusu adında bir list item oluşturduk, kutu olmasının sebebi herhangi bir görevin içinde butonların da olması
    let yeniGorev = document.createElement("input");                              //yenigörev adlı değişkenimizi bir input olarak oluşturduk
    yeniGorev.disabled = true;                                                    //görev sadece butona basılınca değiştirilsin diye devre dışı bıraktık
    yeniGorev.value = gorevler[i];                                                //yenigörev'in değeri de for döngüsüne girerken i değişkenine verdiğimiz sayı oldu böylece yeni görevin indisini belirledik


   let silBtn = document.createElement("button");                                 //sil butınu adında bir buton oluşturduk
    silBtn.innerHTML = '<svg viewBox="-7.44 -7.44 38.88 38.88" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4.99997 8H6.5M6.5 8V18C6.5 19.1046 7.39543 20 8.5 20H15.5C16.6046 20 17.5 19.1046 17.5 18V8M6.5 8H17.5M17.5 8H19M9 5H15M9.99997 11.5V16.5M14 11.5V16.5" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>';
    silBtn.addEventListener("click", () => {                                      //sil  butonu click listener
      gorevler.splice(i, 1);                                                      //for döngüsü içinde yeni göreve i indis değerini verdiğimizden splice fonksiyonuyla silme işlemi butonun bulunduğu containerde gerçekleşiyor
      localStorage.setItem("gorevler", JSON.stringify(gorevler));                 //dizide değişiklik olduğundan diziyi tekrar local stroge'a kaydettik
      gorevleriRenderla();                                                        //hem listede hem de storage'da değişiklik olduğundan ve işlemin en başına dönmemiz gerektiğinden fonksiyonu kendi içinde çağırdık
    })

    let editBtn = document.createElement("button");                              //düzenle butonu adında bir buton oluşturduk
    editBtn.innerHTML = '<svg viewBox="-7.44 -7.44 38.88 38.88" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.2424 20H17.5758M4.48485 16.5L15.8242 5.25607C16.5395 4.54674 17.6798 4.5061 18.4438 5.16268V5.16268C19.2877 5.8879 19.3462 7.17421 18.5716 7.97301L7.39394 19.5L4 20L4.48485 16.5Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
    editBtn.addEventListener("click", () => {                                    //düzenle butonu click listener
      if (yeniGorev.disabled) {                                                  //eğer yenigörev devre dışıysa
        yeniGorev.addEventListener("keypress", function (event) {                //yenigörev'e klavye girdi listener ekle

          if (event.key === "Enter") {                                           //ve eğer klavyaden "enter" girilirse

            editBtn.click();                                                     //düzenle butonuna ikinci kez tıklamış ol
          }
        });


        editBtn.innerHTML = '<svg viewBox="-7.2 -7.2 38.40 38.40" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="thumbUpIconTitle" stroke="#000000" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title id="thumbUpIconTitle">Thumb Up</title> <path d="M8,8.73984815 C8,8.26242561 8.17078432,7.80075162 8.4814868,7.43826541 L13.2723931,1.84887469 C13.7000127,1.34998522 14.4122932,1.20614658 15,1.5 C15.5737957,1.78689785 15.849314,2.45205792 15.6464466,3.06066017 L14,8 L18.6035746,8 C18.7235578,8 18.8432976,8.01079693 18.9613454,8.03226018 C20.0480981,8.22985158 20.7689058,9.27101818 20.5713144,10.3577709 L19.2985871,17.3577709 C19.1256814,18.3087523 18.2974196,19 17.3308473,19 L10,19 C8.8954305,19 8,18.1045695 8,17 L8,8.73984815 Z"></path> <path d="M4,18 L4,9"></path> </g></svg>';
      }
      else {                                                                     //eğer yenigörev input halindeyse
        gorevler[i] = yeniGorev.value;                                           //yenigörev görevler dizisindeki yerini korusun ??????
        localStorage.setItem("gorevler", JSON.stringify(gorevler));              //düzenlenen görev olduğundan görevler dizisini local storage'a kaydet
        gorevleriRenderla();                                                     //hem listede hem de storage'da değişiklik olduğundan ve işlemin en başına dönmemiz gerektiğinden fonksiyonu kendi içinde çağırdık
      }

      yeniGorev.disabled = !yeniGorev.disabled;                                  //tıklanınca yenigörev ne durumdaysa tam tersine çevir;devredışıysa etkin,etkise devre dışı yap

    })

    let tamamlaBtn = document.createElement("button");                            //tamamla butonu adında bir buton oluşturduk
    tamamlaBtn.innerHTML = '<svg viewBox="-7.44 -7.44 38.88 38.88" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="tick"> <polyline fill="none" points="3.7 14.3 9.6 19 20.3 5" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline> </g> </g> </g></svg>';
    tamamlaBtn.addEventListener("click", () => {                                  //tamamla butonu click listener
      let tamamlanmisGorev = gorevler.splice(i, 1)[0];                            //tamamlanmış görevler listesine, butonun bulunduğu değişkeni ata ve devam edenlerden sil 
      localStorage.setItem("gorevler", JSON.stringify(gorevler));                 //görevler listesi değiştiğinden listeyi stringle ve local storage'a kaydet
      tamamlanmisGorevler.push(tamamlanmisGorev);                                 //yeni oluşturulan tamamlanmış görevi tamamlanmis dizisine pushla/ekle
      localStorage.setItem("tamamlanmis", JSON.stringify(tamamlanmisGorevler));   //tamamlanmis listesi değiştiğinden stringle ve local storage'a kaydet
      gorevleriRenderla();                                                        //hem listede hem de storage'da değişiklik olduğundan ve işlemin en başına dönmemiz gerektiğinden fonksiyonu kendi içinde çağırdık
      tamamlanmisRenderla();                                                      //hem listede hem de storage'da değişiklik olduğundan ve işlemin en başına dönmemiz gerektiğinden fonksiyonu kendi içinde çağırdık
    })




    yeniGorev.classList.add("input", "input-primary", "w-full");
    yeniGorevContainer.classList.add("flex");
    silBtn.classList.add("btn", "btn-primary", "btn-circle");
    editBtn.classList.add("btn", "btn-primary", "btn-circle");
    tamamlaBtn.classList.add("btn", "btn-primary", "btn-circle");

//yukarıdaki blokta görev kutusu içindeki butonlara şekil ve renk verdik ve kutuyu flex olarak ayarladık




/* appendChild fonksiyonu, bir HTML elementine başka bir element eklemek için kullanılan bir JavaScript yöntemidir.
   Bu yöntem, belirli bir HTML elementinin sonuna başka bir element ekler.*/

    yeniGorevContainer.appendChild(yeniGorev);                                    //yenigorevcontainer içine "yenigorev" elementini oluşturduk 
    yeniGorevContainer.appendChild(tamamlaBtn);                                   //yenigorevcontainer içine "tamamlabtn" elementini oluşturduk
    yeniGorevContainer.appendChild(editBtn);                                      //yenigorevcontainer içine "editbtn" elementini oluşturduk 
    yeniGorevContainer.appendChild(silBtn);                                       //yenigorevcontainer içine "silbtn" elementini oluştuduk
    devamEdenler.appendChild(yeniGorevContainer);                                 //devamedenler sekmesi içine "yenigorevcontainer" elementini oluşturduk

  } // !!! for döngüsü burada bitiyor !!!


} // !!! görevleri renderle fonksiyonu kodları burada bitiyor !!!




let hepsiniTamamlaBtn = document.getElementById("hepsini-tamamla");               //html'den aldıığımız hepsini-tamamla elementini değişkene atadık 
hepsiniTamamlaBtn.addEventListener("click", () => {                               //hepsinitamamla butonu click listener
  gorevler = JSON.parse(localStorage.getItem("gorevler"));                        //local storage'da bulunan tüm görevleri al
  tamamlanmisGorevler = JSON.parse(localStorage.getItem("tamamlanmis"))           //local storage'da bulunun tüm tamamlanmış görevleri al

  if (gorevler == null) {                                                         //eğer hiç görev yoksa
    gorevler = [];                                                                //boş bir görev dizisi oluştur
  }

  if (tamamlanmisGorevler == null) {                                              //eğer hiç tamamlanmış görev yoksa
    tamamlanmisGorevler = [];                                                     //boş bir tamamlanmışgörev dizisi oluştur
  }

  tamamlanmisGorevler.push(...gorevler);                                          //üç noktadan sonra array içindeki bütün verileri tamamlanmış görevlere pushladık
  localStorage.setItem("gorevler", null);                                         //local storage'daki "tamamlanmis" dizisini boşa ayarla
  localStorage.setItem("tamamlanmis", JSON.stringify(tamamlanmisGorevler));       //tamamlanmış görevleri stringe çevirip local storage'a kaydettik
  gorevleriRenderla();                                                            //hem listede hem de storage'da değişiklik olduğundan ve işlemin en başına dönmemiz gerektiğinden fonksiyonu kendi içinde çağırdık
  tamamlanmisRenderla();                                                          //hem listede hem de storage'da değişiklik olduğundan ve işlemin en başına dönmemiz gerektiğinden fonksiyonu kendi içinde çağırdık


}); // !!! hepsini tamamla butonu event listener kodları burada bitiyor !!!




function tamamlanmisRenderla() {                                                  //tamamlanmış görevleri yeniden kontrol edip düzenleme yaptığımız fonksiyon :
  tamamlanmisGorevler = JSON.parse(localStorage.getItem("tamamlanmis"));          //local storage'dan tamamlanmış görevleri alıp değişkene(diziye) atadık

  if (tamamlanmisGorevler == null) {                                              //eğer storage'da hiç tamamlanmış görev yoksa    
    tamamlanmisGorevler = [];                                                     //boş bir tamamlanmışgörev dizisi oluştur
  }

  let tamamlanmis = document.getElementById("tamamlanmis");                       //html'den tamamlanmis id'li listeyi alıp değişkene atadık
  tamamlanmis.innerHTML = "";                                                     // array elementlerini tekrar yazmasını engellemek için önceden kaydedilen verileri sıfırlamış gibi olduk    

  for (let i = 0; i < tamamlanmisGorevler.length; i++) {                          // i bizim listemizin indisi, eğer listedeki görev sayısı tamamlanmış görevler dizisindeki görev sayısından eksikse indis sayısını bir artır ve bu fonksiyona gir :

    let yeniGorevContainer = document.createElement("li");                        //yeni görev kutusu adında bir list item oluşturduk, kutu olmasının sebebi herhangi bir görevin içinde butonların da olması
    let yeniGorev = document.createElement("input");                              //yenigörev adlıdeğişkenimizi bir input olarak oluşturduk
    yeniGorev.disabled = true;                                                    //görev sadece butona basılınca değiştirilsin diye devre dışı bıraktık
    yeniGorev.value = tamamlanmisGorevler[i];                                     //yenigörev'in değeri de for döngüsüne girerken i değişkenine verdiğimiz sayı oldu böylece yeni görevin indisini belirledik

    let silBtn = document.createElement("button");                                //sil butonu adında bir buton oluşturduk
    silBtn.innerHTML = '<svg viewBox="-7.44 -7.44 38.88 38.88" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4.99997 8H6.5M6.5 8V18C6.5 19.1046 7.39543 20 8.5 20H15.5C16.6046 20 17.5 19.1046 17.5 18V8M6.5 8H17.5M17.5 8H19M9 5H15M9.99997 11.5V16.5M14 11.5V16.5" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>';
    silBtn.addEventListener("click", () => {                                      //sil  butonu click listener
      tamamlanmisGorevler.splice(i, 1);                                           //for döngüsü içinde yeni göreve i indis değerini verdiğimizden splice fonksiyonuyla silme işlemi butonun bulunduğu containerde gerçekleşiyor
      localStorage.setItem("tamamlanmis", JSON.stringify(tamamlanmisGorevler));   //dizide değişiklik olduğundan diziyi tekrar local stroge'a kaydettik
      tamamlanmisRenderla();                                                      //hem listede hem de storage'da değişiklik olduğundan ve işlemin en başına dönmemiz gerektiğinden fonksiyonu kendi içinde çağırdık
    })


    yeniGorev.classList.add("input", "input-primary", "w-full");
    yeniGorevContainer.classList.add("flex");
    silBtn.classList.add("btn", "btn-primary", "btn-circle");

    //yukarıdaki blokta container'i flex yapıp içindeki elemetlere stil verdik

    yeniGorevContainer.appendChild(yeniGorev);                                    //yenigorevcontainer içine "yenigorev" elementini oluşturduk 
    yeniGorevContainer.appendChild(silBtn);                                       //yenigorevcontainer içine "silbtn" elementini oluştuduk
    tamamlanmis.appendChild(yeniGorevContainer);                                  //yamamlanmis sekmesi içine "yenigorevcontainer" elementini oluşturduk

  } // !!! for döngüsü burada bitiyor !!!



  let hepsinisilBtn = document.getElementById("hepsini-sil");                     //html'den aldıığımız hepsini-sil elementini değişkene atadık 
  hepsinisilBtn.addEventListener("click", () => {                                 //hepsini sil buton click listener
    localStorage.setItem("tamamlanmis", null);                                    //local storage'daki tamamlanmis dizisini boşalt
    tamamlanmisRenderla();                                                        //hem listede hem de storage'da değişiklik olduğundan ve işlemin en başına dönmemiz gerektiğinden fonksiyonu kendi içinde çağırdık
  })


} // !!! tamamlanmisrenderla fonksiyonu kodları burada bitiyor !!!




// tarih ve saat kodları

let tarih = document.getElementById("tarih");                                     //html'den tarih id'li elementi al ve bu değişkene eşitle
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
  let ay = simdi.getMonth() + 1;                                                  // js'de aylar sıfırdan(0) başladığından değişkene bir(1) ekledik.
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