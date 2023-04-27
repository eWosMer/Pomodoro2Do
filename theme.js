/*  const temalar = [pastel,light,dark,cupcake,bumblebee,emerald,corporate,
                    synthwave,retro,cyberpunk,valentine,halloween,garden,forest,
                     aqua,wireframe,black,luxury,draclua,cmyk,autumn,business,acid,
                    lemonade,night,coffee,]; 
*/
//26 tane var
let html = document.querySelector("html");

let tema = localStorage.getItem("theme");
if (tema) {
  html.setAttribute("data-theme", tema);
}

let tema_butonlari = document.querySelectorAll(".tema-btn");
tema_butonlari.forEach((tema_btn) => {
  tema_btn.addEventListener("click", () => {
    let yeni_tema = tema_btn.innerText.toLowerCase();
    html.setAttribute("data-theme", yeni_tema);
    localStorage.setItem("theme", yeni_tema);
  })
})






