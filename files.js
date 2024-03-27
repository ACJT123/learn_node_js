const fs = require('fs');

fs.readFile('./docs/blog1.txt', (error, data)=>{
    if(error){
        console.error(error);
    }
    console.log(data.toString());
});

fs.writeFile('./docs/blog1.txt', 'hello world', ()=>{
    console.log('file written');
});

if(!fs.existsSync('./assets')){
    fs.mkdir('./assets', ()=>{
        console.log('directory created');
    })
}
else{
    console.log('directory exists');
}


if(fs.existsSync('./docs/blog1.txt')){
    fs.unlink('./docs/blog1.txt', ()=>{
        console.log('deleted')
    })
};