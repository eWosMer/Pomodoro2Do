//local storage sadece string kabul ettiğinden array'i stringe çevirip kullandık
let gorevler = JSON.parse(localStorage.getItem("gorevler"));   //local storge'ın string olarak gördüğü datayı tekrar array haline çevirdik

let tamamlanmisGorevler = JSON.parse(localStorage.getItem("tamamlanmis"));

if (gorevler == null) {
  gorevler = [];                                 //local storage boşken array olmadığından burada boşken de array'e çevirdik böylece ilk kez kullanan biri görev eklediğinde kaydedebileceğiz
}

if (tamamlanmisGorevler == null) {
  tamamlanmisGorevler = [];
}

let devamEdenlerContainer = document.getElementById("devam-edenler-container");
let tamamlanmisContainer = document.getElementById("tamamlanmis-container");

let tamamlanmisTab = document.getElementById("tamamlanmis-tab");
tamamlanmisTab.addEventListener("click", () => {

  devamEdenlerContainer.hidden = true;
  tamamlanmisContainer.hidden = false;
  devamEdenTab.classList.remove("tab-active");
  tamamlanmisTab.classList.add("tab-active");

})


let devamEdenTab = document.getElementById("devam-eden-tab");
devamEdenTab.addEventListener("click", () => {

  devamEdenlerContainer.hidden = false;
  tamamlanmisContainer.hidden = true;
  devamEdenTab.classList.add("tab-active");
  tamamlanmisTab.classList.remove("tab-active");
})







tamamlanmisRenderla();
gorevleriRenderla();

let ekleInput = document.getElementById("ekle-input");
let ekleBtn = document.getElementById("ekle-btn");

ekleBtn.addEventListener("click", () => {
  let yeniGorevInput = ekleInput.value;
  gorevler.push(yeniGorevInput);
  localStorage.setItem("gorevler", JSON.stringify(gorevler));
  gorevleriRenderla();
  ekleInput.value = "";
});

ekleInput.addEventListener("keypress", function (event) {

  if (event.key === "Enter") {                        // If the user presses the "Enter" key on the keyboard

    ekleBtn.click();                                  // ekle butonuna tıklanmış gibi aksiyon al
  }
});


function gorevleriRenderla() {
  gorevler = JSON.parse(localStorage.getItem("gorevler"));
  if (gorevler == null) {
    gorevler = [];
  }
  let devamEdenler = document.getElementById("devam-edenler");
  devamEdenler.innerHTML = "";                          // array elementlerini tekrar yazmasını engellemek için önceden kaydedilen verileri sıfırlamış gibi olduk

  for (let i = 0; i < gorevler.length; i++) {

    let yeniGorevContainer = document.createElement("li");
    let yeniGorev = document.createElement("input");
    yeniGorev.disabled = true;
    yeniGorev.value = gorevler[i];

    let silBtn = document.createElement("button");
    silBtn.innerHTML = '<svg viewBox="-7.44 -7.44 38.88 38.88" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4.99997 8H6.5M6.5 8V18C6.5 19.1046 7.39543 20 8.5 20H15.5C16.6046 20 17.5 19.1046 17.5 18V8M6.5 8H17.5M17.5 8H19M9 5H15M9.99997 11.5V16.5M14 11.5V16.5" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>';
    silBtn.addEventListener("click", () => {                           /* */
      gorevler.splice(i, 1);                                        //for döngüsü içinde splice yaptığımız için silme işlemi butonun bulunduğu containerde gerçekleşiyor
      localStorage.setItem("gorevler", JSON.stringify(gorevler));
      gorevleriRenderla();
    })

    let editBtn = document.createElement("button");
    editBtn.innerHTML = '<svg viewBox="-7.44 -7.44 38.88 38.88" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12.2424 20H17.5758M4.48485 16.5L15.8242 5.25607C16.5395 4.54674 17.6798 4.5061 18.4438 5.16268V5.16268C19.2877 5.8879 19.3462 7.17421 18.5716 7.97301L7.39394 19.5L4 20L4.48485 16.5Z" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>';
    editBtn.addEventListener("click", () => {
      if (yeniGorev.disabled) {
        yeniGorev.addEventListener("keypress", function (event) {

          if (event.key === "Enter") {

            editBtn.click();
          }
        });


        editBtn.innerHTML = '<svg viewBox="-7.2 -7.2 38.40 38.40" role="img" xmlns="http://www.w3.org/2000/svg" aria-labelledby="thumbUpIconTitle" stroke="#000000" stroke-width="1" stroke-linecap="square" stroke-linejoin="miter" fill="none" color="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title id="thumbUpIconTitle">Thumb Up</title> <path d="M8,8.73984815 C8,8.26242561 8.17078432,7.80075162 8.4814868,7.43826541 L13.2723931,1.84887469 C13.7000127,1.34998522 14.4122932,1.20614658 15,1.5 C15.5737957,1.78689785 15.849314,2.45205792 15.6464466,3.06066017 L14,8 L18.6035746,8 C18.7235578,8 18.8432976,8.01079693 18.9613454,8.03226018 C20.0480981,8.22985158 20.7689058,9.27101818 20.5713144,10.3577709 L19.2985871,17.3577709 C19.1256814,18.3087523 18.2974196,19 17.3308473,19 L10,19 C8.8954305,19 8,18.1045695 8,17 L8,8.73984815 Z"></path> <path d="M4,18 L4,9"></path> </g></svg>';
      }
      else {
        gorevler[i] = yeniGorev.value;
        localStorage.setItem("gorevler", JSON.stringify(gorevler));
        editBtn.innerText = "duzenle";
        gorevleriRenderla();
      }

      yeniGorev.disabled = !yeniGorev.disabled;

    })

    let tamamlaBtn = document.createElement("button");
    tamamlaBtn.innerHTML = '<svg viewBox="-7.44 -7.44 38.88 38.88" xmlns="http://www.w3.org/2000/svg" fill="#000000" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="tick"> <polyline fill="none" points="3.7 14.3 9.6 19 20.3 5" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polyline> </g> </g> </g></svg>';
    tamamlaBtn.addEventListener("click", () => {
      let tamamlanmisGorev = gorevler.splice(i, 1)[0];
      localStorage.setItem("gorevler", JSON.stringify(gorevler));
      tamamlanmisGorevler.push(tamamlanmisGorev);
      localStorage.setItem("tamamlanmis", JSON.stringify(tamamlanmisGorevler));
      gorevleriRenderla();
      tamamlanmisRenderla();
    })





    yeniGorev.classList.add("input", "input-primary", "w-full");
    yeniGorevContainer.classList.add("flex");
    silBtn.classList.add("btn", "btn-primary", "btn-circle");
    editBtn.classList.add("btn", "btn-primary", "btn-circle");
    tamamlaBtn.classList.add("btn", "btn-primary", "btn-circle");



    yeniGorevContainer.appendChild(yeniGorev);
    yeniGorevContainer.appendChild(tamamlaBtn);
    yeniGorevContainer.appendChild(editBtn);
    yeniGorevContainer.appendChild(silBtn);
    devamEdenler.appendChild(yeniGorevContainer);

  }




}

let hepsiniTamamlaBtn = document.getElementById("hepsini-tamamla");
hepsiniTamamlaBtn.addEventListener("click", () => {
  gorevler = JSON.parse(localStorage.getItem("gorevler"));
  tamamlanmisGorevler = JSON.parse(localStorage.getItem("tamamlanmis"))

  if (gorevler == null) {
    gorevler = [];                                
  }
  
  if (tamamlanmisGorevler == null) {
    tamamlanmisGorevler = [];
  }

  tamamlanmisGorevler.push(...gorevler);
  localStorage.setItem("gorevler", null);
  localStorage.setItem("tamamlanmis", JSON.stringify(tamamlanmisGorevler));
  gorevleriRenderla();
  tamamlanmisRenderla();


})



function tamamlanmisRenderla() {
  tamamlanmisGorevler = JSON.parse(localStorage.getItem("tamamlanmis"));
  if (tamamlanmisGorevler == null) {
    tamamlanmisGorevler = [];
  }
  let tamamlanmis = document.getElementById("tamamlanmis");
  tamamlanmis.innerHTML = "";
  console.log(tamamlanmisGorevler);
  for (let i = 0; i < tamamlanmisGorevler.length; i++) {

    let yeniGorevContainer = document.createElement("li");
    let yeniGorev = document.createElement("input");
    yeniGorev.disabled = true;
    yeniGorev.value = tamamlanmisGorevler[i];

    let silBtn = document.createElement("button");
    silBtn.innerHTML = '<svg viewBox="-7.44 -7.44 38.88 38.88" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M4.99997 8H6.5M6.5 8V18C6.5 19.1046 7.39543 20 8.5 20H15.5C16.6046 20 17.5 19.1046 17.5 18V8M6.5 8H17.5M17.5 8H19M9 5H15M9.99997 11.5V16.5M14 11.5V16.5" stroke="#000000" stroke-linecap="round" stroke-linejoin="round"></path></g></svg>';
    silBtn.addEventListener("click", () => {
      tamamlanmisGorevler.splice(i, 1);
      localStorage.setItem("tamamlanmis", JSON.stringify(tamamlanmisGorevler));
      tamamlanmisRenderla();
    })


    yeniGorev.classList.add("input", "input-primary", "w-full");
    yeniGorevContainer.classList.add("flex");
    silBtn.classList.add("btn", "btn-primary", "btn-circle");

    yeniGorevContainer.appendChild(yeniGorev);
    yeniGorevContainer.appendChild(silBtn);
    tamamlanmis.appendChild(yeniGorevContainer);
  }
let hepsinisilBtn = document.getElementById("hepsini-sil");
hepsinisilBtn.addEventListener("click", () => {
  localStorage.setItem("tamamlanmis", null);
  tamamlanmisRenderla();
})

}



// tarih ve saat kodları

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
  let ay = simdi.getMonth() + 1;      // js'de aylar sıfırdan(0) başladığından değişkene bir(1) ekledik.
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
  
  tarih.innerText = gun + "/" + ay + "/" + simdi.getFullYear() + "  -  " + saat + ":" + dakika + ":"  + saniye;
}, 1000);