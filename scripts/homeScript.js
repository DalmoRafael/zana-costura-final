var chosenSize = '';
function setSize(sizeParameter){
    chosenSize = sizeParameter;
}

function send(id){
    if (chosenSize == ''){
        alert('Selecione um tamanho de roupa');
    }
    else{
        let title = document.getElementById(id).textContent;
        let size = chosenSize;
        let url = window.location.href;
        let text = encodeURIComponent(`-->  NOVA SOLICITAÇÃO!!  <--
                 Link da roupa: ${url}
        
                 Produto: ${title}
        
                 Tamanho: ${size}
        
                 Obrigado(a)`);
        location.href = ('https://wa.me/5571988090920?text=' + text);
    }
 
}

function sendSobMedida(){
    let userName = document.getElementById('input-nomeCompleto').value;
    let userEmail = document.getElementById('input-email').value;
    let userAdress = document.getElementById('input-endereco').value;
    let typeOfService = document.getElementById('input-tiposServico').value;
    let typeOfClothe = document.getElementById('input-tiposRoupas').value;
    let descricao = document.getElementById('input-descricaoPedido').value;
    let busto = document.getElementById('input-busto').value;
    let cintura = document.getElementById('input-cintura').value;
    let quadril = document.getElementById('input-quadril').value;
    let comprimentoPerna = document.getElementById('input-comprimentoPerna').value;
    let comprimentoBraco = document.getElementById('input-comprimentoBraco').value;
    let altura = document.getElementById('input-altura').value;
    let booleanOrcamento = document.getElementById('input-checkboxOrcamento');
    let observacao = document.getElementById('input-infoAdd').value;
    let condRequisicaoOrcamento = '';

    if(booleanOrcamento.checked){
        condRequisicaoOrcamento = ' Gostaria de solicitar um orçamento';
    }
    else{
        condRequisicaoOrcamento = '';
    }

    if(observacao == ''){
        observacao = ' Nenhuma observação';
    }

    if(userName == ''){
        alert('Escreva seu nome completo para prosseguir');
    }
    else if(userAdress == ''){
        alert('Escreva seu endereço para prosseguir');
    }
    else if(descricao == ''){
        alert('Escreva a descrição de seu pedido para prosseguir');
    }
    else if(busto <= 0){
        alert('Insira um valor de busto válido para prosseguir');
    }
    else if(cintura <= 0){
        alert('Insira um valor de cintura válido para prosseguir');
    }
    else if(quadril <= 0){
        alert('Insira um valor de quadril válido para prosseguir');
    }
    else if(comprimentoPerna <= 0){
        alert('Insira um valor de comprimento de perna válido para prosseguir');
    }
    else if(comprimentoBraco <= 0){
        alert('Insira um valor de comprimento de braço válido para prosseguir');
    }
    else if(altura <= 0){
        alert('Insira um valor de altura válido para prosseguir');
    }
    else{
        let text = encodeURIComponent(`-->  NOVA SOLICITAÇÃO!!  <--
            Roupa sob Medida
                    Meu nome: ${userName}
                    Meu email: ${userEmail}
                    Meu endereço: ${userAdress}
    
                    Tipo de serviço: ${typeOfService}
                    Tipo de roupa: ${typeOfClothe}
    
                    Descrição do pedido: ${descricao}
    
    
                    Busto(cm): ${busto}
                    Cintura(cm): ${cintura}
                    Quadril(cm): ${quadril}
                    Comprimento da perna(cm): ${comprimentoPerna}
                    Comprimento do braço(cm): ${comprimentoBraco}
                    Altura(m): ${altura}
    
                    ${condRequisicaoOrcamento}
    
                    Observação:${observacao}
    
    
                    Obrigado(a)`);
        location.href=('https://wa.me/5571988090920?text=' + text);
    }
}

function filtrar() {
    var input,
    filter,
    ul,
    li,
    a,
    i,
    span,
    txtValue,
    count = 0;
    input = document.getElementById('inputBusca');
    ul = document.getElementById('listaProdutos');


    filter = input.value.toUpperCase();

    li = ul.getElementsByTagName("li");

    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];

        txtValue = a.textContent || a.innerText;
        
        if(txtValue.toUpperCase().indexOf(filter) > -1){
            li[i].style.display = "";

            count++;

            span = li[i].querySelector(".item-name");
            if(span){
                AnimationPlaybackEvent.innerHTML = txtValue.replace(new RegExp(filter, "gi"),(match)=>{
                    return "<b>" + match + "<b>";
                })
            }
        }else{
            li[i].style.display = "none";
        }
    }

    if (filter === ""){
        ul.style.display = "none";
    } else {
        ul.style.display = "block";
    }
    if (count === 0){
        ul.style.display = "none";
    } else {
        ul.style.display = "block";
    }
    
    document.addEventListener('click', function(event) {
        var input = document.getElementById('inputBusca');
        var ul = document.getElementById('listaProdutos');
        
        if (!input.contains(event.target) && !ul.contains(event.target)) {
            ul.style.display = 'none';
        }
    });
    
    document.getElementById('inputBusca').addEventListener('focus', function() {
        var ul = document.getElementById('listaProdutos');
        ul.style.display = 'block';
    });
    
}

document.addEventListener('click',e=>{
    if(!ul.contains(e.target) && e.target !== input){
        ul.classList.add('hide') 
    }
})