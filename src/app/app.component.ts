import { Component, Input,OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  public userName : string = "usuário";
  public password : string = "senha";
  public categories: any;
  public products: any;

  constructor(private http: HttpClient){

  }

  generateToken(){
    this.http.post<any>("http://localhost:4200/api/authenticate",
    {
      "username":this.userName,
      "password":this.password
    }).subscribe(data=>{

      console.log("Realizando Login...")

      let token:string = data.token;
      localStorage.setItem('tokenNtt',data.token);

      this.loadData();
    });
  }

  ngOnInit() {
    this.loadData();
  }

  getHeader(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('tokenNtt')}`
    });

    const requestOptions = { headers: headers };

    return requestOptions;
  }

  loadData(){
    this.http.get<any>("http://localhost:4200/api/api/categories",this.getHeader()).subscribe(data=>{
      this.categories=data;
    })

    this.http.get<any>("http://localhost:4200/api/api/products",this.getHeader()).subscribe(data=>{
      this.products=data;
    })
  }

}
