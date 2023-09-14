// `https://api.giphy.com/v1/stickers/search?api_key=o7eH46H0APmDPmppXNdR4eeY97IGDtJl&q=${stickerName}&limit=${limit}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`

$(document).ready(function() {
async function getStickers(stickerName,limit=10){
    try{
        const response = await fetch(
            `https://api.giphy.com/v1/stickers/search?api_key=o7eH46H0APmDPmppXNdR4eeY97IGDtJl&q=${stickerName}&limit=${limit}&offset=0&rating=g&lang=en&bundle=messaging_non_clips`)
           
            // console.log(await response.json());
            return await response.json()
    }catch(error){
        console.log(error);
    }

}


async function renderStickers() {
    try {
        // console.log($(".limitInput").val());
      let data = await getStickers($(".mainInput").val(), $(".limitInput").val()==""?5:$(".limitInput").val());
    //   console.log($(".mainInput").val());
    //   console.log(data);
      console.log(data.data.length);

      if(data.data.length==0){  

             $(".contents").addClass("d-none");
             $("#errorMessage").removeClass("d-none");
       

        return"";
    }
    $("#errorMessage").addClass("d-none");
             $(".contents").removeClass("d-none");

      let result = data.data.map((sticker,i) => {

        return `<div class="card carDiv" style="width: 8rem; height: max-content !important;  background-color: transparent; ">
          <img src="${sticker.images.original.url}" class="card-img-top" alt="">
          <div class="card-body" style=" height: auto;">
            <p class="card-text text-black fw-medium">Sticker ${i + 1}</p>
          </div>
        </div>`;

      });


      $(".contents").html(result.join(""));
    } catch (error) {
      console.log( error);
    }
  }
  
  $(".searchDiv").on("click", function () {

    renderStickers();
    $(".mainInput").val("")
    $(".limitInput").val("")
   
  });

  $(".mainInput").on("keydown", function (e) {
if(e.key=="Enter"){

    renderStickers();
    $(".mainInput").val("")
    $(".limitInput").val("")
}
  });
  $(".limitInput").on("keydown", function (e) {
    if(e.key=="Enter"){
    
        renderStickers();
        $(".mainInput").val("")
        $(".limitInput").val("")
    }
      });
});