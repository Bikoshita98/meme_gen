import {useState, useEffect} from 'react';

export default function Meme() {
    const [meme, setMeme] = useState({
        topText:"",
        bottomText:"",
        image:"",
    });

    const [allMemes, setAllMemes] = useState([])    

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(records => setAllMemes(records.data.memes))
    },[])

    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length);
        const url = allMemes[randomNumber].url;
        setMeme(prevMeme => ({
            ...prevMeme,
            image: url
        }));
    }
    
     function handleChange(event){
        const {name, value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name] : value
        })) 
    }    

    return (
        <main>
            <div className = "form">
                <input
                    className = "form--input"
                    type = "text"
                    placeholder = "Top-text"
                    name = "topText"
                    value = {meme.topText}
                    onChange = {handleChange}
                    maxLength = "100"
                />

                <input
                    className = "form--input"
                    type = "text"
                    placeholder = "Bottom-text"
                    name = "bottomText"
                    value = {meme.bottomText}
                    onChange = {handleChange}
                    maxLength = "100"
                />

                <button
                     className= "form--button" 
                     onClick = {getMemeImage} 
                     >
                     Get a new meme image 
                </button>
            </div>
            
            <div className = "meme">
                <img src = {meme.image} className = "meme-image" alt ="" />
                <h2 className="meme--text top"> {meme.topText} </h2>
                <h2 className="meme--text bottom"> {meme.bottomText} </h2>
            </div>

            {/* <figure>
                <img src = {meme.image} className = "meme-image" alt ="" />
                <figcaption className="top">{meme.topText}</figcaption>
                <figcaption className="bottom">{meme.bottomText}</figcaption>
            </figure> */}

        </main>
    );
}

