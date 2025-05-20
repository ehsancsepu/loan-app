// script.js
document
    .getElementById("calculate-btn")
    .addEventListener("click", function () {
        document.querySelector('.results').style.display = '';
        document.querySelector('.chart-container').style.display = '';
        const loanAmount = parseFloat(
            document.getElementById("loan-amount").value
        );
        const interestRate = parseFloat(
            document.getElementById("interest-rate").value
        );
        const loanTerm = parseFloat(
            document.getElementById("loan-term").value
        );

        if (
            isNaN(loanAmount) ||
            isNaN(interestRate) ||
            isNaN(loanTerm)
        ) {
            alert("Please fill in all fields with valid numbers.");
            return;
        }

        const monthlyInterestRate = interestRate / 100 / 12;
        const numberOfPayments = loanTerm * 12;

        // Calculate monthly payment
        const monthlyPayment =
            (loanAmount * monthlyInterestRate) /
            (1 -
                Math.pow(
                    1 + monthlyInterestRate,
                    -numberOfPayments
                ));

        // Calculate total amount paid and total interest
        const totalAmount = monthlyPayment * numberOfPayments;
        const totalInterest = totalAmount - loanAmount;

        // Display results
        document.getElementById(
            "monthly-payment"
        ).textContent = `$${monthlyPayment.toFixed(2)}`;
        document.getElementById(
            "total-amount"
        ).textContent = `$${totalAmount.toFixed(2)}`;
        document.getElementById(
            "total-interest"
        ).textContent = `$${totalInterest.toFixed(2)}`;

        // Update pie chart
        updateChart(loanAmount, totalInterest);
    });

function updateChart(principal, interest) {
    const ctx = document
        .getElementById("loan-chart")
        .getContext("2d");
    if (window.loanChart) {
        window.loanChart.destroy();
    }
    window.loanChart = new Chart(ctx, {
        type: "pie",
        data: {
            labels: ["Principal", "Interest"],
            datasets: [
                {
                    data: [principal, interest],
                    backgroundColor: ["#3498db", "#e74c3c"],
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
        },
    });
}