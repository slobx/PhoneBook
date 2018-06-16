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


    searchByLastName = () => {
        //TODO finish this
    };

    deleteContact = (index) => {
        console.log("Index" + index);
        // let contacts = [...this.state.phone_book_items];
        // contacts.splice(index, 1);
        // this.setState({contacts});
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
                <PhoneList items={this.state.phone_book_items} deleteRow = {() => this.deleteContact}/>
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
                                        <i className="fa fa-user"></i>&nbsp;&nbsp;First Name</span>
                                    </div>
                                    <input type="text" className="form-control" id="name_input" autoFocus/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">
                                        <i className="fa fa-users"></i>&nbsp;&nbsp;Last Name</span>
                                    </div>
                                    <input type="text" className="form-control" id="last_name_input"/>
                                </div>
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">
                                        <i className="fa fa-phone"></i>&nbsp;&nbsp;Phone</span>
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
                    <tr key={key}>
                        <td>{key + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.phone}</td>
                        <td onClick={this.props.deleteRow(key)}>&times;</td>
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
            <table className="table table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Phone number</th>
                </tr>
                </thead>
                <PhoneListItem deleteRow={this.props.deleteRow} items={this.props.items}/>
            </table>
        )
    }
}


ReactDOM.render(<App/>, document.getElementById('root'));