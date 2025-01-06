<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Voice Chatbot | Becodewala</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <style>
        /* Same CSS as before */
        * {
            box-sizing: border-box;
        }
        body {
            font-family: 'Poppins', sans-serif;
            background: #222831;
        }
        .container {
            width: 600px;
            margin: 50px auto;
            padding: 20px;
            border-radius: 10px;
            box-shadow: #64646f33 0px 7px 29px 0px;
            background: #31363F;
        }
        .title {
            text-align: center;
            font-size: 24px;
            font-weight: bold;
            color: #edf1f3;
        }
        .chat {
            height: 400px;
            overflow-y: scroll;
            margin: 20px 0;
            padding: 10px;
            border: 2px solid #545250;
            border-radius: 5px;
            background: #222831;
        }
        .message {
            display: flex;
            align-items: center;
            margin: 10px 0;
        }
        .user {
            justify-content: flex-end;
        }
        .bot {
            justify-content: flex-start;
        }
        .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin: 0 10px;
        }
        .user .avatar {
            order: 2;
            background: url("avatar.jpg");
            background-size: cover;
        }
        .bot .avatar {
            order: 1;
            background: url("bot.jpg");
            background-size: cover;
        }
        .text {
            max-width: 70%;
            padding: 10px;
            border-radius: 10px;
            font-size: 16px;
            color: white;
        }
        .user .text {
            background: #4a4d52;
        }
        .bot .text {
            background: #8c8c8e;
        }
        .input-section {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        .input {
            flex-grow: 1;
            padding: 10px;
            border: 2px solid #cbcbce;
            border-radius: 5px;
            outline: none;
            font-size: 20px;
        }
        .input:focus {
            border-color: #8296d0;
            color: #1e1f1f;
        }
        .button, .voice-button {
            border: none;
            padding: 10px;
            background: #31363F;
            color: white;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            border-radius: 5px;
            outline: none;
        }
        .button:hover, .voice-button:hover {
            box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
        }
        button i {
            font-size: 1.5rem;
        }
        .chat::-webkit-scrollbar {
            width: 10px;
        }
        .chat::-webkit-scrollbar-thumb {
            background: #bcbdc0;
            border-radius: 10px;
        }
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
</body>
</html>
