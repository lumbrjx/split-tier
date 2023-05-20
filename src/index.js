console.log(
  "M A D E------B Y------C L O G 9\ngithub : https://github.com/CLOG9"
);
// selecting the needed Elements
let bill = document.getElementById("inpts1");
let numOppl = document.querySelector("#inpts2");
let custom = document.querySelector("#inpts3");
let spans = document.querySelectorAll("#spanPer");
let numOppTxt = document.querySelector("#numOppTxt");
let errMsg1 = document.getElementById("errMsg1");
let errMsg2 = document.getElementById("errMsg2");
let perPers1 = document.getElementById("totalRes");
let perPers2 = document.getElementById("tipRes");
let resetBtn = document.getElementById("resetBtn");
// object to store the data to deal with it later
let hh = {
  bill: 0,
  numOfPpl: 0,
  custom: 0,
};
// function to change the style of inputs when they left empty
function changeState(hand, attrr) {
  hand.style.border = "1px solid red";
  attrr.innerHTML = "can't be zero";
  attrr.style.cssText = "color:red ;";
}
// function to change style to the default sass style when the inputs get filled
function changeBack(hand, attrr) {
  hand.style.border = "1px solid transparent";
  attrr.innerHTML = "";
}
// function to get the bill input value from the addEventListener
function returnBill(ev) {
  hh.bill = parseInt(ev);
}
// function to get the number of people input value from the addEventListener
function returnPpl(ev) {
  hh.numOfPpl = parseInt(ev);
}
// function to get the custom and the persentage input value from the addEventListener
function returnCustom(ev) {
  hh.custom = parseInt(ev);
}
// function to calculate the total tip and the total amount for each person
function clacBill() {
  // checking if all the inputs are filled
  if (hh.bill !== 0 && hh.numOfPpl !== 0 && hh.custom !== 0) {
    // calucating the total tip and amount
    const totalres = (hh.bill * hh.custom) / 100;
    const totaltip = totalres / hh.numOfPpl;
    // fixing the results and append them to the html elements
    perPers1.innerHTML = `$${parseFloat(totalres).toFixed(2)}`;
    perPers2.innerHTML = `$${parseFloat(totaltip).toFixed(2)}`;
    // activating the reset button
    resetBtn.removeAttribute("disabled");
    // if any error occured return error in console
    if (totalres === NaN) {
      totalres = 0;
      totaltip = 0;
      console.log("error");
    }
  } else {
    // if any input isn't filled disable the button
    resetBtn.setAttribute("disabled", "");
  }
}
// the bill value event listener
bill.addEventListener("input", () => {
  if (
    // if the value of input is 0 or empty call the changeState function
    bill.value.trim() === "" ||
    bill.value.trim() == "0" ||
    "0".repeat(bill.value.length) === bill.value
  ) {
    changeState(bill, errMsg1);
    bill.value = 0;
  } else {
    // if not call the changeBack function
    changeBack(bill, errMsg1);
  }
  // whenever call the returnBill and clacBill funcs
  returnBill(bill.value);
  clacBill();
});
// the number of people event listener
numOppl.addEventListener("input", () => {
  if (
    // if the value of input is 0 or empty call the changeState function
    numOppl.value.trim() === "" ||
    numOppl.value.trim() == "0" ||
    "0".repeat(numOppl.value.length) === numOppl.value
  ) {
    changeState(numOppl, errMsg2);
    numOppl.value = 0;
  } else {
    // if not call the changeBack function
    changeBack(numOppl, errMsg2);
  }
  // whenever call the returnBill and clacBill funcs
  returnPpl(numOppl.value);
  clacBill();
});
// spans event listener to change state of each span when one of them get selected
spans.forEach((span) => {
  span.addEventListener("click", () => {
    custom.style.border = "1px solid transparent";
    custom.value = "";
    spans.forEach((s) => (s.style.backgroundColor = ""));
    span.style.backgroundColor = "hsl(186, 57%, 60%)";
    // getting the value of the selected span
    hh.custom = parseInt(
      span.textContent.split("").splice(0, 2).join().replace(",", "")
    );
    clacBill();
  });
});
// the same function as the bill and number of people function
custom.addEventListener("input", () => {
  spans.forEach((s) => (s.style.backgroundColor = ""));
  if (
    custom.value.trim() === "" ||
    custom.value.trim() == "0" ||
    "0".repeat(custom.value.length) === custom.value
  ) {
    custom.style.border = "1px solid red";
    custom.value = 0;
  } else {
    custom.style.border = "1px solid transparent";
  }
  returnCustom(custom.value);
  clacBill();
});
// event listener for the button to refresh the page
resetBtn.addEventListener("click", () => {
  location.reload();
});
