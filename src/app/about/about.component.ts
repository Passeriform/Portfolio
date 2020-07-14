import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { FetchService } from '../services/fetch.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.sass']
})
export class AboutComponent implements OnInit {
  private model: any;
  private subject: string;

  constructor(private route: ActivatedRoute, private router: Router, private fetcher: FetchService) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.subject = params.get('subject') || 'passeriform';
    });

    this.fetcher.getResponse(`https://passeriform-portfolio-api.herokuapp.com/about/${this.subject}`).subscribe(model => {
      this.model = model;

      if (this.model === undefined) {
        this.router.navigate(['/about']);
      }

      if (this.model.contributors !== undefined) {
        this.model.contributors.map(contributor => {
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
