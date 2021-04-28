const notifBage = document.getElementById('notification_badge')
const notifMsg  = document.getElementById('notification_message')
const uL  = document.getElementById('uL')



async function getUsers(){
        const response = await fetch('/api/users/v1')
        const data  = await response.json()
      

       let newData = Object.values(data)
       for(var item of newData){
        if( item.length > 0 ) {
            notifBage.innerHTML = item.length
            notifMsg.innerHTML = `You have ${item.length} user/s waiting for approval!`
        }else{
            notifBage.innerHTML = '';
            notifMsg.innerHTML = `No notifications as of now`
        }
        
       }       
}
getUsers()





async function getRusers(){
    const response = await fetch('/api/users/verified/v1')
    const data  = await response.json()
  

   let newData = Object.values(data)
   for(var item of newData){
    uL.innerText = item.length;
   }       
}
getRusers()