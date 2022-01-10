let xhr,endpoint2,select;
let endpoint="https://restcountries.com/v2/all";
select=document.getElementById("countryname");
function loadcountries()
{
    xhr=new XMLHttpRequest();
    xhr.onreadystatechange=getcountryname;
    xhr.open("GET",endpoint,true);
    xhr.send(null);
}

function getcountryname()
{
    if(xhr.readyState===4 && xhr.status===200)
    {
        let obj=JSON.parse(xhr.responseText);
        
        obj.forEach(cn => {
            select=document.getElementById("countryname");
            select.innerHTML+=`<option>${cn.name}</option>`;
        });

        select.onchange=showdata;
    }
    else if(xhr.readyState===4)
    {
        alert("Cannot show the result reason: "+xhr.statusText);
    }
    
}

function showdata()
{
    let table=document.getElementById("detail");
    let c=select.value;
    xhr=new XMLHttpRequest();
    endpoint2=endpoint.substring(0,endpoint.lastIndexOf("a"));
    endpoint2+=`name/${c}?fullText=true`;
    xhr.onreadystatechange=processdata;
    xhr.open("GET",endpoint2,true);
    xhr.send(null);
}

function processdata()
{
    if(xhr.readyState===4 && xhr.status===200)
    {
        let cdata=JSON.parse(xhr.responseText);
        console.log(cdata);
        let table=document.getElementById("detail");

        table.innerHTML=`<tr><th>Capital City</th><td>${cdata[0].capital}</td></tr><tr><th>Flag</th><td><img src="${cdata[0].flags.png}" alt="flag"</td></tr><tr><th>Currency</th><td>${cdata[0].currencies[0].name}</td></tr>`;
    }
    else if(xhr.readyState===4)
    {
        alert("Cannot show the result reason: "+xhr.statusText);
    }
}