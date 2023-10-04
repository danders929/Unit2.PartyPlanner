
const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2309-FSA-ET-WEB-FT-SF/events";

const state = {
  parties: [],
};
// selects the #parties unordered list id
const partyList = document.querySelector("#parties");

const addPartyForm = document.querySelector("#newParty");
addPartyForm.addEventListener("submit", addParty);

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
async function getParties() {
  // write a try/catch for getting the parties from API
  try {
    // get a response from API
    const response = await fetch(API_URL);
    //assign the JSON to a variable
    const json = await response.json();
    //assign the json data to state.parties
    state.parties = json.data;
  // catch error and return to console
  } catch(error){
    console.log(error);
  }
}

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
    <button class="delete" id="${party.id}">Delete</button>
    `;
    const delPartyBtn = li.querySelector(".delete");
    delPartyBtn.addEventListener("click", () => {
      const partyId = party.id;
      delParty(partyId);
      console.log(partyId);
    });
    return li;
  });
  partyList.replaceChildren(...partyPosts);
};

// use event listener to fetch data for new party and return it to the partyList object
async function addParty(event) {
  event.preventDefault();
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: addPartyForm.name.value,
        description: addPartyForm.description.value,
        date: addPartyForm.date.value,
        location: addPartyForm.location.value,
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

// use event listener to listen for a click event on delete button and remove from API. Used help from ChatGPT for this part


async function delParty(partyId) {
  event.preventDefault();
    try {
      const response = await fetch(`${API_URL}/${partyId}`, {
        method: "DELETE",
        headers: {"content-Type": "application/json"}
    });
    if(!response.ok){
      throw new Error("Failed to delete party");
    }
    render();
    } catch(error){
      console.log(error);
    }
  };

