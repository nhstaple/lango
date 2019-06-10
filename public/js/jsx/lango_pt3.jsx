/*
   This flipcard component is based on the flipcard component by
   Alex Devero, at:
   
      https://reactjsexample.com/react-flipping-card-with-tutorial/

   It was modified for ECS 162 by Nina Amenta, May 2019.
*/

function cardReq()
{
  let str = "card?spanish="; // + document.getElementById("trans").textContent +
  if(document.getElementById("cardInput").value == "") {
    str += "NEXT";
  }
  else 
  {
    str += document.getElementById("trans").textContent; 
  }
  str += "&correct=";
  if(checkAnswer()) { str += "true"; }
  else { str += "false"; }
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

function flipCard() {
  var counter = 0;
  if(checkAnswer()) {
    document.getElementById("congrats").textContent = "Correct!";
  } else {
    document.getElementById("congrats").textContent = "False!";
  }

  document.getElementById("card").classList.add("is-flipped");
  document.getElementById("front").classList.add("is-flipped");

  var wait = setInterval(function () {
    console.log("Flip! " + counter);
    if (counter >= 1) {
      console.log("stop flipping!");
      clearInterval(wait);
      document.getElementById("congrats").textContent = "Loading";
      getFlashCard();
      document.getElementById("congrats").textContent = "";
    }
    if(counter == 0) 
    {
      document.getElementById("card").classList.remove("is-flipped");
      document.getElementById("front").classList.remove("is-flipped");
    }
    counter++;
  }, 1500);
}

function checkAnswer()
{
  var solution = document.getElementById("answer").textContent;
  solution = solution.toLowerCase();
  var answer = document.getElementById("cardInput").value;
  answer = answer.toLowerCase();
  answer = answer.replace(/(\r\n|\n|\r)/gm, "");
  console.log(answer + " ?= " + solution + " => " + (answer == solution));
  return (answer == solution);
}


class CardWrapper extends React.Component {
  checkReturn(event) {
    if (event.charCode == 13) {
      document.getElementById("cardInput").value = document.getElementById("cardInput").value.replace(/(\r\n|\n|\r)/gm, "");
      flipCard();
    }
  }
  render() {
    return(
      <div id="reviewMain">
        <Header />
        <div id="card" className='card-container'>
          <div className="buttonWrapper">
            <button id="flipButton" onClick={flipCard}>Check Answer</button>
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
        <div className="buttonWrapper">
            <button id="nextCardButton" onClick={getFlashCard}>Next</button>
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
