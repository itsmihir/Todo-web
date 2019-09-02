const add=document.querySelector('.b1');
const remove= document.querySelector('.b2');
const rall=document.querySelector('.b3');
const ul=document.querySelector('.all');//object


remove.addEventListener('click',remove_selected)
rall.addEventListener('click',remove_all)
add.addEventListener('click',add_element)


window.onload=async ()=>
{
        let response = await fetch('/all');
        let d = await response.json();    
        console.log(d);
        for(let i=0;i<d.length;i++)
        {

        console.log(d[i].data);
       
        // creating new element <li class="mycheck"><input type="checkbox" value="done" id="checkbox" ><label>task 2  </label> </input></li>
        let li =document.createElement('li');
        let textnode=document.createTextNode(d[i].data);
        let checkbox=document.createElement('input');
        let label=document.createElement('label');
           
        li.className='one'
        checkbox.type='checkbox';
        checkbox.value='done'
    
        li.appendChild(checkbox);
        li.appendChild(label);
        label.appendChild(textnode);
        ul.appendChild(li);

            setTimeout(() => {
                li.className='visual';
             }, 2);
             
        }
    
   

    }

function add_element()
{

   event.preventDefault();

    // getting input text
    let s=document.querySelector('.text');
    let val=s.value;   

    if(val==='')
    return false;

  // creating new element <li class="mycheck"><input type="checkbox" value="done" id="checkbox" ><label>task 2  </label> </input></li>
  let li =document.createElement('li');
  let textnode=document.createTextNode(val);
  let checkbox=document.createElement('input');
  let label=document.createElement('label');
     
  li.className='one'
  checkbox.type='checkbox';
  checkbox.value='done'

  li.appendChild(checkbox);
  li.appendChild(label);
  label.appendChild(textnode);
  ul.appendChild(li);

    
    s.value='';
    
    let body = {val};

     const save=
     {
         method : 'POST',
         headers:
         {
             'Content-Type': 'application/json'
        },
       body:JSON.stringify(body),

     }
   async function ser()
   {
   let response =await fetch('/database',save);
   }
   ser();
   setTimeout(() => {
    li.className='visual';
 }, 2);
}





function remove_selected()
{
    event.preventDefault();
    let c=ul.children
    let j=0;
    let x=c.length
    const arr=[];
    for(let i=0;i<x;i++)
    {
    if(c[j].children[0].checked)
    {
        //console.log(c[j].children[1].textContent);
        arr.push(c[j].children[1].textContent);
        ul.removeChild(c[j]);
        j--;
    }
    j++;
    
    }
    console.log(arr);

    const send =
    {
        method : 'POST',
        headers:
         {
         'Content-Type': 'application/json'
        },
       body:JSON.stringify(arr),


    }
    fetch('/remove',send);

}

function remove_all()
{
    event.preventDefault();
    let c=ul.children
    
    let x=c.length
    for(let i=0;i<x;i++)
    {
        console.log(c);
           ul.removeChild(c[0]);
    
    }
    const send=
     {
         method : 'POST',
         headers:
         {
             'Content-Type': 'application/json'
        },
      
     }
    fetch('/removeall',send);

}