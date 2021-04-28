
const reviewersL  = document.getElementById('reviewers')



async function reviewers(){
        const response = await fetch('/api/reviewers/v1')
        const data  = await response.json()
      

       let newData = Object.values(data)
       for(var item of newData){
            
            reviewersL.innerText = item.length;  
        
       }       
}
reviewers()