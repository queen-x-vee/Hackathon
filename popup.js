
  document.addEventListener('DOMContentLoaded', function(){
    let scrapeEmails = document.getElementById('scrapeEmails');

    //handler to recieve emails from content script
    chrome .runtime.onMessage.addListener((request,sender,sendResponse)=>{
      //get emails
      let emails = request.emails
      alert(emails)
    })

    //////////////////////////////
        scrapeEmails.addEventListener('click', async()=>{
           
            let [tab] = await chrome.tabs.query({active: true, currentWindow: true});

            //execute script to parse emails
            chrome.scripting.executeScript({
              target: {tabId: tab.id},
                func: scrapeEmailsFromPage,
            });
        });

        function scrapeEmailsFromPage() {
          //alert("hello"); 
          //const emailRegex = /[\w\.=-]+@[\w\.-]+\.[\w]{2,3}/gim;
          //parse the page for emails
         // const emailRegex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*|www\.[^\s/$.?#].[^\s]*/;
          //const linkRegex = /(?:https?|ftp):\/\/[^\s/$.?#].[^\s]*|www\.[^\s/
          let emails = document.body.innerText
          //alert(emails);

          //send the emails to popup
          chrome.runtime.sendMessage({emails});
        }
        
    
    // anything else you want to initialize on the page
    console.log('held')
  });
