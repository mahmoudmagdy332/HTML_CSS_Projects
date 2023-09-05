
let letters="ABCDEFGHIJKLMNOPQRSTUVWXYZ"

letters=Array.from(letters);
let chars=document.querySelector(".letters");
letters.forEach(letter=> {
    let char=document.createElement('div');
    char.className='letter';
    let span=document.createTextNode(letter);
    char.appendChild(span);
    chars.appendChild(char);
});

let categories={
    cantries:['France','United States','China','Spain','Italy','Turkey','United Kingdom','Germany','Russian' 	,
	'Malaysia','Mexico','Austria','Ukraine','Thailand','Saudi Arabia','Greece','Canada','Poland',
     'China','Netherland','Singapore','Hungary','Croatia','Korea','Egypt','Morocco','Switzerland',		
	'Indonesia','Ireland','Romania','Belgium','Denmark','Portugal','Bahrain','Bulgaria',
	'India','Japan','Vietnam','Australia','Argentina','Brazil','Sweden','Norway','Tunisia',	
	'Finland','Jordan'],
    food:['Cheese','Egg','Butter','Margarine','Yogurt','Cottage','cheese','Ice cream','Cream',
        'Sandwich','Sausage','Hamburger','Hot dog','Bread','Pizza','Steak','chicken','Fish',     'Seafood',   'Kebab',       'Bacon',
        'Sour cream']
}

let allKeys=Object.keys(categories);

let key=Math.floor(Math.random()*allKeys.length);
let category=allKeys[key]
let values=categories[category];



let span=document.querySelector('.game-Info span');
span.innerHTML=category;

let valuekey=Math.floor(Math.random()*values.length);

let value=values[valuekey];
value=value.split(" ").join("");
value=Array.from(value);


let answer=document.querySelector('.answer ul');
for(let i=0;i<value.length;i++){
  let li=document.createElement('li');
  answer.appendChild(li);
}

let lis=document.querySelectorAll('.answer ul li');
let classes=['base','pole1','crossbar','pole2','Gallows-circle',
                'human-head','human-body','hand-reight','hand-left','leg-reight','leg-left'];
                let c=0,t=0;

chars.addEventListener('click',function(e){
    if(e.target.className==="letter"){
        let flag=false;
        for(let i=0;i<value.length;i++){
            if(e.target.innerHTML===value[i].toUpperCase()){
                lis[i].appendChild(document.createTextNode(value[i].toUpperCase()));
                flag=true;
                console.log(value);
                value[i]='0';
                console.log(i);
                console.log(value);
                t+=1;
                break;
            }         
        }
        if(!flag){
            if(c<classes.length-1){
                console.log(c);
                let paint=document.querySelector(`.${classes[c]}`);
                paint.style.display='block';
                c+=1;
                e.target.classList.add('clicked');
            }
            else{
                let p=document.querySelector(`.${classes[c]}`);
                p.style.display='block';
                document.getElementById("fail").play();
                let paint=document.querySelector('.popup-fail');
                paint.style.transform="translate(-50%,-50%) scale(1,1)"
                chars.classList.add('clicked');
            }         
        } 
      
        if(t===value.length){
            document.getElementById("success").play();
            let paint=document.querySelector('.popup-sucssess');
            paint.style.transform="translate(-50%,-50%) scale(1,1)";
            chars.classList.add('clicked');
        }
        
       
        console.log(e.target.innerHTML);
    }
})