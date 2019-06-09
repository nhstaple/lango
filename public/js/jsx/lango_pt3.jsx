/*
   This flipcard component is based on the flipcard component by
   Alex Devero, at:
   
      https://reactjsexample.com/react-flipping-card-with-tutorial/

   It was modified for ECS 162 by Nina Amenta, May 2019.
*/

function cardReq()
{
  let str = "card?spanish=" + document.getElementById("trans").textContent +
                "&correct=true";
  console.log("sanity check cardReq AJAX\n" + str);
  makeCorsRequest(str);
	return;
}
const cardContainer = document.getElementById("root");

/** Header. **/
class Header extends React.Component {
  render() {
      return (
      <div id="header">
          <div className="buttonWrapper">
              <a id="addRedirect" href="/user/add.html">Add</a>
          </div>
          <div id="title">Lango!</div>
      </div>
      );
  }
}

/** Footer. **/
class Footer extends React.Component {
  render() {
      return (
      <div id="footer">
          User Name
      </div>
      );
  }
}

// React component for the front side of the card
class CardFront extends React.Component {
  render(props) {
    return(
      <div id="front" className='card-side side-front'>
         <div className='card-side-container'>
              <h2 id='trans'>{this.props.text}</h2>
        </div>
      </div>
    )
  }
}

// React component for the back side of the card
class CardBack extends React.Component {
  render(props) {
    return(
      <div id="back" className='card-side side-back'>
         <div className='card-side-container'>
              <h2 id='congrats'>{this.props.text}</h2>
        </div>
      </div>
    )
  }
}

function flipCard()
{
  console.log("Flip! " + counter);
  var counter = 0;
  var wait = setInterval(function(counter) {
    if(counter >= 2) {
      clearInterval(wait);
      console.log("stop flipping!");
      getFlashCard();
    }
    document.getElementById("card").classList.add("is-flipped");
    document.getElementById("front").classList.add("is-flipped");
    counter++;
  }, 1500);
}

class CardWrapper extends React.Component {
  checkReturn(event) {
    if (event.charCode == 13) {
      flipCard();
    }
  }
  render() {
    return(
      <div id="reviewMain">
        <Header />
        <div id="card" className='card-container'>
          <div className="buttonWrapper">
            <button id="flipButton" onClick={this.flipCard}>Check Answer</button>
          </div>
          <div className='card-body'>
            <CardBack text="Correct!" />

            <CardFront text="" />
          </div>
        </div>
        <div id="form">
					<textarea id="cardInput" type="text" name="english" placeholder="English" onKeyPress={this.checkReturn}>
          </textarea>
				</div>
        <Footer />
      </div>
    )
  }
}

// Render Card component
ReactDOM.render(<CardWrapper />, cardContainer);

getUsername();
getFlashCard();
