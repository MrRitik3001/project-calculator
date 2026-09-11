let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');


let string = "";
let arr = Array.from(buttons);

arr.forEach(button => {
    button.addEventListener('click', (e) =>{

         const text = button.textContent;
        
        
        // कर्सर की वर्तमान पोजीशन जानें
        let startPos = input.selectionStart;
        let endPos = input.selectionEnd;

         const utterance = new SpeechSynthesisUtterance(text);
           window.speechSynthesis.speak(utterance);
        let clickValue = e.target.innerHTML;


        if (clickValue == '='){
            try {
                // ×, ÷ और % (प्रतिशत) को सही गणितीय कोड में बदलें
                let finalExpression = string
                    .replace(/×/g, '*')
                    .replace(/÷/g, '/')
                    .replace(/%/g, '/100'); // % को /100 में बदलें ताकि 5% -> 0.05 हो सके
                    .replace(/-/g, 'minus');

                string = eval(finalExpression).toString();
                input.value = string;
            } catch (error) {
                input.value = "Error";
                string = "";
            }
        }
        else if (clickValue == 'AC'){
            string = "";
            input.value = string;
        }
        else if (clickValue == 'DEL'){
            // कर्सर के ठीक पीछे वाले अक्षर को डिलीट करने का लॉजिक
            if (startPos > 0) {
                string = string.substring(0, startPos - 1) + string.substring(endPos);
                input.value = string;
                
                // डिलीट करने के बाद कर्सर को सही जगह वापस सेट करें
                setTimeout(() => {
                    input.focus();
                    input.setSelectionRange(startPos - 1, startPos - 1);
                }, 0);
            }
        }
        else {
            // कर्सर की जगह पर नया बटन वैल्यू इन्सर्ट करें
            string = string.substring(0, startPos) + clickValue + string.substring(endPos);
            input.value = string;

            // टाइपिंग के बाद कर्सer की पोजीशन आगे बढ़ाएं
            setTimeout(() => {
                input.focus();
                input.setSelectionRange(startPos + clickValue.length, startPos + clickValue.length);
            }, 0);
        }
    });
});

// जब यूजर कीबोर्ड से सीधे इनपुट बॉक्स में टाइप करे, तो string वेरिएबल को सिंक रखें
input.addEventListener('input', (e) => {
    string = e.target.value;
});




