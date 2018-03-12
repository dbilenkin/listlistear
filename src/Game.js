import React, { Component } from "react";
import fire from "./fire";

class Game extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      messages: [],
      game: "game" + props.match.params.id
    }; // <- set up react state
  }
  componentWillMount() {
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire
      .database()
      .ref(this.state.game)
      .orderByKey()
      .limitToLast(100);

    messagesRef.on("value", snapshot => {
      var newMessages = [];
      snapshot.forEach(function(child) {
        newMessages.push({
          text: child.val(),
          id: child.key
        });
      });
      this.setState({ messages: newMessages });
    });
  }
  addMessage(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire
      .database()
      .ref(this.state.game)
      .push(this.inputEl.value);
    this.inputEl.value = ""; // <- clear the input
  }

  handleDelete(key) {
    console.log(key);
    fire
      .database()
      .ref(this.state.game)
      .child(key)
      .remove(); // this removes the parent of test (RemoveTest)
  }

  createGame(e) {
    fire
      .database()
      .ref("games")
      .push();
  }
  render() {
    return (
      <div>
        <h1>{this.state.game}</h1>
        <form onSubmit={this.addMessage.bind(this)}>
          <input type="text" ref={el => (this.inputEl = el)} />
          <input type="submit" />
          <ul>
            {/* Render the list of messages */
            this.state.messages.map(message => (
              <li
                key={message.id}
                onClick={() => this.handleDelete(message.id)}
              >
                {message.text}
              </li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}

export default Game;
