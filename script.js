  </style>
</head>
<body>
    <div class="container">
        <div class="title">Voice Chatbot</div>
        <div class="chat" id="chat"></div>
        <div class="input-section">
            <input type="text" class="input" id="input" placeholder="Type your message here...." />
            <button class="button" id="button"><i class="fa-brands fa-telegram"></i></button>
            <button class="voice-button" id="voice-button"><i class="fa-solid fa-microphone"></i></button>
        </div>
    </div>

    <script>
        function chatbot(input) {
            let output = "";
            input = input.toLowerCase();
            if (input.includes("hello") || input.includes("hi")) {
                output = "Hello, nice to meet you!";
            } else if (input.includes("how are you")) {
                output = "I'm doing fine, thank you for asking.";
            } else if (input.includes("what is your name")) {
                output = "My name is Jarvis, I'm a chatbot.";
            } else if (input.includes("what can you do")) {
                output = "I can chat with you and answer some simple questions.";
            } else if (input.includes("tell me a joke")) {
                output = "Why did the chicken go to the seance? To get to the other side.";
            } else {
                output = "Sorry, I don't understand that. Please try something else.";
            }
            return output;
        }

        function textToSpeech(text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = "en-US";
            speechSynthesis.speak(utterance);
        }

        function displayUserMessage(message) {
            let chat = document.getElementById("chat");
            let userMessage = document.createElement("div");
            userMessage.classList.add("message", "user");
            let userAvatar = document.createElement("div");
            userAvatar.classList.add("avatar");
            let userText = document.createElement("div");
            userText.classList.add("text");
            userText.innerHTML = message;
            userMessage.appendChild(userAvatar);
            userMessage.appendChild(userText);
            chat.appendChild(userMessage);
            chat.scrollTop = chat.scrollHeight;
        }

        function displayBotMessage(message) {
            let chat = document.getElementById("chat");
            let botMessage = document.createElement("div");
            botMessage.classList.add("message", "bot");
            let botAvatar = document.createElement("div");
            botAvatar.classList.add("avatar");
            let botText = document.createElement("div");
            botText.classList.add("text");
            botText.innerHTML = message;
            botMessage.appendChild(botAvatar);
            botMessage.appendChild(botText);
            chat.appendChild(botMessage);
            chat.scrollTop = chat.scrollHeight;
            textToSpeech(message);
        }

        function sendMessage() {
            let input = document.getElementById("input").value;
            if (input) {
                displayUserMessage(input);
                let output = chatbot(input);
                setTimeout(() => displayBotMessage(output), 1000);
                document.getElementById("input").value = "";
            }
        }

        document.getElementById("button").addEventListener("click", sendMessage);
        document.getElementById("input").addEventListener("keypress", function(event) {
            if (event.keyCode === 13) {
                sendMessage();
            }
        });

        document.getElementById("voice-button").addEventListener("click", () => {
            const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.lang = "en-US";
            recognition.start();

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                displayUserMessage(transcript);
                const output = chatbot(transcript);
                setTimeout(() => displayBotMessage(output), 1000);
            };
        });
    </script>
