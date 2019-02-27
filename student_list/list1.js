//window.addEventListener("DOMContentLoaded", init);



const template = document.querySelector("#students").content;
const MaininsertionPoint = document.querySelector("#list");




let arrOfStudents = [];

 let currentFilter;

 let filteredList = [];
let filter;


window.addEventListener("load", ()=> {
	fetch("http://petlatkea.dk/2019/students1991.json").then(res=>res.json()).then(pushToArr);
})



document.querySelector("#gryffindor").addEventListener("click", filterList);
document.querySelector("#hufflepuff").addEventListener("click", filterList);
document.querySelector("#ravenclaw").addEventListener("click", filterList);
document.querySelector("#slytherin").addEventListener("click", filterList);
document.querySelector("#all").addEventListener("click", filterList);


const singleStudent = {
    fullname: "-Student fullname-",
    house: "-Student house-",
    firstname: "-First name-",
    lastname: "-last name-",
    image: "-image-"
}
let house = singleStudent.house;
console.log(house);
//creating the objects with for each so it applies to all of them


function pushToArr(list) {
   // console.table(list);
   //gives only the json response
    list.forEach(singleStudent => {
		let newObject = Object.create(singleStudent);
		


		//object.create method

        const firstSpace = singleStudent.fullname.indexOf(" ");
        const lastSpace = singleStudent.fullname.lastIndexOf(" ");

        //I copy info of each student from the JSON to array
        newObject.fullname = singleStudent.fullname;
        newObject.house = singleStudent.house;
        newObject.firstname = singleStudent.fullname.slice(0, firstSpace);
        newObject.lastname = singleStudent.fullname.slice(lastSpace + 1);
        newObject.image = "images/" + newObject.lastname.toLowerCase() + "_" + singleStudent.fullname.substring(0, 1).toLowerCase() + ".png";

        //I push each student to the array- arrOffStudents:
		arrOfStudents.push(newObject);
		
		//console.log(newObject.firstname);

		//console.log(newObject.image);
		

		arrOfStudents = filteredList;
	}) 

	showStudents(arrOfStudents);
}

//passing the creations to the next function - 
//also foreach that includes a clone
function showStudents(arrOfStudents) {

	arrOfStudents.forEach( singleStudent => {
		const clone = template.cloneNode(true);
	
	clone.querySelector("#name").textContent = singleStudent.firstname;
	clone.querySelector("#surname").textContent = singleStudent.lastname;
	clone.querySelector("#house").textContent = singleStudent.house;
	clone.querySelector("#photo").textContent = singleStudent.image;


	MaininsertionPoint.appendChild(clone)


	})
	


	//console.log(arrOfStudents);


}




function filterList() {


 let currentFilter = this.getAttribute("id");

 //console.log(currentFilter);

	if (currentFilter === "all") {
		showStudents (arrOfStudents);
		filteredList = arrOfStudents;
		
	} else {
		function filterByHouse (singleStudent) {
			return singleStudent.house === currentFilter;
		
		}

		filteredList = arrOfStudents.filter(filterByHouse);
		showStudents(filteredList);
		filterByHouse();
}
}


