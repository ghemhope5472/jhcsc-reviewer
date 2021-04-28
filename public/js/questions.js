const questionsLength = document.getElementById('qL')



async function getQs(){
        const response = await fetch('/api/questions/v1')
        const data  = await response.json()
       

          

          let newData = Object.values(data)
          for(var item of newData){
                
                questionsLength.innerText = item.length  
          } 
}
getQs()