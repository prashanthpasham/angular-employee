import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayFilter'
})
export class ArrayFilterPipe implements PipeTransform {

  transform(value: any[], args:string): any[] {
    if(!args){
     return value;
    }
    args = args.toLowerCase();
   return  value.filter(obj=>{
    let arr:any[] = Object.keys(obj);
    let check = false;
    for(let k=0;k<arr.length;k++){
      let val:any=obj[arr[k]];
      console.log(arr[k]+">>"+val);
     //if(typeof val ==='string' || typeof val ==='number'){
         if(val!=undefined && val.toString().toLowerCase().startsWith(args)){
           check = true;
          break;
         }
            
       //}
    
    };
    return check;
   
  });

}
}
