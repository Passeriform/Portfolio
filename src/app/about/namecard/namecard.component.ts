import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-namecard',
	templateUrl: './namecard.component.html',
	styleUrls: ['./namecard.component.sass'],
})
export class NamecardComponent implements OnInit {
	@Input() avatarHref;
	@Input() avatarLink;
	@Input() imgUrl;
	@Input() imgAlt;
	@Input() name;
	@Input() description;

	constructor() { }

	ngOnInit() { }
}
