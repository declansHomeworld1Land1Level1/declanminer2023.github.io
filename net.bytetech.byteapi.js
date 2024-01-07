const ByteAPI = require("byteapi");

// Create a client
const client = new ByteAPI.Client("YOUR_API_KEY");

// Get the current user
const user = client.getUser();

// Print the user's name
console.log(user.name);

// Create a GUI window
const window = new BrowserWindow({
  width: 800,
  height: 600,
  title: "API Key Validator",
});

// Create a text input field for the API key
const apiKeyInput = document.createElement("input");
apiKeyInput.setAttribute("type", "text");
apiKeyInput.setAttribute("placeholder", "Enter API key");

// Create a button to validate the API key
const validateButton = document.createElement("button");
validateButton.textContent = "Validate";
validateButton.addEventListener("click", () => {
  // Get the API key from the input field
  const apiKey = apiKeyInput.value;

  // Convert the API key to bytes
  const bytes = atob(apiKey);

  // Check if the API key has the correct header bytes
  if (bytes.slice(0, 10) !== [66, 121, 116, 101, 65, 80, 73, 95, 75, 101, 121]) {
    // The API key is invalid
    alert("Key invalid, Incorrect header bytes");
  } else {
    // The API key is valid
    alert("Key valid");
  }
});

// Add the text input field and button to the window
window.document.body.appendChild(apiKeyInput);
window.document.body.appendChild(validateButton);

// Show the window
window.show();
