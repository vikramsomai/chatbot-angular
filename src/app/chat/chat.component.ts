import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router'
import { distinct, distinctUntilChanged, interval, Subscription, timer } from 'rxjs';
import { MatDialogModule, MatDialog } from '@angular/material/dialog'
import { DialogComponent } from '../dialog/dialog.component';
@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [FormsModule, JsonPipe, MatDialogModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit, AfterViewInit {
  ele: any
  message: number = 0
  isDuplicate = false;
  currentData: any = 12
  isOpenChat: boolean = false
  chatbotquery: any[] = [
    { name: "what is your name?", options: [], role: 'chat-bot', isValid: false },
    {
      name: "how old are you?", options:
        [{ name: 24, event: open() }, { name: 25, event: open() }, { name: 26, event: open() }], role: 'chat-bot', msg: "if you don't find your age in given option please type", isValid: false
    },
    {
      name: "Can you recommend a good movie?", options:
        [{ name: 'Hollywood' }, { name: 'bollywood' }],
      role: 'chat-bot', isValid: false
    },
    {
      name: "Where are you from?", options:
        [{ name: "surat", event: open() }, { name: "mumbai", event: open() }, { name: "banglore", event: open() }],
      role: 'chat-bot', isValid: false
    },
    {
      name: "What can you do?", options: []
      , role: 'chat-bot', isValid: false
    },
    {
      name: "Tell me a joke", options: [],
      role: 'chat-bot', isValid: false
    },
    {
      name: "How do I reset my password?", options:
        [{ name: "read article", event: open() }, { name: "reset password", event: open() }],
      role: 'chat-bot', isValid: false
    },
    {
      name: "What's your favorite color?", options:
        [{ name: "red" }, { name: "black" }, { name: "blue" }, { name: "green" }],
      role: 'chat-bot', isValid: false
    },


  ]
  newChatBotQuery: any[] = [
    { name: "what is your name?", role: 'chat-bot', isValid: false }
  ]

  botquery = ["What is your name?", "How old are you?", "Where are you from?", "What can you do?", "Tell me a joke", "What's the weather like today?", "Can you help me with something?", "How do I reset my password?", "What's the meaning of life?", "Who is the president of the United States?"
    , "What's your favorite color?", "Do you have any siblings?", "Can you recommend a good movie?", "How do I make a cake?", "What's the capital of France?",
    "What's the population of Tokyo?", "How tall is the Eiffel Tower?"]
  constructor(private route: Router, private dialog: MatDialog) { }

  ngAfterViewInit(): void {
    this.ele = document.getElementById("chat")
  }

  isTyping: boolean = false

  ngOnInit(): void {

  }

  openChatBox() {
    this.isOpenChat == true ? this.isOpenChat = false : this.isOpenChat = true
  }
  previousBotChat() {
    let count = this.message;
    this.newChatBotQuery[count--].active = true
    console.log(this.newChatBotQuery[count--]);

  }
  sendData(data: any) {
    if (this.chatbotquery[this.message] == undefined || this.chatbotquery[this.message] == "undefined") {
      console.log("rgerg");
      this.newChatBotQuery.push({ name: "unable to respond your query", options: [{ name: 'Menu' }], role: "chat-bot", isValid: "true" })

    }

    this.addUserChat(data, this.chatbotquery[this.message].name)
    this.addBotChat()
    this.previousBotChat() //previous bot chat
    console.log(this.newChatBotQuery);

  }
  addBotChat() {
    this.message++;
    let obj = { name: this.chatbotquery[this.message].name, options: this.chatbotquery[this.message].options, role: "chat-bot" }
    this.newChatBotQuery.push(obj)
    if (this.chatbotquery.length < this.message) {
      // this.newChatBotQuery.push({ name: 'unable to understand', options: [{ name: 'Menu' }], role: "chat-bot", isValid: true })
    }

  }

  addUserChat(query: string, question: string) {
    let obj = { name: query, options: [], botMessage: question, role: "chat-me" }
    this.newChatBotQuery.push(obj)
  }

  addMessage(event: any, botMsg: string) {
    let data = event.target.innerText
    let obj = this.newChatBotQuery.find(item => item.botMessage == botMsg)

    let objs = this.newChatBotQuery.find(item => item.isValid == "true")
    console.log(objs);
    if (obj == undefined || obj == 'undefined' || obj == null || objs.isValid == "true") {
      this.newChatBotQuery.push({ name: data, botMessage: botMsg, role: 'chat-me' })
      // this.addBotChat()
      if (data.match("Hollywood")) {
        // this.addUserChat(data, this.chatbotquery[this.message].name)
        this.newChatBotQuery.push({ name: 'select the below option', options: [{ name: 'Action' }, { name: 'Romance' }, { name: 'comics' }], role: 'chat-bot' })
      }
      else if (data.match("Action") || data.match("Romance") || data.match("comics")) {
        this.addBotChat()
      }
      else if (data.match("red") || data.match("blue") || data.match("green") || data.match("black")) {
        this.addBotChat()
      }
      else if (data.match("ok")) {
        this.addBotChat()
      }
      else if (data.match("bollywood")) {
        this.newChatBotQuery.push({ name: 'select the below option', options: [{ name: 'south' }, { name: 'north' }, { name: 'Gujarati' }, { name: "hindi" }], role: 'chat-bot' })
      }
      else if (data.match("south") || data.match("north") || data.match("Gujarati") || data.match("hindi")) {
        this.addBotChat()
      }
      else if (data.match("read article")) {
        let obj = { name: "please flow the instructions provided below \n 1.efef", options: [{ name: 'ok' }], role: "chat-bot" }
        this.newChatBotQuery.push(obj)
      }
      else if (data=="Menu") {
        this.newChatBotQuery.push({
          name: "select any option", options: [
            { name: 'Help' },
            { name: 'services' }, { name: "service 3" }, { name: "service 4" },
            { name: 'plan' }, { name: 'service 1' }, { name: 'service 2' },
            { name: 'repeat' }, { name: "service 5" }, { name: "service 6" }
          ], role: 'chat-bot'
        })
      }
      else if (data.match("help")) {
        this.newChatBotQuery.push({ name: "how can i help you?", role: 'chat-bot' })
      }
      else if (data.match("services")) {
        this.newChatBotQuery.push({ name: "what service can i bring for you?", options: [{ name: 'api sevrice' }, { name: 'domain' }, { name: "database" }], role: "chat-bot" })
      }
      else {
        this.addBotChat()
      }
    }
  }


  showAllData() {
    this.isTyping = true
  }
  menu() {
    this.newChatBotQuery.push({
      name: "select any option", options: [
        { name: 'Help'},
        { name: 'services' }, { name: "service 3" }, { name: "service 4" },
        { name: 'plan' }, { name: 'service 1' }, { name: 'service 2' },
        { name: 'repeat' }, { name: "service 5" }, { name: "service 6" }
      ], role: 'chat-bot',isValid:true
    })}
}






