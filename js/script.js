class App extends React.Component {


    constructor(props) {
        super(props);

        this.state = {
            contact: {},
            phone_book_items: [],
        };
    }


    componentDidMount() {
        this.loadContactsFromAPI();
    }


    searchByLastName = (e) => {
        var filter, table, tr, tr2, td, i;
        filter = e.target.value.toUpperCase();
        table = document.getElementById("contacts_table");
        tr = table.getElementsByTagName("tr");
        tr2 = document.getElementsByClassName("delete_contact_row");
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[2];
            if (td) {
                if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                    tr2[i-1].style.display = "";
                } else {
                    tr[i].style.display = "none";
                    tr2[i-1].style.display = "none";
                }
            }
        }

    };

    deleteContact = (key) => {
        let contacts = [...this.state.phone_book_items];
        contacts.splice(key, 1);
        this.setState({phone_book_items: contacts});
        let deletedContact = {"id": key};

        fetch('http://localhost:3000/api/delete', {
            method: 'POST',
            body: JSON.stringify(deletedContact),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => console.log(res))

    };


    closeAlert = () => {
        $("#alert").slideUp();
    };

    saveContact = () => {
        if ($('#name_input').val() && $('#last_name_input').val() && $('#phone_input').val()) {
            $('#add_new_contact_modal').modal('hide');
            $('#add_new_contact_modal').on('hidden.bs.modal', function (e) {
                $('#name_input').val('');
                $('#last_name_input').val('');
                $('#phone_input').val('');
            });

            let contact = {
                name: $('#name_input').val(),
                last_name: $('#last_name_input').val(),
                phone: $('#phone_input').val()
            };

            this.setState(prevState => ({
                phone_book_items: [...prevState.phone_book_items, contact]
            }));


            fetch('http://localhost:3000/api/post', {
                method: 'POST',
                body: JSON.stringify(contact),
                headers: {
                    "Content-Type": "application/json"
                }
            }).then(res => console.log(res))
                .then(() => {
                    this.loadContactsFromAPI();
                });
        } else {
            $("#alert").slideDown();
        }

    };


    loadContactsFromAPI = () => {
        fetch("http://localhost:3000/api/contacts.json")
            .then(response => {
                return response.json()
            })
            .then(contacts => {
                this.setState({phone_book_items: contacts});
                console.log("CONTACTS" + contacts);
            })
            .catch(err => {
                console.log(err);
            })
    };

    render() {
        return (
            <div id="app_wrapper">
                <input className="form-control" id="input_search_last_name" onKeyUp={this.searchByLastName} type="text"
                       placeholder="Search by last name..."/>
                <div id="data_wrapper">
                    <div id="phone_list_wrapper">
                        <PhoneList items={this.state.phone_book_items}/>
                    </div>
                    <div id="delete_contact_wrapper">
                        {this.state.phone_book_items.map((item, key) => {
                            return (
                                <tr className="delete_contact_row" key={key}>
                                    <td>
                                        <div onClick={() => this.deleteContact(key)} id="delete_contact_row_data"><i className="fa fa-times"/></div>
                                    </td>
                                </tr>
                            )
                        })}
                    </div>
                </div>
                <button type="button" className="btn btn-dark" id="btn_add_contact" data-toggle="modal"
                        data-target="#add_new_contact_modal">Add contact
                </button>
                <div className="modal fade" id="add_new_contact_modal" tabIndex="-1" role="dialog" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLongTitle">Add new contact</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">
                                        <i className="fa fa-user"/>&nbsp;&nbsp;First Name</span>
                                    </div>
                                    <input type="text" className="form-control" id="name_input" autoFocus/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">
                                        <i className="fa fa-users"/>&nbsp;&nbsp;Last Name</span>
                                    </div>
                                    <input type="text" className="form-control" id="last_name_input"/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">
                                        <i className="fa fa-phone"/>&nbsp;&nbsp;Phone</span>
                                    </div>
                                    <input type="text" className="form-control" id="phone_input"/>
                                </div>
                            </div>
                            <div className="alert alert-danger alert-dismissible fade show" id="alert" role="alert">
                                <strong>Error!</strong> You must fill all fields.
                                <button type="button" className="close" aria-label="Close" onClick={this.closeAlert}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div className="modal-footer">

                                <button type="button" className="btn btn-dark" data-dismiss="modal"
                                        onClick={this.closeAlert}>Close
                                </button>
                                <button type="button" className="btn btn-dark" onClick={this.saveContact}>Add
                                    contact
                                </button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


class PhoneListItem extends React.Component {
    render() {
        return (
            <tbody>
            {this.props.items.map((item, key) => {
                return (
                    <tr key={key} id="filter_cell">
                        <td>{key + 1}</td>
                        <td>{item.name}</td>
                        <td >{item.last_name}</td>
                        <td>{item.phone}</td>
                    </tr>
                )
            })}
            </tbody>
        )
    }
}

class PhoneList extends React.Component {
    render() {
        return (
            <div id="container">
                <table className="table table-dark"
                       id="contacts_table"
                       data-filter-control="true"
                       data-filter-show-clear="true">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First Name</th>
                        <th scope="col">Last Name</th>
                        <th scope="col">Phone number</th>
                    </tr>
                    </thead>
                    <PhoneListItem items={this.props.items}/>
                </table>
            </div>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));