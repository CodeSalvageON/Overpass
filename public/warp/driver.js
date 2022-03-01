const github = document.getElementById("github");
const quizproblem = document.getElementById("quiz-problem");
const myproblem = document.getElementById("myproblem");
const prev = document.getElementById("prev");
const answer_chance = document.getElementById("answer-chance");
const answer_links = document.getElementById("answer-links")

github.onclick = function () {
  window.open("https://github.com/CodeSalvageON/Overpass");
}

quizproblem.onsubmit = function () {
  event.preventDefault();
  
  prev.innerText = myproblem.value;
  const fixed_url = myproblem.value.replace(" ", "%20");

  fetch ("/getlinks", {
    method : "POST",
    headers : {
      "Content-Type" : "application/json"
    },
    body : JSON.stringify({
      url : "https://www.google.com/search?q=" + fixed_url
    })
  })
  .then(response => response.text())
  .then(data => {
    if (data.includes("https://brainly") || data.includes("https://jishka") || data.includes("https://quora") || data.includes("https://wyzant")) {
      answer_chance.innerText = "Likeliness of Solving: Fairly High!";
    }

    else {
      answer_chance.innerText = "Likeliness of Solving: Unknown or Low...";
    }
    
    const data_array = data.split("<a href=");
    const all_array = [];
    let turn = 0;

    answer_links.innerHTML = "";

    for (i = 0; i < data_array.length; i++) {
      if (data_array[i].includes("https://")) {
        const link_array = data_array[i].split('"');

        if (turn === 0) {
          // PASS 
          turn = turn + 1;
        }

        else {
          all_array.push(link_array[1]);
        }
      }
    }

    for (i = 0; i < all_array.length; i++) {
      answer_links.innerHTML = answer_links.innerHTML + "<p><a href='https://google.com" + all_array[i] + "' target='_blank'>" + all_array[i].replace("/url?q=", "") + "</a></p>";
    }
  })
  .catch(error => {
    throw error;
  });
}