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
        ]
    };


    render() {
        return (
            <div>
                <PhoneList items={this.state.phone_book_items}/>
                <button type="button" class="btn btn-dark" id="btn_add_contact">Add contact</button>
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
            <table class="table table-dark">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                </tr>
                </thead>
                <PhoneListItem items={this.props.items}/>

            </table>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));