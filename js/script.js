let phone_book_items = [];
phone_book_items.push({index: 1, first_name: "Mike", last_name: "Johnson", phone: "+38163111222"});
phone_book_items.push({index: 2, first_name: "Jack", last_name: "Shepard", phone: "+38164222333"});
phone_book_items.push({index: 3, first_name: "Michael", last_name: "Malone", phone: "+38165444555"});

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        phone_book_items: [
            {index: 1, first_name: "Mike", last_name: "Johnson", phone: "+38163111222"},
            {index: 2, first_name: "Jack", last_name: "Shepard", phone: "+38164222333"},
            {index: 3, first_name: "Michael", last_name: "Malone", phone: "+38165444555"}
        ],
        show_modal: false
    };

    searchByLastName =() => {

    };


    render() {
        return (
            <div id="app_wrapper">
                <input className="form-control" id="input_search_last_name" onKeyUp={this.searchByLastName} type="text" placeholder="Search by last name..."/>
                <PhoneList items={this.state.phone_book_items}/>
                <AddNewContactModal/>
                <button type="button" className="btn btn-dark" id="btn_add_contact" data-toggle="modal"
                        data-target="#add_new_contact_modal">Add contact
                </button>
            </div>
        )
    }

}


class PhoneListItem extends React.Component {
    render() {
        return (
            <tbody>
            {this.props.items.map(item => {
                return (
                    <tr>
                        <td>{item.index}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                        <td>{item.phone}</td>
                        <td>X</td>
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
                    <PhoneListItem items={this.props.items}/>

                </table>
        )
    }
}

class AddNewContactModal extends React.Component {
    render() {
        return (
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
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">
                                        <i class="fa fa-users"></i>&nbsp;&nbsp;Last Name</span>
                                </div>
                                <input type="text" className="form-control"/>
                            </div>
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text" id="inputGroup-sizing-default">
                                        <i class="fa fa-phone"></i>&nbsp;&nbsp;Phone</span>
                                </div>
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-dark" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-dark">Add contact</button>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));