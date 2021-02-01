const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contacts: []
		},
		actions: {
			addContact: newContact => {
				const tempStore = getStore();
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(newContact)
				})
					.then(() => getActions().initialData())
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			deleteContact: id => {
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, { method: "DELETE" })
					.then(response => response.json())
					.then(response => {
						fetch("https://assets.breatheco.de/apis/fake/contact/agenda/camillav")
							.then(function(response) {
								if (!response.ok) {
									throw Error(response.statusText);
								}
								// Read the response as json.
								return response.json();
							})
							.then(function(responseAsJson) {
								// Do stuff with the JSON
								setStore({ contacts: responseAsJson });
							})
							.catch(function(error) {
								console.log("Looks like there was a problem: \n", error);
							});
					});
			},
			editContact: (editedContact, id) => {
				console.log(editedContact);
				fetch(`https://assets.breatheco.de/apis/fake/contact/${id}`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify(editedContact)
				})
					.then(() => getActions().initialData())
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},
			initialData: () => {
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
			}
		}
	};
};

export default getState;
