import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ideal';

  ngOnInit() {
    console.log('Hello world!');

    document.getElementById('title').style.color = '#73F7DD';
  }
}

