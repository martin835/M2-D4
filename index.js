 
//1, Submit name into a list and array function

let namesInList = []

const submitName = function () {   
    let textInput = document.getElementById('nameInputs')
    let unassignedPoolContainer = document.querySelector('#unassigned-pool ul')
    //If input text field is empty, you cannot add any names
    if (textInput.value !== "") {
        let li = document.createElement('li')
        li.innerText = textInput.value
        namesInList.push(li.innerText)
        unassignedPoolContainer.appendChild(li)
        textInput.value = ''
        textInput.focus()
    }
}

//Enter key triggers the Submit button. Stolen from here: 
//https://stackoverflow.com/questions/155188/trigger-a-button-click-with-javascript-on-the-enter-key-in-a-text-box
document.getElementById("nameInputs").addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        document.getElementById("submit-name-button").click();
    }
});



const shuffle = function (array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
  
      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      // you'll find more details about that syntax in later chapters
      // same can be written as:
      // let t = array[i]; array[i] = array[j]; array[j] = t
      [array[i], array[j]] = [array[j], array[i]];
    }
  }


  const randomizeNames= function ()  {
    for (i = 0; i < namesInList.length; i++) {
      shuffle(namesInList)
    }
}



//2, Function - get names from list  and return array 

const generateTeams = function () {
    console.log(namesInList)
    randomizeNames()
    console.log(namesInList)
    let numberOfTeams = document.getElementById('numberOfTeamsPicker').value
    console.log('Number of teams: ' + numberOfTeams)
    let membersPerTeam = Math.floor( (namesInList.length) / numberOfTeams)
    console.log('Members per team: ' + membersPerTeam)

    
    if (numberOfTeams > namesInList.length) {
        alert('Not enough people to distribute')
        return
    }    
    
    //This piece creates teams: 
    let generatedTeamContainer = document.getElementById('generated-team-container')
        for (i = 1; i <= numberOfTeams; i++) {    
        
        let newDivForTeam = document.createElement('div')
        newDivForTeam.classList.add('team')
        newDivForTeam.id = 'team' + i
        let newH5Team = document.createElement('h5')
        let newUlForTeam = document.createElement('ul')
    
        newH5Team.innerText = 'Team ' + i + ":"

        generatedTeamContainer.appendChild(newDivForTeam)
        newDivForTeam.appendChild(newH5Team)
        newDivForTeam.appendChild(newUlForTeam)
        

        let team = namesInList.splice(0,membersPerTeam )
            for (j = 0; j < team.length; j++) {
                let newLi = document.createElement('li')
                newLi.innerText = team[j]
                newUlForTeam.appendChild(newLi)
            }
        }

    console.log(namesInList)

    let unassignedPoolContainer = document.querySelector('#unassigned-pool ul')
    unassignedPoolContainer.innerHTML = `<li>${namesInList[0]}</li>`

    //Outstanding member to be assigned. Creates a button to assign last member.
    if (namesInList.length > 0) {        
        let newButtonContainer = document.getElementById('unassigned-pool')
        let newButton = document.createElement('button')
        newButton.type = 'button'
        newButton.dataset.target = '#exampleModal'
        newButton.dataset.toggle = 'modal'
        newButton.innerText = 'Assign'
        newButton.classList.add('btn')
        newButton.classList.add('d-block')
        newButton.classList.add('mb-4')
        newButton.classList.add('btn-primary')
        newButton.addEventListener('click', assignLast)
        newButtonContainer.appendChild(newButton)
    }

}

//function to assign an outstanding member via modal
//TODO - assign to a team functionality
const assignLast = function () {
    let teamsArray = document.querySelectorAll('.team h5')
    console.log(teamsArray)
    let teamPickerParent = document.getElementById('modal-team-picker')
        for (i = 0; i < teamsArray.length; i++) {
            let newRadio = document.createElement('input')                   
            newRadio.type = 'radio'
            newRadio.name = 'team'
            newRadio.classList.add('mx-2')
            let newLabel = document.createElement('label')
            newLabel.innerText = teamsArray[i].innerText + "  "
            let newLineBreak = document.createElement('br')            
            teamPickerParent.appendChild(newLabel)
            teamPickerParent.appendChild(newRadio)
            teamPickerParent.appendChild(newLineBreak)

        }

}

