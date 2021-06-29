

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
/*
let email ="bobtest.com";
if (validateEmail(email))
	console.log("valid");
else
	console.log("invalid");

*/

function isValidDate(str){
	// STRING FORMAT yyyy-mm-dd
	if(str=="" || str==null){return false;}								
	
	// m[1] is year 'YYYY' * m[2] is month 'MM' * m[3] is day 'DD'					
	var m = str.match(/(\d{4})-(\d{2})-(\d{2})/);
	
	// STR IS NOT FIT m IS NOT OBJECT
	if( m === null || typeof m !== 'object'){return false;}				
	
	// CHECK m TYPE
	if (typeof m !== 'object' && m !== null && m.size!==3){return false;}
				
	var ret = true; //RETURN VALUE						
	var thisYear = new Date().getFullYear(); //YEAR NOW
	var minYear = 1900; //MIN YEAR
	const daysPerMonth = [31,28,31,30,31,30,31,30,31,30,31,31];
	
	// YEAR CHECK
	if( (m[1].length < 4) || m[1] < minYear || m[1] > thisYear){ret = false;}
	// MONTH CHECK			
	const mon = parseInt(m[2])-1;
	let days = daysPerMonth[mon];
	if (mon==1 && leapYear(m[1])) // February, check for leap year
	{
		days=29;
	}
	if( (m[2].length < 2) || m[2] < 1 || m[2] > 12){ret = false;}
	// DAY CHECK
	if( (m[3].length < 2) || m[3] < 1 || m[3] > days){ret = false;}
	
	if (ret)
	{
		let dt = new Date();
		dt.setYear(m[1]);
		dt.setMonth (mon);
		dt.setDate(m[2]);
		//console.log(dt);
		let dt1 = new Date();
		if (dt.getTime()>dt1.getTime())
			return false;
		else
			return true;
	}
	return ret;			
}
function leapYear(year)
{
  return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
}
let dob= "1900-12-31";
if(isValidDate(dob))
	console.log("valid");
else	
	console.log("invalid")

function validateDate(dt)
{
	let parts = dt.split("-");
	if (parts.length != 3)
		return false;
	
	let checkDate = new Date();
	checkDate.setYear (parseInt(parts[0]));
	checkDate.setMonth(parseInt(parts[1])-1);
	checkDate.setDate (parseInt(parts[2]));

	console.log(checkDate);
}

//validateDate(dob);
