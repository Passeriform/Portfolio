import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { FetchService } from '../services/fetch.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  private src = '/config/about-model.json';
  private model: Array<any>;
  private filter: string;
  public selected: any;

  constructor(private route: ActivatedRoute, private router: Router, private fetcher: FetchService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.filter = params.get('subject') || 'passeriform';
    });

    this.fetcher.getResponse(this.src).subscribe(model => {
      this.model = model;
      this.model.map(entry => {
        if (entry.filter === this.filter) {
          this.selected = entry;
        }
      });

      if (this.selected === undefined) {
        this.router.navigate(['/about']);
      }

      if (this.selected.contributors !== undefined) {
        this.selected.contributors.map(contributor => {
          contributor.showToggle = false;
        });
      }
    });
  }

  public showTooltip(contributor): void {
    contributor.showToggle = true;
  }
  public hideTooltip(contributor): void {
    contributor.showToggle = false;
  }
}
