import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './header/header.module';
import { CoreModule } from './core/core.module';
import { LandingModule } from './landing/landing.module';
import { WorkModule } from './work/work.module';
import { AboutModule } from './about/about.module';
import { SharedModule } from './shared/shared.module';
import { ErrorModule } from './error/error.module';

import { HttpErrorInterceptor } from '@app/core/interceptors/http-error.interceptor';

@NgModule({
	imports: [
		FormsModule,
		BrowserModule,
		HttpClientModule,

		AppRoutingModule,
		HeaderModule,
		CoreModule,
		LandingModule,
		WorkModule,
		AboutModule,
		SharedModule,
		ErrorModule,
	],
	declarations: [AppComponent],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule { }
