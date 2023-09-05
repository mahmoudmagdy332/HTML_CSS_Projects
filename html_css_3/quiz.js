const getQuestions=(ApiLink)=>{
    return new Promise((resolve,reject)=>{
    let myRequest=new XMLHttpRequest();
    myRequest.onload= function(){
        if(this.status===200 && this.readyState===4){
        resolve(JSON.parse(this.responseText));
        }
        else{
            reject('Error');
        }
    }
    myRequest.open('get',ApiLink,true);
     myRequest.send();   
});

}
let span=document.querySelector('.header span');
let answers=document.querySelector('.answer');
let footer=document.querySelector('.footer ul');
var count_right_answer=0;
let current_question=0;

getQuestions("question.json").then((res)=>{
    spannet(res.length);
    GetQuetion(res,current_question);
    timeOut();
    submitted(res);

}).catch((err)=>{
    span.innerHTML="questions not found";
});
function spannet(res){
    span.innerHTML=res;
    for(let i=0;i<res;i++){
        let li=document.createElement("li");
        li.className="ans";
        footer.appendChild(li);
    }
   
}
function timeOut(){
let timeUp=new Date().getSeconds()+30;
let timer =document.querySelector('.footer p');
    const Tim=setInterval(() => {
        let now=new Date().getSeconds();
         if(timeUp-now<=10){
            timer.style.color="red";
         }
         if(now>=timeUp){
            clearInterval(Tim);
         }
        timer.innerHTML=timeUp-now;
    }, 1000);
}

let submit =document.querySelector('input[type=submit]');


function submitted(rightAnswer){
    let lise=document.querySelectorAll('.footer ul li');
    submit.onclick=(e)=>{
    e.preventDefault();
  
    checkAnswer(rightAnswer);
    removeQueshion();
    if(current_question<rightAnswer.length-1){
        GetQuetion(rightAnswer,current_question+1);
        lise[current_question].classList="ans active";
        current_question+=1;
    }
    else{
        submit.remove();  
        answers.appendChild(document.createTextNode(`the result ${count_right_answer}
         from ${rightAnswer.length}`))
         lise[rightAnswer.length-1].classList="ans active";
    }
   
  }
}


let radios=document.getElementsByName("quetion");

function checkAnswer(rightAnswer){
    let right_answer=rightAnswer[current_question].right_answer;
    let ckecked=null;
    radios.forEach((rad)=>{
        if(rad.checked){
            ckecked=rad.value;
        }       
    }); 
    // console.log(rightAnswer);
    // console.log(ckecked);
    if(ckecked===right_answer){
        count_right_answer+=1;
    }
}
let quetion=document.querySelector('.qw p');

function removeQueshion(){
    quetion.innerHTML="";
    answers.innerHTML="";
}

function GetQuetion(Quetion,current_question){
    
    quetion.appendChild(document.createTextNode(Quetion[current_question].title));
    for(let i=1;i<=4;i++){
        let answer=document.createElement('div');
        answer.className='choise';
        let a="answer_"+i;
        let r=document.createElement("input");
        r.type="radio";
        r.name="quetion";
        r.id=`answer_${i}`;
        r. value=Quetion[current_question][a];
        let p=document.createElement("p");
        p.appendChild(document.createTextNode(Quetion[current_question][a]));
        answer.appendChild(r);
        answer.appendChild(p);
        answers.appendChild(answer);
        radios[0].checked=true;
    }
}



