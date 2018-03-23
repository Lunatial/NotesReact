const Notes = React.createClass({

    getInitialState: function () {
        return { editing: false };
    },
    edit: function () {
        this.setState({ editing: true })
    },
    remove: function () {
        console.log('Éppen eltávolítom');
        this.props.deleteFromBoard(this.props.index);
    },
    save: function () {
        this.props.updateNoteText(this.refs.newText.value, this.props.index);
        this.setState({ editing: false });
    },
    renderNormal: function () {
        return (
            <div>
                <div>{this.props.children}</div>
                <button onClick={this.edit}>Edit</button>
                <button onClick={this.remove}>Remove</button>
            </div>
        );
    },
    renderForm: function () {
        return (
            <div>
                <textarea ref="newText" defaultValue={this.props.children}></textarea>
                <button onClick={this.save}>Save</button>
            </div>
        );
    },
    render: function () {
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderNormal();
        }
    }

});

var Board = React.createClass({

    getInitialState: function () {
        return {
            comments: []
        }
    },

    add: function (text) {
        var arr = this.state.comments;
        arr.push(text);
        this.setState({ comments: arr });
    },

    removeNote: function (i) {
        console.log('Removing notes' + i);
        var arr = this.state.comments;
        arr.splice(i, 1);
        this.setState({ comments: arr });
    },

    updateNotes: function (newText, i) {
        console.log('Updating notes' + i);
        var arr = this.state.comments;
        arr[i] = newText;
        this.setState({ comments: arr });
    },

    eachNotes: function (text, i) {
        return (
            <Notes key={i} index={i} updateNoteText={this.updateNotes} deleteFromBoard={this.removeNote}>
                {text}
            </Notes>
        );
    },

    render: function () {
        return (
            <div>
                <button onClick={this.add.bind(null, 'töltelék szöveg')}>Új hozzáadása</button>
                <div>
                    {this.state.comments.map(this.eachNotes)}
                </div>
            </div>
        );
    }
});

ReactDOM.render(<Board />, document.getElementById('container'));