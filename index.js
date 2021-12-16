 
//1, Submit name into a list and array function

let namesInList = []



const submitName = function () {   
    let textInput = document.getElementById('nameInputs')
    let unassignedPoolContainer = document.querySelector('#unassigned-pool ul')
    let li = document.createElement('li')
    li.innerText = textInput.value
    namesInList.push(li.innerText)
    unassignedPoolContainer.appendChild(li)
}



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

    //take names from the list and distribute them into teams

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

    if (namesInList[0] != undefined) {
        alert('Outstanding member to be assigned')
        let newButtonContainer = document.getElementById('generated-team-container')
        let newButton = document.createElement('button')
        newButton.type = 'button'
        newButton.innerText = 'Assign'
        newButton.classList.add('btn')
        newButton.classList.add('d-block')
        newButton.classList.add('mb-4')
        newButton.classList.add('btn-primary')
        newButtonContainer.appendChild('newButton')
    }

}




