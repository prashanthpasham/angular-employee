import { Component, Input, OnInit, Output ,EventEmitter} from '@angular/core';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  data:any=[{id:101,name:'prashanth1',address:'hyd',salary:3000.25},
  {id:102,name:'prashanth2',address:'hyd1',salary:4500.75}
,{id:103,name:'prashanth3',address:'hyd2',salary:23000}];
  fruits:string[]=["banana","apple","banana"];
  searchTxt:any;
  today: number = Date.now();
  searchFilter:any;
  theme:string='white';
  @Input("message") homeMessage:string=''; 
  @Output() valueChange=new EventEmitter();
  counter:number=0;
  principal:number=100000;
  interest:number=13.5;
  tenure:number=6;
  installments:any[]=[];
   totalEmi=0;
   totalPc=0;
   totalIc=0;
  constructor() { }

  ngOnInit(): void {
    this.emiCalculator();
  }
  trackByName(el:any): string {
    return el.name;
  }
  handleClick(){
    this.counter=this.counter+1;
   this.valueChange.emit(this.counter);
  }
  emiCalculator(){
    this.installments=[];
    let principalAmt = this.principal;
    let r:number= this.interest*0.0008333;
    let x:number = Math.pow(1+r,this.tenure);
    let emi:number = Math.round((principalAmt*r*x)/(x-1));
    console.log("emi>>"+emi);
    let y = (1*(1+r))-emi;
    //let d = principal;
    //let c =1;
    let installment =0;
    let totalValue = emi*this.tenure;
     this.totalEmi=0;
     this.totalPc=0;
     this.totalIc=0;
    var today = new Date(); 
    for(var k=1;k<=this.tenure;k++){
      //let rt = (principal*r*(this.tenure/12))/(100*k);
      let rt:number = parseInt((principalAmt*r).toFixed(0));
       installment +=(emi-rt);
       principalAmt=principalAmt-(emi-rt);
        console.log("Interest Component>>"+installment);
        console.log("Principal component>>"+this.principal);
        this.totalPc=this.totalPc+emi-rt;
        this.totalIc+=rt;
        this.totalEmi+=emi;
        let obj={'date':new Date().setMonth(today.getMonth()+k),'pc':(emi-rt),'ic':rt,'bal':this.principal-installment,'emi':emi};
        this.installments.push(obj);
    }
  
    
  }
}
