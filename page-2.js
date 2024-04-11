let posts = [];
let onDelete = [];
const dele = document.querySelector('.deleteButton');
const container = document.querySelector('.postsSection');
fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((json) => {
        posts = json;
        const id = window.location.href.split("?")[1].split("=")[1];
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].userId == id) {
                const temps = document.createElement("div");
                temps.className = "postCards";
                temps.id = posts[i].id;
                temps.onmouseover = function (){
                    temps.style.transform = "scale(1.05)";
                    temps.style.transition = "0.6s transform"
                }
                temps.onmouseout = function (){
                    temps.style.transform = "scale(1)";
                }
                const checkBox = document.createElement("input");
                checkBox.type = "checkbox";
                checkBox.id = posts[i].id;
                checkBox.className = "checkbox";
                checkBox.onclick = function (){
                    if (this.checked) {
                        onDelete.push(this.parentNode.id);
                        this.parentNode.style.background = "linear-gradient(65deg, #3f78d8ab, #7ce0e6e8)"
                        this.parentNode.style.transform="scale(1.08)"
                        dele.style.transform = "scale(1.15)"
                        dele.style.background = "#e7ef28de";
                        dele.innerHTML = `Delete (${onDelete.length})`
                        dele.style.scale = "1";
                        container.style.width = "95vw"
                    } else {
                        onDelete.splice(
                            onDelete.indexOf(this.parentNode.id),1,
                        );
                        this.parentNode.style.background ="linear-gradient(135deg,#3E68BD,#47A4CC,#77D4CA,#E3D9C3,#DECDB4,#CFB99B )",
                        this.parentNode.style.transform="scale(1)";
                        dele.innerHTML = `Delete (${onDelete.length})`;
                        if(onDelete.length === 0){
                            dele.style.transform = "scale(1)",
                            dele.style.background = "lightblue";
                            dele.innerHTML = `Delete`
                            dele.style.scale = "0";
                            container.style.width = "98vw";
                        }
                    }
                };
                temps.appendChild(checkBox);
                const temp = document.createElement('label');
                temp.className="postCard";
                temp.setAttribute('for',posts[i].id);
                const t = document.createElement('div');
                t.className = "front-part";
                t.id = "frontside";
                const e = document.createElement("h5");
                e.setAttribute("class","sourceText");
                e.innerHTML=`<i class="fa-solid fa-pen-to-square"></i>`;
                e.onmouseover = function (){
                    e.style.transform = "scale(1.3)";
                }
                e.onmouseout = function (){
                    e.style.transform = "scale(1)";
                }
                t.appendChild(e);
                const f = document.createElement("h5");
                f.setAttribute("class" , "bin");
                f.innerHTML = `<i class="fa-solid fa-trash"></i>`;
                f.onmouseover = function (){
                    f.style.transform = "scale(1.3)";
                }
                f.onmouseout = function (){
                    f.style.transform = "scale(1)";
                }
                t.appendChild(f);
                const s = document.createElement("h5");
                s.setAttribute("class","save");
                s.innerHTML = `<i class="fas fa-save"></i>`
                s.onmouseover = function (){
                    s.style.transform = "scale(1.3)";
                }
                s.onmouseout = function (){
                    s.style.transform = "scale(1)";
                }
                t.appendChild(s);
                f.addEventListener('click',(e)=>{
                    if(confirm(`Do you want to delete Title :"${posts[i].title}" `)){
                        temps.remove();
                        onDelete.splice(onDelete.indexOf(temps),1);
                        if(onDelete.length === 0){
                            dele.style.scale = "0";
                            container.style.width = "98vw";
                        }
                        else{
                            dele.innerHTML = `Delete (${onDelete.length})`
                        }
                    }
                })
                const title = document.createElement("h1");
                const body = document.createElement("p");
                title.className = "Main-Title";
                body.setAttribute('class','bodytext');
                title.innerHTML = "Title: " + posts[i].title;
                body.innerHTML = "Body: " + posts[i].body;
                t.appendChild(title);
                t.appendChild(body);
                e.onclick = function(){
                        body.contentEditable = true;
                        title.contentEditable = true;
                        body.style.border = "2px solid black"
                        body.style.borderRadius = "10px"
                        title.style.border = "2px solid black"
                        title.style.borderRadius = "10px"
                        e.style.scale = "0";
                        s.style.scale = "1";
                }
                s.onclick = function(){
                    body.contentEditable = false;
                    title.contentEditable = false;
                    body.style.border = "none"
                    body.style.borderRadius = "0px"
                    title.style.border = "none"
                    title.style.borderRadius = "0px"
                    s.style.scale = "0";
                    e.style.scale = "1";
                }
                const commentTitle = document.createElement("h2");
                const backicon = document.createElement('h2');
                commentTitle.className = "comment-title";
                commentTitle.innerHTML = "Comments";
                commentTitle.onclick = function (){
                    temp.setAttribute('for',posts[i].id);
                    temp.style.transform = "rotateY(180deg)" ;
                    e.style.scale = "0";
                    f.style.scale = "0"; 
                    backicon.style.scale = "0";
                }
                backicon.setAttribute('class','back-icon');
                backicon.innerHTML = `<i class="fas fa-chevron-circle-right"></i>`;
                backicon.onmouseover = function (){
                    backicon.style.transform = "scale(1.3)";
                }
                backicon.onmouseout = function (){
                    backicon.style.transform = "scale(1)";
                }
                backicon.onclick = function (){
                    temp.setAttribute('for',"p");
                    temp.style.transform = "rotateY(180deg)"
                    temps.style.background = "linear-gradient(135deg,#3E68BD,#47A4CC,#77D4CA,#E3D9C3,#DECDB4,#CFB99B )";
                    e.style.scale = "0";
                    f.style.scale = "0"; 
                    backicon.style.scale = "0";
                }
                t.appendChild(commentTitle);
                t.appendChild(backicon);
                temp.appendChild(t);

                fetch(
                    "https://jsonplaceholder.typicode.com/comments?postId=" +
                        posts[i].id
                )
                    .then((response) => response.json())
                    .then((json) => {
                        const v = document.createElement('div');
                        v.className = "back-part";
                        v.id = "backside";
                        for (let j = 0; j < 3; j++) {
                            const comment = document.createElement("div");
                            comment.className = `class-${json[j].id} comments-div`;
                            const name = document.createElement("h3");
                            name.className = "header-2";
                            const email = document.createElement("p");
                            email.className = "email-1";
                            const body = document.createElement("p");
                            body.className = "body-2";
                            name.innerHTML = "Name: " + json[j].name;
                            email.innerHTML = json[j].email;
                            body.innerHTML = "Body: " + json[j].body;
                            email.setAttribute('class','email');
                            comment.appendChild(name);
                            comment.appendChild(body);
                            comment.appendChild(email);
                            v.appendChild(comment);
                        }
                        const fronticon = document.createElement('h2');
                        fronticon.setAttribute('class','front-icon');
                        fronticon.innerHTML = `<i class="fas fa-chevron-circle-left"></i>`;
                        v.appendChild(fronticon);
                        fronticon.onmouseover = function (){
                            fronticon.style.transform = "scale(1.3)";
                        }
                        fronticon.onmouseout = function (){
                            fronticon.style.transform = "scale(1)";
                        }
                        fronticon.onclick = function(){
                            temp.setAttribute('for',posts[i].id);
                            temp.style.transform = "rotateY(0)";
                            e.style.scale = "1";
                    f.style.scale = "1"; 
                    backicon.style.scale = "1";
                        } 
                        temp.appendChild(v);
                    });
                
                const postsDiv = document.querySelector(".postsSection");
                postsDiv.appendChild(temps);
                temps.appendChild(temp);
            }
        }
    });
function deletePosts() {
    let temp;
    if(confirm(`${onDelete.length} posts will be delete`)==true){
        for (let i = 0; i < onDelete.length; i++) {
            temp = document.getElementById(onDelete[i]);
            temp.parentElement.removeChild(temp);
        }
    }
    else{
        alert("Not deleted");
    }
    onDelete = [];
    dele.style.transform = "scale(1)",
    dele.style.background = "lightblue";
    dele.innerHTML = `Delete`
    dele.style.scale = "0";
    container.style.width = "98vw";
}
const deleteButton = document.querySelector(".deleteButton");
deleteButton.onclick = deletePosts;