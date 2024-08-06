import { Component, Inject, Input, OnInit } from '@angular/core';
import { Gif } from '../../interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-gif-card',
  templateUrl: './gif-card.component.html',
})
export class GifCardComponent implements OnInit{

  @Input()
  public gif!: Gif;

  ngOnInit(): void {
    if ( !this.gif )
      throw new Error('Property gif is required!');
  }

}
