

const user_inputs = document.querySelectorAll('.my_input');

console.log(document.querySelectorAll('body'))
console.log(user_inputs)
let numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
let moves_counter = 0;
let minutes = 0;
let seconds = 0;

function input_validator() {
    // console.log("Validator function called");

    let conf_button = document.getElementById("confirmation-button");
    let input_1_text = document.getElementById("input_1").value;
    let input_2_text = document.getElementById("input_2").value;
    let input_3_text = document.getElementById("input_3").value;
    let input_4_text = document.getElementById("input_4").value;
    
    
    if ((input_1_text != "" && input_2_text != "" &&
    input_3_text != "" && input_4_text != "") &&
    (input_1_text !== input_2_text && input_1_text !==
    input_3_text && input_1_text !== input_4_text &&
    input_2_text !== input_3_text && input_2_text !== input_4_text && input_3_text !== input_4_text)) {
    
        conf_button.disabled = false;
        conf_button.innerHTML = "Submit your guess!"

    } else {
        conf_button.disabled = true;
        conf_button.innerHTML = "Enter right numbers!"
    }
}


function number_restriction(event) {
    const inputValue = event.target.value;
    const filteredValue = inputValue.replace(/\D/g, '');

    console.log('call', inputValue)
    if (inputValue !== filteredValue) {
        event.target.value = filteredValue;

        console.log("right")
    } else if (inputValue === "Backspace" || inputValue === "Delete"){
        console.log("backspace or delete pressed")
        pass;
    } else { // DOES THIS WHEN USER PUT RIGHT SYMBOL
        // console.log("wrong")
        // console.log(this.id)

        switch (this.id) {
            case "input_1": // from 1 to 2
                document.getElementById("input_2").focus();
                break;
            case "input_2": // from 1 to 2
                document.getElementById("input_3").focus();
                break;
            case "input_3": // from 1 to 2
                document.getElementById("input_4").focus();
                break;
            default:
                break;
        }
        input_validator()
    }

}


user_inputs.forEach(function (input) {
    input.addEventListener('input', number_restriction);
});

function random_number_generator() {
    let rand_number = "";

    let rand_index = Math.floor(Math.random() * 10);
    rand_number += numbers[rand_index];
    numbers.splice(rand_index, 1);
    
    rand_index = Math.floor(Math.random() * 9);
    rand_number += numbers[rand_index];
    numbers.splice(rand_index, 1);
    
    rand_index = Math.floor(Math.random() * 8);
    rand_number += numbers[rand_index];
    numbers.splice(rand_index, 1);
    
    rand_index = Math.floor(Math.random() * 7);
    rand_number += numbers[rand_index];
    numbers.splice(rand_index, 1);
    
    


    console.log(rand_number, numbers);
    return rand_number;
}

function check_function(guess, rand_number){
    console.log("HELLO from generator func")
    let cows = 0;
    let bulls = 0;
    
    if ( rand_number.includes(guess[0]) & rand_number[0] == guess[0] ){
        bulls += 1;
    } else if ( rand_number.includes(guess[0]) ) {
        cows += 1;
    } else {

    }

    
    if ( rand_number.includes(guess[1]) & rand_number[1] == guess[1] ){
        bulls += 1;
    } else if ( rand_number.includes(guess[1]) ) {
        cows += 1;
    } else {
        
    }
    
    
    if ( rand_number.includes(guess[2]) & rand_number[2] == guess[2] ){
        bulls += 1;
    } else if ( rand_number.includes(guess[2]) ) {
        cows += 1;
    } else {
        
    }
    
    
    if ( rand_number.includes(guess[3]) & rand_number[3] == guess[3] ){
        bulls += 1;
    } else if ( rand_number.includes(guess[3]) ) {
        cows += 1;
    } else {
        
    }
        
    console.log(cows, bulls)    

    let cows_t = cows.toString();
    let bulls_t = bulls.toString();
    result = cows_t + bulls_t;

    return result;
}

function user_input_getter(){
    let user_guess = '';
    user_guess += document.getElementById("input_1").value;
    user_guess += document.getElementById("input_2").value;
    user_guess += document.getElementById("input_3").value;
    user_guess += document.getElementById("input_4").value;
    console.log(user_guess)
    return user_guess;
}

let my_random_number = random_number_generator();

function moves_displayer() {
    moves_counter += 1;
    console.log(moves_counter);
    let c = document.getElementById("id_moves_counter");
    console.log(c);
    if (moves_counter == 1){
        c.innerHTML = moves_counter + " move";
    } else {
        c.innerHTML = moves_counter + " moves";
    }
}

function go_time() {
    console.log(seconds);
    seconds++;
    if (seconds == 60) {
        seconds = 0;
        minutes++;
    }
    let time_elem = document.getElementById("shower");


    let temp_sec, temp_min;




    if (seconds < 10) {
        temp_sec = "0" + seconds;
    } else {
        temp_sec = seconds;
    }
    if (minutes < 10) {
        temp_min = "0" + minutes;
    } else {
        temp_min = minutes;
    }
    time_elem.innerHTML = temp_min + ":" + temp_sec;

}

function stopWatch_starter() {
    
    let my_timer = setInterval(go_time, 1000);
    
    return my_timer
}

function stopWatch_ender(timer) {
    clearInterval(timer);
}

function do_everything() {
    if (moves_counter == 0) {
        timer = stopWatch_starter();
    }
    // console.log("HELLO from do everything func")
    let user_guess_var = user_input_getter();
    let result = check_function(user_guess_var, my_random_number);
    numbers_text_creation(user_guess_var);
    user_result_text_creation(result);
    moves_displayer();
    if(result == "04"){ // HERE WE DETECT WIN
        console.log("you won");
        stopWatch_ender(timer);
        win_message();

    }
    input_cleaner();
    input_validator();
}

function numbers_text_creation(guess) {
    let n1 = document.createElement("span"); // n1 - first number of users guess
    n1.className = "users_guess_number";
    n1.innerHTML = guess[0]

    let n2 = document.createElement("span"); // n1 - first number of users guess
    n2.className = "users_guess_number";
    n2.innerHTML = guess[1]

    let n3 = document.createElement("span"); // n1 - first number of users guess
    n3.className = "users_guess_number";
    n3.innerHTML = guess[2]

    let n4 = document.createElement("span"); // n1 - first number of users guess
    n4.className = "users_guess_number";
    n4.innerHTML = guess[3]
    
    let numbers_container = document.getElementById("container");
    let my_div = document.createElement("div");
    my_div.appendChild(n1);
    my_div.appendChild(n2);
    my_div.appendChild(n3);
    my_div.appendChild(n4);

    numbers_container.appendChild(my_div)
}

function user_result_text_creation(result) {
    let n1 = document.createElement("span");
    n1.className = "users_result_number";
    n1.innerHTML = result[0];

    let n2 = document.createElement("span");
    n2.className = "users_result_number";
    n2.innerHTML = result[1];


    let result_container = document.getElementById("result_container");
    let my_div = document.createElement("div");

    my_div.appendChild(n1);
    my_div.appendChild(n2);

    result_container.appendChild(my_div);
}

function input_cleaner() {
    document.getElementById("input_1").value = '';
    document.getElementById("input_2").value = '';
    document.getElementById("input_3").value = '';
    document.getElementById("input_4").value = '';
    document.getElementById("input_1").focus();
}
// Получаем ссылку на элемент body
const body = document.body;

// Обрабатываем событие нажатия клавиши
body.addEventListener('keydown', function(event) {
    // Используем свойство key для определения нажатой клавиши
    switch (event.key) {
        case 'ArrowLeft':
            // Ваш код для реакции на стрелку влево
            console.log("Left arrow");

            switch (document.activeElement.id) {
                case "input_4":
                    document.getElementById("input_3").focus();
                    break;
                case "input_3":
                    document.getElementById("input_2").focus();
                    break;
                case "input_2":
                    document.getElementById("input_1").focus();
                    break;
                case "input_1":
                    document.getElementById("input_4").focus();
                    break;
                default:
                    break;
            }


            break;
            
            case 'ArrowRight':
                // Ваш код для реакции на стрелку вправо
                console.log("Right arrow");
            
            switch (document.activeElement.id) {
                case "input_1":
                    document.getElementById("input_2").focus();
                    break;
                case "input_2":
                    document.getElementById("input_3").focus();
                    break;
                case "input_3":
                    document.getElementById("input_4").focus();
                    break;
                case "input_4":
                    document.getElementById("input_1").focus();
                    break;
                default:
                    break;
            }
            break;
    }
});

function win_message(){
    const body = document.getElementById("body");
    let background_black = document.createElement('div');
    let mess_holder = document.createElement('div');
    let text1 = document.createElement('p');
    let text2 = document.createElement('p');
    let text3 = document.createElement('p');
    let text4 = document.createElement('p');


    mess_holder.className = "win_mess_div";
    text1.className = "win_text1";
    text2.className = "win_text2";
    text3.className = "win_text3";
    text4.className = "win_text4";
    background_black.className = "win_background";

    text1.innerHTML = "Congratulations!";
    
    text2.innerHTML = "You won!";

    text3.innerHTML = "It took you:";

    text4.innerHTML = minutes.toString() + ":" + seconds.toString() + " and " + moves_counter +" moves";


    
    mess_holder.appendChild(text1);
    mess_holder.appendChild(text2);
    mess_holder.appendChild(text3);
    mess_holder.appendChild(text4);
    body.appendChild(mess_holder);

    body.appendChild(background_black);

}


function page_reload() {
    location.reload();
}