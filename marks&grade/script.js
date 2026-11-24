
function calculate() {

    let a = Number(document.getElementById("m1").value);
    let b = Number(document.getElementById("m2").value);
    let c = Number(document.getElementById("m3").value);

    let total = a + b + c;
    let percentage = total / 3;
    let grade;

    if (a < 35 || b < 35 || c < 35) {
        grade = "Fail";
    }
    else if (percentage >= 90) {
        grade = "A";
    }
    else if (percentage >= 75) {
        grade = "B";
    }
    else if (percentage >= 60) {
        grade = "C";
    }
    else {
        grade = "D";
    }

    document.getElementById("result").innerHTML =
        "Total: " + total +
        "<br>Percentage: " + percentage.toFixed(2) + "%" +
        "<br>Grade: " + grade;
}
