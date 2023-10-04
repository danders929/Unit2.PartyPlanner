// create variable API
const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/events";
const state = {
  parties: [],
};
// selects the #parties unordered list id
const partyList = document.querySelector("#parties");
// selects the #newParty form id
test = document.querySelector("#newParty");
// event listener for the submit button on form, calls the function addParty
test.addEventListener("submit", addParty);

/**
 * Synce state with the API and rerender
 */
async function render() {
  await getParties();
  renderParties();
}
render();

/**
 * update state with parties from API
 */
async function getparties() {
  // write a try/catch for getting the parties from API
  try {
    const response = await fetch(API_URL);
    //assign the JSON to a variable
    const json = await response.json();
    //assign the json data to state.parties
    state.parties = json.data;
  } catch(error){
    console.log(error);
  };
};

/**
 * Render parties from state
 */
function renderParties() {
  // if no parties are found insert a <li> that tells the user that there are no parties listed.
  if(!state.parties.length){
    // adds html code in the #partyList unordered list
    partyList.innerHTML ="<li>No Parties Listed</li>";
    // exits and returns nothing
    return;
  };
  // for each party in the state object, create a li and insert text with the party name as <h3> and <p> elements for the description, date/time, and location
  const partyPosts = state.parties.map((party) => {
    const li = document.createElement('li');
    li.innerHTML = `
    <h3>${party.name}</h3>
    <p>${party.description}<p>
    <p>${party.date}</p>
    <p>${party.location}</p>
    <button class="delete">Delete</button>
    `;
    return li;
  });
  partyList.replaceChildren(...partyPosts);
};



// use event listener to fetch data for new party and return it to the partyList object
async function addNewParty(event) {
  event.preventDefault();
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: test.name.value,
        description: test.description.value,
        date: test.date.value,
        location: test.location.value,
      }),
    });
    if(!response.ok){
      throw new Error("Failed to create party");
    }
    render();
  } catch (error){
    console.log(error);
  };
};

