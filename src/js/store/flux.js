const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			addContact: newContact => {
				const tempStore = getStore();
				//right side getStore gives us actual store
				const updatedContacts = tempStore.contacts.concat(newContact);
				setStore({ contact: updatedContacts });
			},
			// Use getActions to call a function within a fuction
			// exampleFunction: () => {
			//     getActions().changeColor(0, "green");
			loadSomeData: () => {
				fetch("https://assets.breatheco.de/apis/fake/contact/agenda/camillav")
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						//Read the response as json.
						return response.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
					})
					.then(function(responseAsJson) {
						setStore({ contacts: responseAsJson }); //.results means grabbing the value of the propery results
					})
					.catch(function(error) {
						//error handling
						console.log("Looks like there was a problem: \n", error); //this will print on the console the exact object received from the server
					}); /**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
