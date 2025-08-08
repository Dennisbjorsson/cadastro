const cadastroUsuario = document.getElementById("cadastroUsuario");

fetch("https://68935e51c49d24bce86a8c7d.mockapi.io/api/v1/usuario")
 .then(response => response.json())
 .then((listaUsuario) =>{

    listaUsuario.forEach( usuario =>  {
        const item = document.createElement("li");
        item.innerHTML= `${usuario.nome} ${usuario.email} <buttononclick= "removerTodosUsuarios(${usuario.id}, this)" >X</button>`;
        cadastroUsuario.appendChild(item);
    });


 }) 

 document.getElementById("add").addEventListener("click",()=> {
    
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;

   fetch("https://68935e51c49d24bce86a8c7d.mockapi.io/api/v1/usuario" ,{
      
    method: 'POST',
    headers:{
        "Content-Type": "application/json"
    },

    body: JSON.stringify({nome, email: nome, email})

   })

   .then(response => response.json())
   .then((usuario) =>{

        const item = document.createElement("li");
        item.innerHTML= `${usuario.nome} ${usuario.email} <button onclick= "removerTodosUsuarios(${usuario.id}, this )">X</button>`
        
        
        cadastroUsuario.appendChild(item)
    
    }) 
     

   }

  
)

function removerTodosUsuarios(id,botao){
    fetch(`https://68935e51c49d24bce86a8c7d.mockapi.io/api/v1/usuario/${id}`,{
        method: "DELETE",
    })
    .then(response =>{
        if(response.ok){
       botao.parentElement.remove();     

        }else{
            alert("Erro ao remover o usuário");
        }
    });
     
}



    

    
