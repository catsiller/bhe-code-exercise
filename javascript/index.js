const Sieve = require("./Sieve/sieve");

const express = require("express");
const app = express();
const PORT = 3000;

const MAX_PRIME_TO_CALCULATE = 99999999; // Set the maximum prime number to calculate

app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <style>
        body {
          align-items: center;
          background-color: #e6e6ef;
          display: flex;
          flex-direction: column;
          font-family: Arial, sans-serif;
          justify-content: center;
          margin: 0;
          min-height: 100vh;
        }
        .container {
          background: white;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          padding: 30px;
          text-align: center;
          width: 90%;
        }
        h1 {
          color: #2d2654;
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
        }
        input {
          border-radius: 4px;
          border: 2px solid #e6e6ef;
          font-size: 1rem;
          margin: 10px 0;
          max-width: 300px;
          padding: 12px 16px;
          transition: border-color 0.3s ease;
          width: 80%;
        }
        input:focus {
          border-color: #2d2654;
          outline: none;
        }
        button {
          background: #2d2654;
          border-radius: 4px;
          border: none;
          color: white;
          cursor: pointer;
          font-weight: 500;
          letter-spacing: 1px;
          margin: 15px 0;
          padding: 12px 24px;
          text-transform: uppercase;
          transition: all 0.3s ease;
        }
        button:hover {
          background: #3f3875;
          box-shadow: 0 4px 12px rgba(45, 38, 84, 0.2);
          transform: translateY(-1px);
        }
        button:active {
          transform: translateY(0);
        }
        #secondResult {
          color: #2d2654;
          font-family: Arial, sans-serif;
          font-weight: 500;
          margin-top: 20px;
        }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Type in the prime number that you want to retrieve:</h1>
          <input type="text" id="returnInput" />
          <button onclick="generateSecondPrime()">Generate Nth Prime number</button>
          <div id="secondResult">Answer will appear here</div>
        </div>
        <script>
        function generateSecondPrime() {
          const n = document.getElementById('returnInput').value;
          const resultElement = document.getElementById('secondResult');

          // Create a new AbortController to cancel the fetch if needed
          const controller = new AbortController();
          const signal = controller.signal;

          // Set a timeout to show "Loading..." after 1 second
          const loadingTimeout = setTimeout(() => {
            resultElement.textContent = 'Answer is: Loading...';
          }, 1000);

          // Fetch with timeout and ability to abort
          fetch('/prime/' + n, { signal })
            .then(response => response.text())
            .then(prime => {
              clearTimeout(loadingTimeout);
              resultElement.textContent = 'Answer is: ' + prime;
            })
            .catch(error => {
              clearTimeout(loadingTimeout);
              if (error.name === 'AbortError') {
                resultElement.textContent = 'Answer is: Loading...';
              } else {
                resultElement.textContent = 'Error: ' + error.message;
              }
            });
        }
        </script>
      </body>
    </html>
  `);
});

app.get("/prime/:n", (req, res) => {
  const primeGenerator = new Sieve();
  const n = parseInt(req.params.n);

  // Check if the requested prime number is too large
  if (n > MAX_PRIME_TO_CALCULATE) {
    res.status(400).send("Too large to calculate");
    return;
  }

  try {
    const prime = primeGenerator.getNthPrime(n);
    res.send(prime.toString());
  } catch (error) {
    res.status(400).send("Please enter a valid positive number");
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = Sieve;
