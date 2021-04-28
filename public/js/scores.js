const scoreDisplay = document.getElementById('scoreDisplay')



async function getScores(){
        const response = await fetch('/api/scores/v1')
        const data  = await response.json()
       

          

          let newData = Object.values(data)
          for(var item of newData){
                scoreDisplay.innerText = item.length;      
          } 
}
getScores()