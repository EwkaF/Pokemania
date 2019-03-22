$(function() {
    
    var url = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
    var nextUrl = url+'/'+'?limit=10&offset=';
    var evolutionUrl = 'https://pokeapi.co/api/v2/evolution-chain/1/';
    var offset = 0;

    $('.pokemon-details').hide();

    function loadContent(){

    function loadPagination(number){
        $('#pagination').html('');
        for (var i = 0; i < number.count/10; i++){
            let paginationButton = $('<button></button>');
            paginationButton.text(i);
            paginationButton.addClass('paginationButton');
            paginationButton.attr('id', i);
            $('#pagination').append(paginationButton);
            
        }
        
    }

    function loadPokemon(pokemon){
            
       for( var i = 0; i < pokemon.length; i++){

            let id = 0;
            if(offset === 0){
                id = i+1;
            }
            else{
                id = i + 1 + offset;
            }

            let li = $('<li>');
            li.addClass('row')
            let name = $('<h3>, {class: "name col"}');
            name.text("#"+ (id) +". " + pokemon[i].name);
            let moreInfo = $('<button>Pokaż</button>');
            moreInfo.addClass('showInfo col');
            moreInfo.attr('id', id);
            li.append(name);
            li.append(moreInfo);
            $('#pokemonList').append(li)  
       }

       
       $('#pokemonList').on('click', '.showInfo', function(e){
    
           console.log("pokazuje wiecej");
           console.log($(this)[0].id);
            thisButton = $(this)

            function loadPokemonDetails(onePokemon){
                $('.name span').text("#" +onePokemon.id)
                let h1 = $('.name strong');
                h1.text(onePokemon.species.name);
                let img = $('.pokemon-image');
                img.attr("src", onePokemon.sprites.front_default);
                let type =$('.type strong');
                let typ = "";

                for (var i = 0; i < onePokemon.types.length; i++){
                    let pokemonType = onePokemon.types[i].type.name
                    switch (pokemonType){
                        case "grass":
                        pokemonType = "trawiasty"
                        break;
                        case "poison":
                        pokemonType = "trujący"
                        break;
                        case "fire":
                        pokemonType = "ognisty"
                        break;
                        case "flying":
                        pokemonType = "powietrzny"
                        break;
                        case "water":
                        pokemonType = "wodny"
                        break;
                        case "bug":
                        pokemonType = "robak"
                        break;
                        case "normal":
                        pokemonType = "normalny"
                        break;
                        case "electric":
                        pokemonType = "elektryczny"
                        break;
                        case "ground":
                        pokemonType = "ziemny"
                        break;
                        case "rock":
                        pokemonType = "kamienny"
                        break;
                        case "fairy":
                        pokemonType = "wróżka"
                        break;
                        case "fighting":
                        pokemonType = "walczący"
                        break;
                        case "psychic":
                        pokemonType = "psychiczny"
                        break;
                        case "steel":
                        pokemonType = "stalowy"
                        break;
                        case "ice":
                        pokemonType = "lodowy"
                        break;
                        case "ghost":
                        pokemonType = "duch"
                        break;
                        case "dragon":
                        pokemonType = "smok"
                        break;
                        case "dark":
                        pokemonType = "mroczny"
                        break;

                    }
                    typ += pokemonType +' ';

                }
                type.text(typ);
                let hp = $('.hp strong');
                hp.text(onePokemon.stats[5].effort);
                let attack = $('.attack strong');
                attack.text(onePokemon.stats[4].effort);
                let defense = $('.defense strong');
                defense.text(onePokemon.stats[3].effort);

                $('.pokemon-details').show();

                $('.close').on('click', function(e){
                    $('.pokemon-details').hide();
                })

            }

           $.ajax({
             url: 'https://pokeapi.co/api/v2/pokemon' +'/' + (thisButton[0].id)

           }).done(function(response){
            console.log(response);
            loadPokemonDetails(response)



           }).fail(function(message){
            console.log(message)
           })

       })
    }


$.ajax({
url: url

}).done(function(response){
    $('#pokemonList').html("");
    console.log(response.count)
    loadPagination(response)
loadPokemon(response.results);
}).fail(function(message){
    console.log(message)
})
}

$(".next").on('click',  function() {
    offset = offset + 10;
    console.log(offset);
    url = nextUrl + offset;
    console.log("Kliknięto przycisk");
    loadContent();
 
});


$(".prev").on('click',  function() {
    if( offset === 0){
        offset = 0;
    }else{
        offset = offset - 10;
    }
    
    console.log(offset);
    url = nextUrl + offset;
    console.log("Kliknięto przycisk");
    loadContent();
 
});

$('#pagination').on('click','.paginationButton', function(e){
    console.log($(this).attr('id'));
    offset = $(this).attr('id') * 10;
    url = nextUrl + offset;
    loadContent();


})



loadContent();
})
