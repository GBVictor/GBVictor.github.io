
function start() {
    $("#inicio").hide();

    $("#fundoGame").append("<div id='jogador' class ='animaJogador'></div>");
    $("#fundoGame").append("<div id='inimigo1' class='animaInimigo1'></div>");
    $("#fundoGame").append("<div id='inimigo2'></div>");
    $("#fundoGame").append("<div id='inimigo3' class='animaInimigo3'></div>");
    $("#fundoGame").append("<div id='inimigo4' class='animaInimigo4'></div>");
    $("#fundoGame").append("<div id='estrela' class ='animaEstrela1'></div>");
    $("#fundoGame").append("<div id='placar'></div>");
    $("#fundoGame").append("<div id='energia'></div>");

    // iniciaModoBoss();

    var jogo = {};
    var velocidade = 5;
    var posicaoY = parseInt(Math.random() * 550);
    var posicaoY2 = parseInt(Math.random() * 550);
    var posicaoY3 = parseInt(Math.random() * 550);
    var posicaoY4 = parseInt(Math.random() * 550);
    var posicaoY5 = parseInt(Math.random() * 550);
    var podeAtirar = true;
    var fimdejogo = false;
    var pontos = 0;
    var Estrelas = 5;
    var energiaAtual = 3;
    var somDisparo = document.getElementById("somDisparo");
    var somExplosao = document.getElementById("somExplosao");
    var musica = document.getElementById("musica");
    var somGameover = document.getElementById("somGameover");
    var somPerdido = document.getElementById("somPerdido");
    var somResgate = document.getElementById("somResgate");

    var modoBoss = false;
    var HP_MAXIMO_BOSS = 3000;
    var hpboss = HP_MAXIMO_BOSS;
    var valorhit = 0;
    var MIN_POINTS_TO_START_BOSS = 2000;

    var podeAtirarEspecial = true;
    var podeAtirarNormal = true;


    musica.addEventListener("ended", function () {
        musica.currentTime = 0;
        musica.play();
    }, false);
    musica.play();

    var TECLA = {
        W: 87,
        S: 83,
        D: 68
    };



    jogo.pressionou = [];
    //detecta quando o usuario pressiona uma tecla
    //tal que pressonada[x.which]=true sendo que x é o codigo da tecla pressionada
    $(document).keydown(function (e) {
        jogo.pressionou[e.which] = true;
    });

    $(document).keyup(function (e) {
        jogo.pressionou[e.which] = false;
    });

//game loop
    jogo.timer = setInterval(loop, 30);//executar game loop a cada 30 milisegundos

    function loop() {
        moveFundo();
        moveJogador();
        moveInimigo1();
        moveInimigo2();
        moveInimigo3();
        moveInimigo4();
        moveEstrela();
        colisao();
        placar();
        energia();
    }
    function moveFundo() {
        esquerda = parseInt($("#fundoGame").css("background-position"));
        $('#fundoGame').css("background-position", esquerda - 1);
    }//fim da funçao 

    function moveJogador() {
        if (jogo.pressionou [TECLA.W]) {
            var topo = parseInt($("#jogador").css("top"));
            $('#jogador').css("top", topo - 10);

            if (topo <= 0) {
                $('#jogador').css('top', topo + 10);
            }
        }
        if (jogo.pressionou[TECLA.S]) {
            var topo = parseInt($("#jogador").css("top"));
            $('#jogador').css("top", topo + 10);

            if (topo >= 600) {
                $('#jogador').css('top', topo - 10);
            }
        }
        if (jogo.pressionou[TECLA.D]) {
            disparo();
            //animaTiro();


        }
    }
    function animaTiro() {
        atirar(true);
        setTimeout(function () {
            atirar(false)
        }, 250);
    }

    function atirar(val) {

        if (val) {
            $("#jogador").attr("class", "atirando");
            atirando = true;

        } else {
            $("#jogador").attr("class", "animaJogador");
            atirando = false;
        }

    }
    function moveInimigo1() {
        posicaoX = parseInt($("#inimigo1").css("left"));
        $("#inimigo1").css("left", posicaoX - velocidade);
        $("#inimigo1").css("top", posicaoY);

        if (posicaoX <= 0) {
            posicaoY = parseInt(Math.random() * 500);
            $("#inimigo1").css("left", 850);
            $("#inimigo1").css("top", posicaoY);
        }
    }
    function moveInimigo2() {
        posicaoX = parseInt($("#inimigo2").css("left"));
        $("#inimigo2").css("left", posicaoX - velocidade);

        if (posicaoX <= 0) {
            $("#inimigo2").css("left", 775);
        }
    }
    function moveInimigo3() {
        posicaoX = parseInt($("#inimigo3").css("left"));
        $("#inimigo3").css("left", posicaoX - velocidade);
        $("#inimigo3").css("top", posicaoY3);

        if (posicaoX <= 0) {
            posicaoY3 = parseInt(Math.random() * 500);
            $("#inimigo3").css("left", 775);
            $("#inimigo3").css("top", posicaoY3);
        }
    }
    function moveInimigo4() {
        posicaoX = parseInt($("#inimigo4").css("left"));
        $("#inimigo4").css("left", posicaoX - velocidade);
        $("#inimigo4").css("top", posicaoY4);

        if (posicaoX <= 0) {
            posicaoY4 = parseInt(Math.random() * 500);
            $("#inimigo4").css("left", 775);
            $("#inimigo4").css("top", posicaoY4);
        }
    }

    function moveEstrela() {
        posicaoX = parseInt($("#estrela").css("left"));
        $("#estrela").css("left", posicaoX - 5);
        //$("#estrela").css("top",posicaoY2);

        if (posicaoX <= 0) {
            posicaoY2 = parseInt(Math.random() * 500);
            $("#estrela").css("left", 850);
            $("#estrela").css("top", posicaoY2);
        }
    }

    function barraHP(val) {
        if (val)
        {
            $('#fundoGame').append('<div id="barraHP">' +
                    '<div id="barraHP-interna">' +
                    'Carl' +
                    '</div>' +
                    '</div>');
        } else {
            $('#barraHP').remove();
        }
    }

    function hitBoss(qtde) {
        hpboss -= qtde;

        if (hpboss > 0)
        {
            var valorBarra = (950 * hpboss) / HP_MAXIMO_BOSS/* aqui o life do boss */;
            $("#barraHP-interna").css("width", valorBarra);
        } else {
            //ele morre
            endGame();
        }
    }
    //BOSS
    function esconderTudo() {
        try
        {
            $('#inimigo1').remove();

        } catch (err) {
            console.info('Erro ao remover elemento 1 ');
        }

        try
        {
            $('#inimigo2').remove();

        } catch (err) {
            console.info('Erro ao remover elemento 2 ');
        }

        try
        {
            $('#inimigo3').remove();

        } catch (err) {
            console.info('Erro ao remover elemento 3 ');
        }

        try
        {
            $('#inimigo4').remove();

        } catch (err) {
            console.info('Erro ao remover elemento 4 ');
        }

    }
    function iniciaModoBoss() {

        $("#fundoGame").append("<div id='boss1'></div>");

        //esconde os elementos
        esconderTudo();

        modoBoss = true;

        barraHP(true);

        //podeAtirar=true;

        //desce();

        movimentaBoss();
        console.log('inicia modo boss!');
        //var moveBoss = window.setInterval(movimentaBoss, 30);

        function movimentaBoss() {
            //var posBoss = parseInt($("#boss1").css("top"));
            //atirarCentro();
            var sobeBoss = window.setInterval(subir, 15);
            var desceBoss;

            

            var exec_tiroespecial = window.setInterval(executaTirosEspeciais, 500);

            //sorteia o tiro especial
            function tiroEspecial() {
                var random = parseInt(Math.random() * 1000);
                return ((random % 7) == 0);
            }

            function executaTirosEspeciais() {
                if (!modoBoss) {
                    window.clearInterval(exec_tiroespecial);
                    return;
                }

                if (tiroEspecial() && podeAtirarEspecial) {
                    atirarEspecial();
                    podeAtirarEspecial = false;
                }
            }

            function subir() {

                if (!modoBoss) {
                    window.clearInterval(sobeBoss);
                    barraHP(false);
                    return;
                }

                var posBoss = parseInt($("#boss1").css("top"));
                if (posBoss > 2) {
                    $("#boss1").css("top", posBoss - 1);

                    //aqui detectamos a posicao para acionar o tiro do centro ao descer
                    if (posBoss == 172) {
                        atirarCentro();
                    }

                } else {
                    window.clearInterval(sobeBoss);
                    desceBoss = window.setInterval(descer, 15);
                    atirar();
                }
            }

            function descer() {

                if (!modoBoss) {
                    window.clearInterval(desceBoss);
                    barraHP(false);
                    return;
                }

                var posBoss = parseInt($("#boss1").css("top"));

                if (posBoss < 316) {
                    $("#boss1").css("top", posBoss + 1);

                    //aqui detectamos a posicao para acionar o tiro do centro ao descer
                    if (posBoss == 172) {
                        atirarCentro();
                    }


                } else {
                    window.clearInterval(desceBoss);
                    sobeBoss = window.setInterval(subir, 15);
                    atirar();
                }
            }

            var disparo1, disparo1_centro, disparo1_especial;


            //atirar normal
            function atirar() {
                if (!modoBoss) {
                    window.clearInterval(disparo1);
                    return;
                }

                if(!podeAtirarNormal){
                   return; 
                } 

                podeAtirarNormal = false;
                //colocando os tiros no cenario

                //coletando posicao do boss
                var posY = parseInt($("#boss1").css("top"));
                var posX = parseInt($("#boss1").css("left"));



                $("#fundoGame").append("<div id='inimigo5' class='animaInimigo5'></div>");
                $("#fundoGame").append("<div id='inimigo6' class='animaInimigo6'></div>");

                //posicionado o primeiro tiro (acima boss)
                $("#inimigo5").css("top", posY + 15);
                $("#inimigo5").css("left", posX);

                //posicionando o segundo tiro(abaixo boss)
                $("#inimigo6").css("top", posY + 260);
                $("#inimigo6").css("left", posX);


                animaMao1();//abre e fecha a mao do boss

                //excutando tiro 
                //fazendo ele percorrer -15 no eixo X
                disparo1 = window.setInterval(executaDisparo, 60);
            }

            //atirar especial
            function atirarEspecial() {
                if (!modoBoss) {
                    window.clearInterval(disparo1_especial);
                    return;
                }

                //colocando os tiros no cenario

                //coletando posicao do boss
                var posY = parseInt($("#boss1").css("top"));
                var posX = parseInt($("#boss1").css("left"));

                $("#fundoGame").append("<div id='BossTiro1'></div>");
                $("#fundoGame").append("<div id='BossTiro2'></div>");


                //posicionado o primeiro tiro (acima boss)
                $("#BossTiro1").css("top", posY + 15);
                $("#BossTiro1").css("left", posX);

                //posicionando o segundo tiro(abaixo boss)
                $("#BossTiro2").css("top", posY + 260);
                $("#BossTiro2").css("left", posX);


                animaMao1();//abre e fecha a mao do boss

                //excutando tiro 
                //fazendo ele percorrer -15 no eixo X
                disparo1_especial = window.setInterval(executaDisparoEspecial, 20);
            }

            function executaDisparoEspecial() {

                if (!modoBoss) {
                    window.clearInterval(disparo1_especial);
                    return;
                }

                if($( "#BossTiro1" ).length == 0 && $( "#BossTiro2" ).length == 0){
                   podeAtirarEspecial = true;
                   window.clearInterval(disparo1_especial);
                   return;
                }

                var posX = 0;

                if($( "#BossTiro1" ).length == 1)
                {
                    var posicaoX_5 = parseInt($("#BossTiro1").css("left"));
                    $("#BossTiro1").css("left", posicaoX_5 - 15);
                    posX = posicaoX_5;
                }

                if($( "#BossTiro2" ).length == 1)
                {
                    var posicaoX_6 = parseInt($("#BossTiro2").css("left"));
                    $("#BossTiro2").css("left", posicaoX_6 - 15);
                    posX = posicaoX_6;
                }



                if (posX < 0) {
                    podeAtirarEspecial = true;
                    window.clearInterval(disparo1_especial);
                    $("#BossTiro1").remove();
                    $("#BossTiro2").remove();
                }

            }

            function animaOlho() {
                if(!modoBoss) return;
                //coloca
                $("#boss1").css("background-image", "url(imgs/BossAtiraMeio.png)");
                //fecha a mao novamente depois de 2 seg
                setTimeout(function () {
                    if(!modoBoss) return;
                    $("#boss1").css("background-image", "url(imgs/Boss1.png)")
                }, 500);
            }

            function animaMao1() {
                if(!modoBoss) return;
                //coloca
                $("#boss1").css("background-image", "url(imgs/BossAtiraMao.png)");
                //fecha a mao novamente depois de 2 seg
                setTimeout(function () {
                    if(!modoBoss) return;
                    $("#boss1").css("background-image", "url(imgs/Boss1.png)")
                }, 500);
            }

            function executaDisparo() {

                if (!modoBoss) {
                    window.clearInterval(disparo1);
                    return;
                }

                if($( "#inimigo5" ).length == 0 && $( "#inimigo6" ).length == 0){
                   podeAtirarNormal = true;
                   window.clearInterval(disparo1);
                   return;
                }

                var posX = 0;
                if($( "#inimigo5" ).length == 1)
                {
                    var posicaoX_5 = parseInt($("#inimigo5").css("left"));
                    $("#inimigo5").css("left", posicaoX_5 - 15);
                    posX = posicaoX_5;
                }

                if($( "#inimigo6" ).length == 1)
                {
                    var posicaoX_6 = parseInt($("#inimigo6").css("left"));
                    $("#inimigo6").css("left", posicaoX_6 - 15);
                    posX = posicaoX_6;
                }



                if (posX < 0) {
                    window.clearInterval(disparo1);
                    $("#inimigo6").remove();
                    $("#inimigo5").remove();
                    podeAtirarNormal = true;
                }

            }



            function atirarCentro() {
                if (!modoBoss) {
                    window.clearInterval(disparo1_centro);
                    return;
                }

                //colocando os tiros no cenario
                $("#fundoGame").append("<div id='BossTiroCentral'></div>");

                animaOlho();

                //coletando posicao do boss
                var posY = parseInt($("#boss1").css("top"));
                var posX = parseInt($("#boss1").css("left"));


                //posicionando o segundo tiro(abaixo boss)
                $("#BossTiroCentral").css("top", posY + 120);
                $("#BossTiroCentral").css("left", posX);

                //excutando tiro 
                //fazendo ele percorrer -15 no eixo X
                disparo1_centro = window.setInterval(executaDisparoCentro, 23);
            }



            function executaDisparoCentro() {

                if (!modoBoss) {
                    window.clearInterval(disparo1_centro);
                    return;
                }

                if($( "#BossTiroCentral" ).length == 0 ){
                   window.clearInterval(disparo1_centro);
                   return;
                }

                var posicaoX_5 = parseInt($("#BossTiroCentral").css("left"));
                $("#BossTiroCentral").css("left", posicaoX_5 - 15);

                if (posicaoX_5 < 0) {
                    window.clearInterval(disparo1_centro);
                    $("#BossTiroCentral").remove();
                }

            }
        }


    }

    function ExecutaDisparoBoss() {
        $("#fundoGame").append("<div id='inimigo5' class='animaInimigo5'></div>");
        //$('')
    }

    function disparo() {
        if (podeAtirar) {
            podeAtirar = false;
            somDisparo.play();

            topo = parseInt($("#jogador").css("top"));
            posicaoX = parseInt($("#jogador").css("left"));
            if (Estrelas <= 9){
                tiroX = posicaoX + 150;
                topoTiro = topo + 28;
            }
            else if (Estrelas <= 14){
                tiroX = posicaoX + 150;
                topoTiro = topo + 20;
            }
            else {
                tiroX = posicaoX + 150;
                topoTiro = topo - 45;
            }
            $("#fundoGame").append("<div id='disparo'></div>");

            if (Estrelas <= 2) {
                $("#disparo").css("width", 81);
                $("#disparo").css("height", 8);
                $("#disparo").css("background-image", "url(imgs/disparonv2.png)");
                valorhit = 0.5;
            }
            else if (Estrelas >= 4 && Estrelas <= 6) {
                $("#disparo").css("width", 81);
                $("#disparo").css("height", 8);
                $("#disparo").css("background-image", "url(imgs/disparonv3.png)");
                valorhit = 0.7;
            }
            else if (Estrelas >= 7 && Estrelas <= 9) {
                $("#disparo").css("width", 64);
                $("#disparo").css("height", 21);
                $("#disparo").css("background-image", "url(imgs/disparonv4.png)");
                valorhit = 0.9;
            }
            else if (Estrelas == 10) {
                $("#disparo").css("width", 64);
                $("#disparo").css("height", 21);
                $("#disparo").css("background-image", "url(imgs/disparonv5.png)");
                valorhit = 1.1;
            }
            else if (Estrelas == 11) {
                $("#disparo").css("width", 64);
                $("#disparo").css("height", 21);
                $("#disparo").css("background-image", "url(imgs/disparonv6.png)");
                valorhit = 1.5;
            }
            else if (Estrelas >= 12 && Estrelas <= 14) {
                $("#disparo").css("width", 172);
                $("#disparo").css("height", 45);
                $("#disparo").css("background-image", "url(imgs/disparonv7.png)");
                valorhit = 2;
            }
            else if (Estrelas >= 15) {
                $("#disparo").css("width", 159);
                $("#disparo").css("height", 134);
                $("#disparo").css("background-image", "url(imgs/disparonv8.png)");
                valorhit = 12;
            }

            $("#disparo").css("top", topoTiro);
            $("#disparo").css("left", tiroX);

            var tempoDisparo = window.setInterval(executaDisparo, 5);

        }
        function executaDisparo() {
            posicaoX = parseInt($("#disparo").css("left"));
            $("#disparo").css("left", posicaoX + 15);

            if (isNaN(posicaoX) || posicaoX > 800) {
                window.clearInterval(tempoDisparo);
                $("#disparo").remove();
                podeAtirar = true;
            }
        }
    }

    function colisao() {
        var colisao1 = ($("#jogador").collision($("#inimigo1")));
        var colisao3 = ($("#disparo").collision($("#inimigo1")));

        var colisao2 = ($("#jogador").collision($("#inimigo2")));
        var colisao4 = ($("#disparo").collision($("#inimigo2")));

        var colisao5 = ($("#jogador").collision($("#estrela")));

        var colisao6 = ($("#disparo").collision($("#inimigo3")));
        var colisao7 = ($("#jogador").collision($("#inimigo3")));

        var colisao8 = ($("#disparo").collision($("#inimigo4")));
        var colisao9 = ($("#jogador").collision($("#inimigo4")));

        var colisao10 = ($("#jogador").collision($("#inimigo5")));

        var colisao11 = ($("#jogador").collision($("#inimigo6")));

        var colisao12 = ($("#disparo").collision($("#boss1")));

        var colisao13 = ($("#jogador").collision($("#BossTiro1")));
        var colisao14 = ($("#jogador").collision($("#BossTiro2")));


        var colisao15 = ($("#jogador").collision($("#BossTiroCentral")));

        if (colisao1.length > 0) {

            energiaAtual--;
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));
            explosao1(inimigo1X, inimigo1Y);

            posicaoY = parseInt(Math.random() * 500);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

        }

        if (colisao2.length > 0) {
            energiaAtual--;
            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));
            $("#inimigo2").remove();

            explosao2(inimigo2X, inimigo2Y);
            $("#disparo").css("left", 950);



        }

        if (colisao3.length > 0) {

            velocidade = velocidade + 0.2;
            somaPontos(50);
            inimigo1X = parseInt($("#inimigo1").css("left"));
            inimigo1Y = parseInt($("#inimigo1").css("top"));

            explosao1(inimigo1X, inimigo1Y);
            $("#disparo").css("left", 950);

            posicaoY = parseInt(Math.random() * 500);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

        }

        if (colisao4.length > 0) {

            velocidade = velocidade + 0.2;
            somaPontos(50);

            inimigo2X = parseInt($("#inimigo2").css("left"));
            inimigo2Y = parseInt($("#inimigo2").css("top"));

            $("#inimigo2").remove();

            explosao1(inimigo2X, inimigo2Y);
            $("#disparo").css("left", 950);

            posicaoY = parseInt(Math.random() * 500);
            $("#inimigo1").css("left", 694);
            $("#inimigo1").css("top", posicaoY);

            reposicionaInimigo2();

        }



        if (colisao5.length > 0) {
            somaPontos(60);
            somResgate.play();
            Estrelas++;
            $("#estrela").remove();
            reposicionaEstrela();

        }
        if (colisao6.length > 0) {

            velocidade = velocidade + 0.2;

            //pontos=pontos+40;
            somaPontos(40);
            inimigo3X = parseInt($("#inimigo3").css("left"));
            inimigo3Y = parseInt($("#inimigo3").css("top"));

            explosao1(inimigo3X, inimigo3Y);
            $("#disparo").css("left", 950);

            posicaoY3 = parseInt(Math.random() * 500);
            $("#inimigo3").css("left", 694);
            $("#inimigo3").css("top", posicaoY3);


        }
        if (colisao7.length > 0) {
            velocidade = velocidade + 0.2;
            energiaAtual--;
            inimigo3X = parseInt($("#inimigo3").css("left"));
            inimigo3Y = parseInt($("#inimigo3").css("top"));
            $("#inimigo3").remove();

            explosao1(inimigo3X, inimigo3Y);
            $("#disparo").css("left", 950);



        }
        if (colisao8.length > 0) {
            //pontos=pontos+40;
            somaPontos(40);
            inimigo4X = parseInt($("#inimigo4").css("left"));
            inimigo4Y = parseInt($("#inimigo4").css("top"));

            explosao1(inimigo4X, inimigo4Y);
            $("#disparo").css("left", 950);

            posicaoY4 = parseInt(Math.random() * 500);
            $("#inimigo4").css("left", 694);
            $("#inimigo4").css("top", posicaoY4);

        }
        if (colisao9.length > 0) {
            velocidade = velocidade + 0.2;
            energiaAtual--;
            inimigo4X = parseInt($("#inimigo4").css("left"));
            inimigo4Y = parseInt($("#inimigo4").css("top"));
            $("#inimigo4").remove();

            explosao1(inimigo4X, inimigo4Y);
            $("#disparo").css("left", 950);
        }
        if (colisao10.length > 0) {

            energiaAtual--;
            inimigo5X = parseInt($("#inimigo5").css("left"));
            inimigo5Y = parseInt($("#inimigo5").css("top"));
            explosao1(inimigo5X, inimigo5Y);

            /*posicaoY=parseInt(Math.random()*334);
             $("#inimigo5").css("left",694);
             $("#inimigo5").css("top",posicaoY5);*/

            $("#inimigo5").remove();
        }

        if (colisao11.length > 0) {

            energiaAtual--;
            inimigo5X = parseInt($("#inimigo6").css("left"));
            inimigo5Y = parseInt($("#inimigo6").css("top"));
            explosao1(inimigo5X, inimigo5Y);

            $("#inimigo6").remove();

            /*posicaoY=parseInt(Math.random()*334);
             $("#inimigo5").css("left",694);
             $("#inimigo5").css("top",posicaoY5);*/

        }

        if (colisao12.length > 0) {
            $("#disparo").remove();
            hitBoss(valorhit);
        }

        if (colisao13.length > 0) {

            energiaAtual--;
            inimigo5X = parseInt($("#BossTiro1").css("left"));
            inimigo5Y = parseInt($("#BossTiro1").css("top"));
            explosao1(inimigo5X, inimigo5Y);

            /*posicaoY=parseInt(Math.random()*334);
             $("#inimigo5").css("left",694);
             $("#inimigo5").css("top",posicaoY5);*/

            $("#BossTiro1").remove();
            //explodeTiroBoss1();
          //  podeAtirarEspecial=true;
        }

        if (colisao14.length > 0) {

            energiaAtual--;
            inimigo5X = parseInt($("#BossTiro2").css("left"));
            inimigo5Y = parseInt($("#BossTiro2").css("top"));
            explosao1(inimigo5X, inimigo5Y);

            /*posicaoY=parseInt(Math.random()*334);
             $("#inimigo5").css("left",694);
             $("#inimigo5").css("top",posicaoY5);*/
            $("#BossTiro2").remove();
            //explodeTiroBoss2();
           // podeAtirarEspecial=true;
        }

        if (colisao15.length > 0) {

            energiaAtual--;
            inimigo5X = parseInt($("#BossTiroCentral").css("left"));
            inimigo5Y = parseInt($("#BossTiroCentral").css("top"));
            explosao1(inimigo5X, inimigo5Y);

            /*posicaoY=parseInt(Math.random()*334);
             $("#inimigo5").css("left",694);
             $("#inimigo5").css("top",posicaoY5);*/

            $("#BossTiroCentral").remove();
        }
    }

    /*function explodeTiroBoss1(){
        //background-image: url(../imgs/BossTiro.png)
        $("#BossTiro1").attr('class', 'animaBossTiro1Explode');
        $("#BossTiro1").css('background-image', '');
         
         setTimeout(function () {
            $("#BossTiro1").remove();
        }, 1000);
    }

     function explodeTiroBoss2(){
        //$("#BossTiro2").css('background-image', '');
        $("#BossTiro2").attr('class', 'animaBossTiro2Explode');
        $("#BossTiro2").css("background-image", "url(imgs/BossTiroExplode2.png)");
         
         setTimeout(function () {
            $("#BossTiro2").remove();
        }, 1000);
    }*/

    function explosao1(inimigo1X, inimigo1Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id='explosao1'></div>");
        $("#explosao1").css("background-image", "url(imgs/BossTiroExplode.png)");
        var div = $("#explosao1");
        div.css("top", inimigo1Y);
        div.css("left", inimigo1X);
        div.animate({width: 200, opacity: 0}, "slow");

        var tempoExplosao = window.setInterval(removeExplosao, 1000);

        function removeExplosao() {
            div.remove();
            window.clearInterval(tempoExplosao);
            tempoExplosao = null;
        }
    }
    function explosao2(inimigo2X, inimigo2Y) {
        somExplosao.play();
        $("#fundoGame").append("<div id = 'explosao2'></div>");
        $("#explosao2").css("background-image", "url(imgs/explosao.png)");
        var div2 = $("#explosao2");
        div2.css("top", inimigo2Y);
        div2.css("left", inimigo2X);
        div2.animate({width: 200, opacity: 0}, "slow");
        var tempoExplosao2 = window.setInterval(removeExplosao2, 1000);

        function removeExplosao2() {
            div2.remove();
            window.clearInterval(tempoExplosao2);
            tempoExplosao2 = null;
        }
    }

    function reposicionaEstrela() {
        var tempoEstrela = window.setInterval(reposiciona6, 5000);

        function reposiciona6() {
            window.clearInterval(tempoEstrela);
            tempoEstrela = null;

            if (fimdejogo == false) {
                $("#fundoGame").append("<div id='estrela' class='animaEstrela1'></div>");
            }
        }
    }

     function reposicionaInimigo2() {
        var tempoIni2 = window.setInterval(reposicionaIni2, 5000);

        function reposicionaIni2() {
            window.clearInterval(tempoIni2);
            tempoIni2 = null;

            if (fimdejogo == false) {
                $("#fundoGame").append("<div id='inimigo2'></div>");
            }
        }
    }

    function somaPontos(qtde) {
        pontos += qtde;

        if (pontos >= MIN_POINTS_TO_START_BOSS && !modoBoss) {
            iniciaModoBoss();
        }
    }

    function placar() {
        $("#placar").html("<h2>Pontos: " + pontos + " Estrelas: " + Estrelas + " </h2>");
    }

    function energia() {
        if (energiaAtual == 3) {
            $("#energia").css("background-image", "url(imgs/energia3.png)");
        }
        if (energiaAtual == 2) {
            $("#energia").css("background-image", "url(imgs/energia2.png)");
        }
        if (energiaAtual == 1) {
            $("#energia").css("background-image", "url(imgs/energia1.png)");
        }
        if (energiaAtual == 0) {
            $("#energia").css("background-image", "url(imgs/energia0.png)");
            gameOver();
        }
    }

    function endGame() {
        fimdejogo = true;
        musica.pause();
        somGameover.play();

        window.clearInterval(jogo.timer);
        jogo.timer = null;

        modoBoss = false;
        $("#boss1").remove();
        $("#jogador").remove();
        $("#inimigo6").remove();
        $("#inimigo5").remove();
        $("#estrela").remove();
        $("#BossTiro1").remove();
        $("#BossTiro2").remove();
        $("#BossTiroCentral").remove();

        $("#fundoGame").append("<div id='fim'></div>");

        $("#fim").html("<h1> Parabens </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3> Jogar novamente</h3></div>");

    }

    function gameOver() {
        fimdejogo = true;
        musica.pause();
        somGameover.play();

        window.clearInterval(jogo.timer);
        jogo.timer = null;

        $("#jogador").remove();

        if (!modoBoss)
        {
            $("#inimigo1").remove();
            $("#inimigo2").remove();
            $("#inimigo3").remove();
            $("#inimigo4").remove();
        }

        if (modoBoss) {
            modoBoss = false;
            $("#boss1").remove();
            $("#inimigo6").remove();
            $("#inimigo5").remove();
            //BossTiro1
            $("#BossTiro1").remove();
            $("#BossTiro2").remove();
            $("#BossTiroCentral").remove();
        }

        $("#estrela").remove();

        $("#fundoGame").append("<div id='fim'></div>");

        $("#fim").html("<h1> Game Over </h1><p>Sua pontuação foi: " + pontos + "</p>" + "<div id='reinicia' onClick=reiniciaJogo()><h3> Jogar novamente</h3></div>");

    }

}
function reiniciaJogo() {
    somGameover.pause();
    $("#fim").remove();
    start();
}



