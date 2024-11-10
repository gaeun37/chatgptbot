//DOMContentLoaded 이벤트 사용 => DOM이 완전히 로드된 후에 JS코드가 실행


document.addEventListener('DOMContentLoaded', function(){
    const chatLog = document.getElementById('chat-log'),
        userInput = document.getElementById('user-input'),
        sendbutton = document.getElementById('send-button'),
        buttonIcon = document.getElementById('button-icon'),
        info = document.querySelector('.info');

sendbutton.addEventListener('click', sendMessage);

userInput.addEventListener('keydown',(event)=>{
    if(event.key==='Enter') {
        sendMessage();
    }
});


async function sendMessage() {
    const message=userInput.value.trim();

    if(message ==='') {
        return
    }

    appendMessage('user',message);
    userInput.value='';
    const U = "";
    const K = "";

    const options={
        method: 'POST',
        headers: {
	    'content-type': 'application/json',
	    Authorization: `Bearer ${K}`,
        },
        body: JSON.stringify({
	        model: "gpt-3.5-turbo",
	        messages: [{ role: "user", content: message }],
	        max_tokens: 100,
            })
    };
    
    try {
        const response = await fetch(U, options);
        const data=await response.json();
        console.log(data);
        appendMessage('bot',data);
        buttonIcon.classList.add('fa-solid','fa-paper-plane');
        buttonIcon.classList.remove('fas','fa-spinner','fa-pulse');
        
    } catch(error) {
        console.error("Error: ",error);
        appendMessage('bot',`Error: ${error}`);
    }
}

function appendMessage(sender, message) {
    info.style.display = 'none';
    buttonIcon.classList.add('fas','fa-spinner','fa-pulse');
    buttonIcon.classList.remove('fa-solid','fa-paper-plane');

    const chatElement = document.createElement('div');  //전체 채팅박스
    const messageElement = document.createElement('div'); //채팅 텍스트가 들어갈 박스
    const iconElement = document.createElement('div'); //사용자/봇아이콘이 들어감
    const icon = document.createElement('i'); //사용자/봇 아이콘

    chatElement.classList.add('chat-box');
    iconElement.classList.add('icon');
    messageElement.classList.add(sender); //전송자가 사용자인지 봇인지 명시

    messageElement.innerText = message; //메시지를 채팅 텍스트에 들어가도록 설정
    
    if(sender === 'user') {
        icon.classList.add('fa-regular','fa-user');
        iconElement.setAttribute('id','user-icon'); //아이디를 #user-icon으로 설정
    } else {
        icon.classList.add('fa-solid','fa-robot');
        iconElement.setAttribute('id','bot-icon');
    }

    //정의한 Node를 트리에 연결
    iconElement.appendChild(icon);  //아이콘 박스에 icon추가
    chatElement.append(iconElement); //전체 채팅 박스에 아이콘 박스 추가
    chatElement.appendChild(messageElement); //전체 채팅 박스에 채팅 텍스트박스 추가
    chatLog.appendChild(chatElement);//모든거 추가

}
}
);


const chatLog = document.getElementById('chat-log'),
    userInput = document.getElementById('user-input'),
    sendbutton = document.getElementById('send-button'),
    buttonIcon = document.getElementById('button-icon'),
    info = document.querySelector('info');

sendbutton.addEventListener('click', sendMessage);

function sendMessage() {
    //1. 받아온 값 저장하기:trim()
    const message = userInput.value.trim();
    //2. 공백만 입력받았을 때 send하지 않기
    if (message === '') {
        return
    } else {
        appendMessage('user',message);
        setTimeout(() => {
            appendMessage('bot','안녕하세요!\n');
            buttonIcon.classList.add('fa-solid','fa-paper-plane');
            buttonIcon.classList.remove('fas','fa-spinner','fa-pulse');
        },1000);
        return
    }
    //3. 사용자가 입력한 messge 화면에 띄우기(container)
}

function appendMessage(sender, message) {
    info.style.display = 'none';
    buttonIcon.classList.add('fas','fa-spinner','fa-pulse');
    buttonIcon.classList.remove('fa-solid','fa-paper-plane');

    const chatElement = document.createElement('div');  //전체 채팅박스
    const messageElement = document.createElement('div'); //채팅 텍스트가 들어갈 박스
    const iconElement = document.createElement('div'); //사용자/봇아이콘이 들어감
    const icon = document.createElement('i'); //사용자/봇 아이콘

    chatElement.classList.add('chat-box');
    iconElement.classList.add('icon');
    messageElement.classList.add(sender); //전송자가 사용자인지 봇인지 명시

    messageElement.innerText = message; //메시지를 채팅 텍스트에 들어가도록 설정
    
    if(sender === 'user') {
        icon.classList.add('fa-regular','fa-user');
        iconElement.setAttribute('id','user-icon'); //아이디를 #user-icon으로 설정
    } else {
        icon.classList.add('fa-solid','fa-robot');
        iconElement.setAttribute('id','bot-icon');
    }

    //정의한 Node를 트리에 연결
    iconElement.appendChild(icon);  //아이콘 박스에 icon추가
    chatElement.append(iconElement); //전체 채팅 박스에 아이콘 박스 추가
    chatElement.appendChild(messageElement); //전체 채팅 박스에 채팅 텍스트박스 추가
    chatLog.appendChild(chatElement);//모든거 추가

}