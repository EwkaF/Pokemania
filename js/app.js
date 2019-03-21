$(function() {
    
    var url = 'https://pokeapi.co/api/v2/pokemon/?limit=10';
    var nextUrl = url+'/'+'?limit=10&offset=';
    var evolutionUrl = 'https://pokeapi.co/api/v2/evolution-chain/1/';
    var offset = 0;

    function loadContent(){

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
               
                let h1 = $('.name strong');
                h1.text(onePokemon.species.name);
                let img = $('.pokemon-image');
                img.attr("src", onePokemon.sprites.front_default);
                let type =$('.type strong');
                var typ = "";

                for (var i = 0; i < onePokemon.types.length; i++){
                    
                    typ += onePokemon.types[i].type.name +' ';

                }
                type.text(typ);
                let hp = $('.hp strong');
                hp.text(onePokemon.stats[5].effort);
                let attack = $('.attack strong');
                attack.text(onePokemon.stats[4].effort);
                let defense = $('.defense strong');
                defense.text(onePokemon.stats[3].effort);

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
    console.log(response)
loadPokemon(response.results)
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

loadContent();
})








// $(function() {
//     let url = 'https://pokeapi.co/api/v2/pokemon/1';
//     let hpUrl = 'https://pokeapi.co/api/v2/stat/1/';
//     let evolutionUrl = 'https://pokeapi.co/api/v2/evolution-chain/1/';

//     function insertContent(pokemon) {
//         let nameEl = $('h1:first-child');
//         let hpEl = $('li:first-child');
//         let attackEl = $('li:nth-child(2)');
//         let defenceEl = $('li:nth-child(3)');

//         nameEl.append(pokemon.name);
//         hpEl.append(pokemon.stats[5].base_stat);
//         attackEl.append(pokemon.stats[4].base_stat);
//         defenceEl.append(pokemon.stats[3].base_stat);
//     }

//     function loadData() {
//         $.ajax({
//             url: url,
//             type: 'GET'
//         }).done(function(response){
//             insertContent(response);
//         }).fail(function(error) {
//             console.log(error);
//         })
//     }

//     loadData();

//     function insertEvolution(first, second) {
//         let evolution = $('p.evolution-chain');

//         evolution.append(first + ' &rsaquo; ' + second);
//     }


//     function loadEvolution() {
//         $.ajax({
//             url: evolutionUrl,
//             type: 'GET'
//         }).done(function(response){
//             insertEvolution(response.chain.evolves_to[0].species.name, response.chain.evolves_to[0].evolves_to[0].species.name);
//         }).fail(function(error) {
//             console.log(error);
//         })
//     }

//     loadEvolution();

// });