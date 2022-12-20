const textElement = document.getElementById('text')
const optionButtonElement = document.getElementById('option-button')

let state = {}

function startGame(){
    state = {}
    showTextNode(1) // will start on the first phase of the game aka the first interaction
}

// this function is used to show the text/StoryLine into the div for text
function showTextNode(textNodeIndex){
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)// this will be the current node in which will be the text to display first 
    textElement.innerText = textNode.text

    // to remmove all the options intially
    while(optionButtonElement.firstChild){
        optionButtonElement.removeChild(optionButtonElement.firstChild)
    }
    // now we can add options we want 
    textNode.options.forEach(option => {
        if(showOption(option)){
            // this will use our show options function to show options as according to our state
            const button = document.createElement('button')
            button.innerText = option.text // we set the text for it
            button.classList.add('btn')
            button.addEventListener('click',() => selectOption(option))
            optionButtonElement.appendChild(button)// simply want to append the option
        }
    });

}
function showOption(option){
    return option.requiredState == null || option.requiredState(state)// checks if we have a required state object first

}
function selectOption(option){
    const nextTextNodeId =option.nextText
    state = Object.assign(state,option.setState)// this will take the current state and add everything from option.setState and overwrite all that already is there
    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id : 1,
        text: "You are chatting with your two closest friends. They state that a friend of theirs is coming to join as well. You hear a knock on the door, your tall-friend goes to answer the door and in comes this girl, with confidence,beautiful. Your heart  begins beating fast, You greet her... ",
        options: [
            {
                text: 'Flirtaously',
                setState: {flirt: true},
                nextText: 2 
            },
            {
                text: 'Platonically',
                nextText: 2
            }
            
        ]
        

    },
    {
        id : 2,
        text: "Your friends do introductions,Her name is Beloved, You reply...",
        options: [
            {
                text: 'Nice to meet you Beloved',
                nextText: 3 
            },
            {
                text: 'Mmmh Beloved thats a Beautiful,its nice to meet you',
                setState:{flirt:true},
                nextText: 3
            }
            
        ],
        
    },
    {
        id: 3,
        text:'Your friends begin a game of 30 seconds and the picking of teams is required. You Pick...',
        options: [
            {
                text:'Guy friend and make it Guys vs Girls',
                setState:{Platonic:true},
                nextText: 4
            },
            {
                text:'Female friend',
                setState:{Platonic:true},
                nextText:4
            },
            {
                text:'Beloved',
                setState :{Intrigue:true},
                nextText:4
            }
        ]
    },
    {
        id: 4,
        text:'She is smart but unfortunately you werent quick on your feet so your team loses. You have laundry which needs to be done, so you ask for Guy friend to use his machine, to which he refuses so you begin convincing him to no success...',
        options: [
            {
                text:'Do your own Laundry',
                setState:{Platonic:true},
                nextText: 6
            },
            {
                text:'Take Laundry to LaundryMat',
                setState:{Platonic:true},
                nextText:5
            },
            {
                text:'Beloved offers to do it instead',
                requiredState: (currentState) => currentState.Intrigue,
                setState:{Platonic:false,interest:true},
                nextText:5
            }
        ]
    }
]

startGame()