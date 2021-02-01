import React, { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const EditContact = props => {
	const { store, actions } = useContext(Context);
	const params = useParams();
	console.log(params);
	// use id in order to find this specific contact from store.contacts, then the next row to get id from props. how can we access it? open inspector, click edit pencil, go to components and look for edit contacts. There is a props  inside match>params It is props.match.params.id
	// use a  find method to match params.id
	// added property above with my typed string from postman to manipulate newContact instead of overwriting old values as it saves without worry when restarting gitpod
	// contact.full_name (this will come from a newly created contact variable from the find method)
	const [editedContact, setEditedContact] = useState({
		agenda_slug: "camillav",
		full_name: store.contacts[params.index].full_name,
		email: store.contacts[params.index].email,
		phone: store.contacts[params.index].phone,
		address: store.contacts[params.index].address
	});
	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">Edit a contact</h1>
				<form>
					<div className="form-group">
						{/* get the input field to be saved onto the array, use onChange event */}
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							placeholder="Full Name"
							value={editedContact.full_name}
							// ... is a spread operator, expanding into individual elements
							onChange={event => setEditedContact({ ...editedContact, full_name: event.target.value })}
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input
							type="email"
							className="form-control"
							placeholder="Enter email"
							value={editedContact.email}
							onChange={event => setEditedContact({ ...editedContact, email: event.target.value })}
						/>
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input
							type="phone"
							className="form-control"
							placeholder="Enter phone"
							value={editedContact.phone}
							onChange={event => setEditedContact({ ...editedContact, phone: event.target.value })}
						/>
					</div>
					<div className="form-group">
						<label>Address</label>
						<input
							type="text"
							className="form-control"
							placeholder="Enter address"
							value={editedContact.address}
							onChange={event => setEditedContact({ ...editedContact, address: event.target.value })}
						/>
					</div>
					<button
						type="button"
						className="btn btn-primary form-control"
						onClick={() => {
							actions.editContact(editedContact, store.contacts[params.index].id);
						}}>
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

EditContact.propTypes = {
	location: PropTypes.object
};
