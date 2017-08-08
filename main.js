
//create global variables
let item = document.querySelector('#search');
let container = document.querySelector('#container');
let find = document.querySelector('#find');

//when you type an item into the search field, it will send that item to the end of the url in to fetch and commence the fetch action.
let findMe = '';
find.addEventListener("click", function (){
  findMe = item.value
      fetch("https://recipepuppyproxy.herokuapp.com/api/?q="+findMe)
          .then(convertData)
          .then(printData);
});

//we need to parse the JSON data that was fetched
function convertData(data){
  return data.json();
}

//Once we have converted the data, we want to extract what we want and add it to the webpage and create the template literal.
function printData(data){
  console.log(data);

  let totalItems='';
  let image = '';
  for (let i = 0; i < data.results.length; i++){
      if (data.results[i].thumbnail == ""){
        image = "http://via.placeholder.com/100x100"}
        else {image = data.results[i].thumbnail}

      let recipe=`
          <div>
            <a href="${data.results[i].href}">
              <h3>${data.results[i].title}</h3>
              <img src="${image}" alt="${data.results[i].title}">
            </a>
          </div>
      `;
      totalItems += recipe
    }
    container.innerHTML = totalItems;
}
