function addElement(){
    var input = document.getElementById('input')
    var listElement = document.createElement('li')

    var listItem = document.createTextNode(input)
    input.appendChild(listItem)

}