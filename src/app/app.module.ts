/* eslint import/max-dependencies: [ "error", { "max": 20 } ] */
import { NgModule } from "@angular/core";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { HttpErrorInterceptor } from "@core/interceptors/http-error.interceptor";
import { HeaderModule } from "./header/header.module";
import { FooterModule } from "./footer/footer.module";
import { CoreModule } from "./core/core.module";
import { LoaderModule } from "./loader/loader.module";
import { SharedModule } from "./shared/shared.module";
import { ErrorModule } from "./error/error.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

@NgModule({
	bootstrap: [ AppComponent ],
	declarations: [ AppComponent ],
	imports: [
		AppRoutingModule,
		BrowserModule,
		CoreModule,
		ErrorModule,
		FooterModule,
		FormsModule,
		HeaderModule,
		HttpClientModule,
		LoaderModule,
		SharedModule,
	],
	providers: [
		{
			multi: true,
			provide: HTTP_INTERCEPTORS,
			useClass: HttpErrorInterceptor,
		},
	],
})
export class AppModule { }
