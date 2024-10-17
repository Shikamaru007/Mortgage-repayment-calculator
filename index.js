const clearBtn = document.getElementById("clearBtn");
const resultDisplay = document.getElementById("second");
const amountInput = document.getElementById("mortgageAmount");
const termInput = document.getElementById("mortgageTerm");
const rateInput = document.getElementById("mortgageRate");
const calculateBtn = document.getElementById("calculateBtn");



// Function to calculate the mortgage based on the type selected.
calculateBtn.onclick = function(){
    
    const amount = parseFloat(amountInput.value);
    const term = parseFloat(termInput.value);
    const rate = parseFloat(rateInput.value);
    const selectedMortgageType = document.querySelector("input[name=mortgageType]:checked");

    // Validate each input fields.
    if(isNaN(amount)){
        amountInput.parentElement.classList.add("error");
    }else{
        amountInput.parentElement.classList.remove("error");
    }

    if(isNaN(term)){
        termInput.parentElement.classList.add("error");
    }else {
        termInput.parentElement.classList.remove("error");
    }

    if(isNaN(rate)){
        rateInput.parentElement.classList.add("error");
    }else {
        rateInput.parentElement.classList.remove("error");
    }

    if(!selectedMortgageType){
        document.querySelector(".mortgageType").classList.add("error");
    }else {
        document.querySelector(".mortgageType").classList.remove("error");
    }

    // Calculate the monthly payments and the total payments.
    let monthlyPayment;
    const interestPerMonth = rate / 100 / 12;
    const numberOfPayments = term * 12;

    if(selectedMortgageType.value === "repayment"){
        monthlyPayment = amount * (interestPerMonth * Math.pow(1 + interestPerMonth, numberOfPayments)) / (Math.pow((1 + interestPerMonth), numberOfPayments) - 1);
    }else {
        monthlyPayment = amount * interestPerMonth;
    }

    const totalRepayment = monthlyPayment * numberOfPayments;


    // To display the monthly payment annd total payments.
    document.getElementById("monthlyRepayment").textContent = `${monthlyPayment.toLocaleString('en-GB', {
                                                                                                        style: 'currency',
                                                                                                        currency: 'GBP',
                                                                                                        minimumFractionDigits: 2,
                                                                                                        maximumFractionDigits: 2
                                                                                                        })}`;
    document.getElementById("totalRepayments").textContent = `${totalRepayment.toLocaleString('en-GB', {
                                                                                                        style: 'currency',
                                                                                                        currency: 'GBP',
                                                                                                        minimumFractionDigits: 2,
                                                                                                        maximumFractionDigits: 2
                                                                                                        })}`;

    // To toggle between the empty display abd the result display when the calculate button is clicked.
    if(isNaN(amount) || isNaN(term) || isNaN(rate) || !selectedMortgageType){
        resultDisplay.classList.remove("showResult");
    }else {
        resultDisplay.classList.add("showResult");
    }

}

// To style the radio box containers accordingly when a target is clicked and removes it from the other.
document.querySelectorAll("#selectCase").forEach(item => {
    item.addEventListener("click", () => {
        document.querySelectorAll("#selectCase").forEach(box => {
            box.classList.remove("selected")
        })
        document.querySelectorAll("input[name=mortgageType]").checked = false;
        item.querySelector("input[name=mortgageType]").checked = true;
        item.classList.add("selected");
    })
})

// Function to clear the page inputs when clear button is clicked
clearBtn.addEventListener("click", () => {
    amountInput.value = "";
    termInput.value = "";
    rateInput.value = "";
    document.querySelectorAll("div").forEach(block => {block.classList.remove("error")});
    resultDisplay.classList.remove("showResult");
    document.querySelector("input[name=mortgageType]").checked = false;
    document.querySelectorAll("#selectCase").forEach(item => {item.classList.remove("selected")})
})





