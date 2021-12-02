console.log("This is javascript file");

async function getData(){
    const term = document.querySelector('#search').value;
    const artist = term.toLowerCase();
    const response = await fetch(`https://api.lyrics.ovh/suggest/${artist}`);
    const data = await response.json().then(data=>{
       // console.log(data.data);
        const html = data.data.map(song=>{  
       //     console.log(song.title); 
            return `<ul style="list-style-type: none;margin: 10px;padding: 0;">
                        <li style="float:left;"><b>${song.artist.name}</b> - </li>
                        <li style="float:left"> ${song.title}</li>
                        <li><button type="submit" id="getLyrics" data-artist="${song.artist.name}" data-title="${song.title}" onClick="getLyrics()" style="float:right">Get Lyrics</button></li>
                    </ul>`;
        });
        document.querySelector("#content").innerHTML=html;
    });
}

async function getLyrics(){
    const artist = document.querySelector('#getLyrics').getAttribute('data-artist');
    const title = document.querySelector('#getLyrics').getAttribute('data-title');
    const response = await fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`);
    const data = await response.json().then(data=>{
        // console.log(data.lyrics);
        const lyrics = data.lyrics.replace(/(?:\r\n|\r|\n)/g, '<br>');
        return `<span style="width:30px">${lyrics}</span>`;
    });
    document.querySelector("#content").innerHTML=data;
    
}

