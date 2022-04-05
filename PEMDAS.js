
function theMessage(m){
    let m1 = parseInt(m.charAt(m.indexOf("*"))-1);
    let m2 = parseInt(m.charAt(m.indexOf("*"))+1);
    let a1 = parseInt(m.charAt(m.indexOf("+"))-1);
    let a2 = parseInt(m.charAt(m.indexOf("+"))+1);
    let s1 = parseInt(m.charAt(m.indexOf("-"))-1);
    let s2 = parseInt(m.charAt(m.indexOf("-"))+1);
    let d1 = parseInt(m.charAt(m.indexOf("/"))-1);
    let d2 = parseInt(m.charAt(m.indexOf("/"))+1);
    let t = 1;
    
    return t

   
}


console.log(theMessage("4 * 4"))
