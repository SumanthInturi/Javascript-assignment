fetch('https://jsonplaceholder.typicode.com/users')
     .then(response => response.json())
     .then(users => {
        let x;
        for(let i=0;i<users.length;i++){
        const row = document.createElement('tr');
        row.setAttribute("class","tr")
         x= `
            <td value=${users[i].id}>${users[i].name}</td>
            <td value=${users[i].id}>${users[i].email}</td>
            <td value=${users[i].id}>${users[i].phone}</td>
            <td value=${users[i].id}>${users[i].website}</td>
            <td value=${users[i].id}>${users[i].company.name}</td>
         `
         row.innerHTML=x;
         table.append(row);
        }
        const p = document.querySelectorAll('td');
        for(let i in p){
            console.log(p);
            p[i].onclick = function(){
                const y = window.location.href.split('/');
                let ans = "";
                for(let j = 0; j<y.length-1;j++){
                    ans+=y[j]+"/";
                }
                ans+="page-2.html?value="+this.getAttribute('value');
                window.location.href = ans;
            }
        }
     })
const p = document.createElement('span');
p.className = "span1";
const q = document.createElement('span');
q.className = "span2";
const r = document.createElement('span');
r.className = "span3";
const s = document.createElement('span');
s.className = "span4";
const z = document.querySelector('.tb');
z.append(p);
z.append(q);
z.append(r);
z.append(s);