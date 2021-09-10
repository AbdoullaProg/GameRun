import React, { useRef, useEffect, useState } from 'react';

import './style.scss';

import imgCity from '../../assets/images/city.png';
import imgTrash from '../../assets/images/trash.svg';
import imgFireHydrant from '../../assets/images/hydrant.svg';
import imgBaskeBall from '../../assets/images/basketball2.svg';
import imgCar from '../../assets/images/car.svg';

import imgSoleil from '../../assets/images/sun.png';
import imgLune from '../../assets/images/mounir2.png';
import imgCityNight from '../../assets/images/cityNiight.png';

import imgGeometryDash from '../../assets/images/geooo.png';

const Board = () => {
    // référence au l'element canvas html
    const canvasRef = useRef(null);
    const imgMountain = useRef(null);
    const trashRef = useRef(null);
    const fireHydrantRef = useRef(null);
    const basketBallRef = useRef(null);
    const carRef = useRef(null);
    const soleilRef = useRef(null);
    const LuneRef = useRef(null);
    const lettersGO = useRef(null);
    const cityNightRef = useRef(null);
    const gemotryDashRef = useRef(null);

    let [scorePlayer, setscorePlayer] = useState(`000000`);
    let [startGame, setstartGame] = useState(false);
    let [gameOver, setgameOver] = useState(false);
    let [showbtn, setshowbtn] = useState(false);
    let timeOutFunction = () => {}

    let [hightScore, sethightScore] = useState(0);

    const [showHS, setshowHS] = useState(`000000`);

    const getRandomInt = ( max ) => {
        return Math.floor(Math.random() * max);
    }

    function entierAleatoire(min, max)
    {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const letterGameOverEffect = () => {
        const tableColors = ['#FE8325', '#FAB8C4', '#6B43BD','#008ECE','#FE8325', '#FAB8C4', '#6B43BD','#008ECE']
        const lettres = document.querySelectorAll('.letterGO');
        let a = 0;
        let b = 1;
        let c = 2;
        let d = 3;
        let e = 4;
        let f = 5;
        let g = 6;
        let h = 7;
        lettres[0].style.color = `${tableColors[a]}`;
        lettres[1].style.color = `${tableColors[b]}`;
        lettres[2].style.color = `${tableColors[c]}`;
        lettres[3].style.color = `${tableColors[d]}`;
        lettres[4].style.color = `${tableColors[e]}`;
        lettres[5].style.color = `${tableColors[f]}`;
        lettres[6].style.color = `${tableColors[g]}`;
        lettres[7].style.color = `${tableColors[h]}`;

        timeOutFunction = 
            setInterval(()=>{
                a++; b++; c++; d++; e++; f++; g++; h++;
                if(a>7) a = 0;
                if(b>7) b = 0;
                if(c>7) c = 0;
                if(d>7) d = 0;
                if(e>7) e = 0;
                if(f>7) f = 0;
                if(g>7) g = 0;
                if(h>7) h = 0;
                lettres[0].style.color = `${tableColors[a]}`;
                lettres[1].style.color = `${tableColors[b]}`;
                lettres[2].style.color = `${tableColors[c]}`;
                lettres[3].style.color = `${tableColors[d]}`;
                lettres[4].style.color = `${tableColors[e]}`;
                lettres[5].style.color = `${tableColors[f]}`;
                lettres[6].style.color = `${tableColors[g]}`;
                lettres[7].style.color = `${tableColors[h]}`;
            },500)
                    

    }

    // donné du jeux
    const game = {
        // position du jouer en X
        posX:0,
        // position du joueur en Y
        posY :0,
        // largeur du joueur
        playerWidth : 32,
        // longueur du joueur
        playerHeight : 32,
        // vitesse en X déplacmement
        mooveX : 5,
        // hauteur du saut
        mooveY : 10,
        // gravité pour le saut 
        gravity : 0.4,
        // savoir si il est déja entrain de sauter
        jumping : false,
        // jumptimer
        jumpTimer : 0,
        // on stock ici les keyboard
        keyboard :[],
        obstacle: [
            { x: 0, y: 0, w: 32, h: 32 },
            { x: 0, y: 0, w: 32, h: 64 },
            { x: 0, y: 0, w: 64, h: 32 },
            { x: 0, y: 0, w: 64, h: 64 }
        ],

        timer: 0,
        stopGame: false,
        score: 0,
        bestScore: 0,
        btnStartShow: 0,
    }

    useEffect(() => {
        // on creer le canvas en 2d
        const canvas = canvasRef.current;
        let ctx = canvas.getContext('2d');

        
        // fonction upScore a définir avant empty
        let upScore = () => {};

        

        
        // images 
        // PLANET
        // https://cdn.pixabay.com/photo/2016/04/01/08/43/cartoon-1298905_960_720.png
        let planet = new Image();   
        planet.src = soleilRef.current.src;


        let geometryDash = new Image();
        geometryDash.src = gemotryDashRef.current.src;

        // MOUNTAIN
        let city = new Image();
        city.src = imgMountain.current.src;

        let cityNight = new Image();
        cityNight.src = cityNightRef.current.src;

        // OBSTACLE START

            // TRASH
            let trashImage = new Image();
            trashImage.src = trashRef.current.src;

            // FIRE HYDRANT
            let fireHydrantImage = new Image();
            fireHydrantImage.src = fireHydrantRef.current.src;

            // BASKETBALL
            let basketBallImage = new Image();
            basketBallImage.src = basketBallRef.current.src;

            // CAR
            let carImage = new Image();
            carImage.src = carRef.current.src;

        // OBSTACLE END


        // ça push dans le keyboard tout les clé
        document.addEventListener("keydown", e => {
            game.keyboard.push(e.code);
        });
        document.addEventListener("keyup", e => {
            game.keyboard = game.keyboard.filter(a => a !== e.code);
        });

        // on déssine le jouer
        const draw = () => {
            // ctx.beginPath();
            // ctx.rect(game.posX, game.posY, game.playerWidth, game.playerHeight);
            // ctx.fillStyle = "red";
            // ctx.fill();
            // ctx.closePath();

            ctx.drawImage(geometryDash,game.posX, game.posY, game.playerWidth, game.playerHeight)
        }

        // data for planet
        let posXplanet = canvas.width;
        let posYplanet = 100;
        let dataToDown = 100;

        // on dessine la planet
        const drawPlanet = () =>{
            if(!game.stopGame){

                ctx.drawImage(planet,posXplanet,posYplanet,150,150);
                if(game.score >= 1000){
                    posXplanet+=1;
                    
                }else{
                    posXplanet-=1;
                }
                
                if(dataToDown>=50){
                    dataToDown-=0.08; 
                }
                if(dataToDown<=50){
                    posYplanet=posYplanet+0.08
                }else{
                    posYplanet=posYplanet-0.08;
                }
                if(game.score <= 1000){
                    if(posXplanet <= -250){
                        posXplanet = canvas.width;
                        posYplanet = 100;
                        dataToDown = 100;
                        if( planet.src !== LuneRef.current.src){
                            planet.src = LuneRef.current.src;
                            city.src = cityNightRef.current.src;
                            canvas.style.backgroundColor = 'rgb(13, 0, 49)';
                        }else{
                            planet.src = soleilRef.current.src;
                            city.src = imgMountain.current.src;
                            canvas.style.backgroundColor = 'rgb(15, 163, 248)';
                        }
                    }
                }
                else{
                    if( planet.src !== LuneRef.current.src){
                        canvas.style.backgroundColor = '#cb3b3b';
                    }else{
                        canvas.style.backgroundColor = '#85203b';
                    }
                    if(posXplanet >= canvas.width){
                        posXplanet = 0 - 150;
                        posYplanet = 100;
                        dataToDown = 100;
                        if( planet.src !== LuneRef.current.src){
                            planet.src = LuneRef.current.src;
                            city.src = cityNightRef.current.src;
                            canvas.style.backgroundColor = '#85203b';
                        }else{
                            planet.src = soleilRef.current.src;
                            city.src = imgMountain.current.src;
                            canvas.style.backgroundColor = '#cb3b3b';
                        }
                    }
                }
       
            }

        }


        // data for mountain
        let FirstXcity = 0;
        let secondXcity = 425;
        let thirdXcity = 425*2;
        let fourthXcity = 425*3;
        // draw mountain
        const drawMountain = () => {
            if(!game.stopGame){
                if(game.score <= 1000){
                    ctx.drawImage(city,FirstXcity,canvas.height-400,500,500);
                    ctx.drawImage(city,secondXcity,canvas.height-400,500,500);
                    ctx.drawImage(city,thirdXcity,canvas.height-400,500,500);
                    ctx.drawImage(city,fourthXcity,canvas.height-400,500,500);
                    if(FirstXcity <= -450){
                        FirstXcity = 1250;
                    }
                    if(secondXcity <= -450){
                        secondXcity = 1250;
                    }
                    if(thirdXcity <= -450){
                        thirdXcity = 1250;
                    }
                    if(fourthXcity <= -450){
                        fourthXcity = 1250;
                    }
                    FirstXcity-= 2;
                    secondXcity-= 2;
                    thirdXcity-= 2;
                    fourthXcity-= 2;
                }else{
                    ctx.drawImage(city,FirstXcity,canvas.height-400,500,500);
                    ctx.drawImage(city,secondXcity,canvas.height-400,500,500);
                    ctx.drawImage(city,thirdXcity,canvas.height-400,500,500);
                    ctx.drawImage(city,fourthXcity,canvas.height-400,500,500);
                    if(FirstXcity >= canvas.width ){
                        FirstXcity = 0 - 500;
                    }
                    if(secondXcity >= canvas.width){
                        secondXcity = 0 - 500;
                    }
                    if(thirdXcity >= canvas.width){
                        thirdXcity = 0 - 500;
                    }
                    if(fourthXcity >= canvas.width){
                        fourthXcity = 0 - 500;
                    }
                    FirstXcity+= 2;
                    secondXcity+= 2;
                    thirdXcity+= 2;
                    fourthXcity+= 2;
                }
                

            }


        }

        // Obtacle en images
        let obstacleImageObject = [
            { image : trashImage, x : 0, y : 0, w : 64, h: 64, margeError: 11, margeErrorRight: 11, marginHeigth: 9, errorHeight: 0},
            { image : fireHydrantImage, x : 0, y : 0, w : 64, h: 64, margeError: 11, margeErrorRight: 11,marginHeigth: 2, errorHeight: 9},
            { image : basketBallImage, x : 0, y : 0, w : 40, h: 40, margeError: -13, margeErrorRight: 0, marginHeigth: 0, errorHeight: 22},
            { image : carImage, x : 0, y : 0, w : 100, h: 100, margeError: 11, margeErrorRight: 11, marginHeigth: 40, errorHeight: -50},
        ]

        
        let obstacleImage = obstacleImageObject[getRandomInt(4)];
        obstacleImage.x = canvas.width;
        obstacleImage.y = canvas.height-obstacleImage.h;
        obstacleImageObject.forEach((element, index) => {
            if(element === obstacleImage){
                obstacleImageObject.splice(index, 1)
            }
        });

        

        let obstacleNumeor2 = obstacleImageObject[getRandomInt(3)];
        let randomNumber = entierAleatoire(200,600);
        obstacleNumeor2.x = canvas.width + randomNumber;
        obstacleNumeor2.y = canvas.height-obstacleNumeor2.h;

        obstacleImageObject.forEach((element, index) => {
            if(element === obstacleNumeor2){
                obstacleImageObject.splice(index, 1)
            }
        });

        let obstacleNumeor3 = obstacleImageObject[getRandomInt(2)];
        obstacleNumeor3.x = canvas.width + entierAleatoire(randomNumber+200, randomNumber+600);
        obstacleNumeor3.y = canvas.height-obstacleNumeor3.h;


            

        const drawImageObsctacle = () => {

            if(game.score <=1000){
                if(obstacleImage.x <= 0-obstacleImage.w && obstacleNumeor2.x <= 0-obstacleNumeor2.w &&  obstacleNumeor3.x <= 0-obstacleNumeor3.w){
                    obstacleImageObject = [
                        { image : trashImage, x : 0, y : 0, w : 64, h: 64, margeError: 11, margeErrorRight: 11, marginHeigth: 9, errorHeight: 0},
                        { image : fireHydrantImage, x : 0, y : 0, w : 64, h: 64, margeError: 11, margeErrorRight: 11,marginHeigth: 2, errorHeight: 9},
                        { image : basketBallImage, x : 0, y : 0, w : 40, h: 40, margeError: -13, margeErrorRight: 0, marginHeigth: 0, errorHeight: 22},
                        { image : carImage, x : 0, y : 0, w : 100, h: 100, margeError: 11, margeErrorRight: 11, marginHeigth: 40, errorHeight: -50},
                    ]
    
                    
                    obstacleImage = obstacleImageObject[getRandomInt(4)];
                    obstacleImage.x = canvas.width;
                    obstacleImage.y = canvas.height-obstacleImage.h;
    
                    obstacleImageObject.forEach((element, index) => {
                        if(element === obstacleImage){
                            obstacleImageObject.splice(index, 1)
                        }
                    });
            
                    obstacleNumeor2 = obstacleImageObject[getRandomInt(3)];
                    randomNumber = entierAleatoire(200*(Math.round(game.score/100)+1),600+(Math.round(game.score/100)+1));
                    obstacleNumeor2.x = canvas.width + randomNumber;
                    obstacleNumeor2.y = canvas.height-obstacleNumeor2.h;
    
                    obstacleImageObject.forEach((element, index) => {
                        if(element === obstacleNumeor2){
                            obstacleImageObject.splice(index, 1)
                        }
                    });
    
                    obstacleNumeor3 = obstacleImageObject[getRandomInt(2)];
                    obstacleNumeor3.x = canvas.width +  entierAleatoire(randomNumber+200*(Math.round(game.score/100)+1) , randomNumber+600+(Math.round(game.score/100)+1)) ;
                    obstacleNumeor3.y = canvas.height-obstacleNumeor3.h;
                }
            }else{
                if(obstacleImage.x >= canvas.width+obstacleImage.w && obstacleNumeor2.x >= canvas.width+obstacleNumeor2.w &&  obstacleNumeor3.x >= canvas.width+obstacleNumeor3.w){
                    obstacleImageObject = [
                        { image : trashImage, x : 0, y : 0, w : 64, h: 64, margeError: 11, margeErrorRight: 11, marginHeigth: 9, errorHeight: 0},
                        { image : fireHydrantImage, x : 0, y : 0, w : 64, h: 64, margeError: 11, margeErrorRight: 11,marginHeigth: 2, errorHeight: 9},
                        { image : basketBallImage, x : 0, y : 0, w : 40, h: 40, margeError: -13, margeErrorRight: 0, marginHeigth: 0, errorHeight: 22},
                        { image : carImage, x : 0, y : 0, w : 100, h: 100, margeError: 11, margeErrorRight: 11, marginHeigth: 40, errorHeight: -50},
                    ]
    
                    
                    obstacleImage = obstacleImageObject[getRandomInt(4)];
                    obstacleImage.x = 0-obstacleImage.w;
                    obstacleImage.y = canvas.height-obstacleImage.h;
    
                    obstacleImageObject.forEach((element, index) => {
                        if(element === obstacleImage){
                            obstacleImageObject.splice(index, 1)
                        }
                    });
            
                    obstacleNumeor2 = obstacleImageObject[getRandomInt(3)];
                    randomNumber = entierAleatoire(200*(Math.round(game.score/100)+1),600+(Math.round(game.score/100)+1));
                    obstacleNumeor2.x = 0 - randomNumber;
                    obstacleNumeor2.y = canvas.height-obstacleNumeor2.h;
    
                    obstacleImageObject.forEach((element, index) => {
                        if(element === obstacleNumeor2){
                            obstacleImageObject.splice(index, 1)
                        }
                    });
    
                    obstacleNumeor3 = obstacleImageObject[getRandomInt(2)];
                    obstacleNumeor3.x = 0 -  entierAleatoire(randomNumber+200*(Math.round(game.score/100)+1) , randomNumber+600+(Math.round(game.score/100)+1)) ;
                    obstacleNumeor3.y = canvas.height-obstacleNumeor3.h;
                }
            }
            


            ctx.drawImage(obstacleImage.image,obstacleImage.x,obstacleImage.y,obstacleImage.w,obstacleImage.h+ obstacleImage.marginHeigth);
            ctx.drawImage(obstacleNumeor2.image,obstacleNumeor2.x,obstacleNumeor2.y,obstacleNumeor2.w,obstacleNumeor2.h+ obstacleNumeor2.marginHeigth);
            ctx.drawImage(obstacleNumeor3.image,obstacleNumeor3.x,obstacleNumeor3.y,obstacleNumeor3.w,obstacleNumeor3.h+ obstacleNumeor3.marginHeigth);


            if(game.score >= 1000){
                obstacleImage.x+=5+(Math.round(game.score/100));
                obstacleNumeor2.x+=5+(Math.round(game.score/100));
                obstacleNumeor3.x+=5+(Math.round(game.score/100));
            }else{
                obstacleImage.x-=5+(Math.round(game.score/100));
                obstacleNumeor2.x-=5+(Math.round(game.score/100));
                obstacleNumeor3.x-=5+(Math.round(game.score/100));
            }

        }



        // update du jeux quand il appuie sur haut bas gauche droite
        const update = () => {

            
            if(!game.stopGame){
          
                // lorsque'il appuie sur la fleche de gauche
                if (game.keyboard.includes("ArrowLeft")) {
                    if (game.posX <= 0) {
                        game.posX = 0;
                    } else {
                        game.posX -= game.mooveX;
                    }
                }

                // lorsqu'il appuie sur la fléche de droite
                if (game.keyboard.includes("ArrowRight")) {
                    if (game.posX + game.playerWidth >= canvas.width) {
                        game.posX = canvas.width - game.playerWidth;
                    } else {
                        game.posX += game.mooveX;
                    }
                }

                if(game.keyboard.includes("ArrowDown")) {
                    game.playerHeight = 16
                }

                if(!game.keyboard.includes("ArrowDown")){
                    game.playerHeight = 32
                }
 
                // lorsque'il appuie sur espace
                if (game.keyboard.includes("Space")) {
                    if (!game.jumping) {
                        game.jumping = true;
                        game.jumpTimer = 0;
                    }
                }
                
                // FIN de partie 
                if(game.posX <= obstacleImage.x+obstacleImage.w - obstacleImage.margeErrorRight && game.posX >= obstacleImage.x-obstacleImage.w/2 + obstacleImage.margeError ){
                    if(game.posY <= obstacleImage.y+obstacleImage.h/2  +100 && game.posY >= obstacleImage.y-obstacleImage.h/2 - obstacleImage.errorHeight){
                        stop()
                    }
                }

                if(game.posX <= obstacleNumeor2.x+obstacleNumeor2.w - obstacleNumeor2.margeErrorRight && game.posX >= obstacleNumeor2.x-obstacleNumeor2.w/2 + obstacleNumeor2.margeError ){
                    if(game.posY <= obstacleNumeor2.y+obstacleNumeor2.h/2  +100 && game.posY >= obstacleNumeor2.y-obstacleNumeor2.h/2 - obstacleNumeor2.errorHeight){
                        stop()
                    }
                }

                if(game.posX <= obstacleNumeor3.x+obstacleNumeor3.w - obstacleNumeor3.margeErrorRight && game.posX >= obstacleNumeor3.x-obstacleNumeor3.w/2 + obstacleNumeor3.margeError ){
                    if(game.posY <= obstacleNumeor3.y+obstacleNumeor3.h/2  +100 && game.posY >= obstacleNumeor3.y-obstacleNumeor3.h/2 - obstacleNumeor3.errorHeight){
                        stop()
                    }
                }

                // formule pour la gravité
                game.posY = (0.5 * game.gravity * game.jumpTimer * game.jumpTimer - game.mooveY * game.jumpTimer) + (canvas.height -game.playerHeight);
                game.jumpTimer++;

                // au cas ou il saute trop haut mais normalement pas possible 
                if (game.posY > canvas.height - game.playerHeight) {
                    game.posY = canvas.height - game.playerHeight;
                    game.jumping = false
                }
            }
            
        }

        // Arret du jeux 
        const stop = () => {
            canvas.style.backgroundColor = 'black';
            game.stopGame = true;
            setstartGame(false);
            clearInterval(upScore)
            setgameOver(true)
            if(game.score > hightScore){
                game.bestScore = game.score;
                sethightScore(game.bestScore)
                let nbDécalage = 0;
                for (let index = 0; index <= String(game.score).length; index++) {
                    nbDécalage++;
                }
                console.log(`hightscore`, `${'0'.repeat(6-nbDécalage)}${hightScore}`)
                setshowHS(`${'0'.repeat(6-nbDécalage)}${game.score}`)
                console.log(`showHS`, showHS)
            }
        }

        // render permet l'animation en continue
        const render = () => {
            game.btnStartShow = 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            update();
            drawPlanet();
            drawMountain();
            drawImageObsctacle();
            draw();
            game.timer = requestAnimationFrame(render);
        }


        // lancememnt du jeux
        if(startGame) {
            canvas.style.backgroundColor = 'rgb(15, 163, 248)';
            render()
            game.score = 0
            // augmentation du score avec le temps
            upScore = setInterval(()=> {

                let nbDécalage = 0;
                game.score+=10 ;
                for (let index = 0; index <= String(game.score).length; index++) {
                    nbDécalage++;
                }
                setscorePlayer(`${'0'.repeat(6-nbDécalage)}${game.score}`)
            }, 100)
        }

        if(gameOver){
            lettersGO.current.style.display = 'flex';
            lettersGO.current.style.transform = 'scale(2)';
            setTimeout(()=>{
                lettersGO.current.style.transform = 'scale(0)';
            }, 2000)
        }

    }, [startGame, gameOver])



    return(
        <>
            <canvas ref={canvasRef} id="canvas" height="500px" width="1000px"></canvas>

            <h2 className="score">
                <span className="score-title">SCORE</span>
                <span className="score-player">{ scorePlayer }</span>

            </h2>

            <div className="centrer">
                <button className={(showbtn) ? 'disable' : 'game-button green btnStart'} onClick={()=> { setstartGame(true); setshowbtn(true);letterGameOverEffect() } }>START</button>
            </div>
            
            <img className="disable" ref={imgMountain} src={imgCity} />
            <img className="disable" ref={trashRef} src={imgTrash} />
            <img className="disable" ref={fireHydrantRef} src={imgFireHydrant} />
            <img className="disable" ref={basketBallRef} src={imgBaskeBall} />
            <img className="disable" ref={carRef} src={imgCar} />
            <img className="disable" ref={cityNightRef} src={imgCityNight} />
            <img className="disable" ref={soleilRef} src={imgSoleil} />
            <img className="disable" ref={LuneRef} src={imgLune} />
            <img className="disable" ref={gemotryDashRef} src={imgGeometryDash} />

            <div className={gameOver ? 'endGame' : 'endGame disable'}>
                <span className={gameOver ? 'big-scorePlayer' : 'big-scorePlayer disable'}> <span className="VTT first">SCORE</span> : {scorePlayer}</span>
                <span className={gameOver ? 'big-BestscorePlayer' : 'big-BestscorePlayer disable'}><span className="VTT second">HIGHT-SCORE</span> : {showHS}</span>
                <button className={gameOver ? 'game-button red' : 'game-button red disable'} onClick={()=> { setstartGame(true); setgameOver(false)}}>REPLAY</button>
            </div>


            <div className={gameOver ? 'allBlur' : 'allBlur disable'} >
                
            </div>
            <div className="flex" ref={lettersGO}>
                <span className="letterGO">G</span>
                <span className="letterGO">A</span>
                <span className="letterGO">M</span>
                <span className="letterGO">E</span> 
                <span className="letterGO">O</span>
                <span className="letterGO">V</span>
                <span className="letterGO">E</span>
                <span className="letterGO">R</span>
            </div>
        </> 
    )
};


export default Board;
