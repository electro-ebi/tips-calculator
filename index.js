// index.js
var billAmount = 0;
var noOfPeople = 0;
var tipPerValue = 0;

function Bill(inputBill) {
  billAmount = inputBill;
}

function People(inputNoOfPeople) {
  if (inputNoOfPeople == 0) {
    $("#error").removeClass("hidden");
    $("#people-main-div").addClass("border-red-500");
    $("#people-main-div").removeClass("hover:border-strongcyan");
  } else {
    $("#error").addClass("hidden");
    $("#people-main-div").removeClass("border-red-500");
    $("#people-main-div").addClass("hover:border-strongcyan");
  }
  noOfPeople = inputNoOfPeople;
}

$("#bill").on("input", function () {
  Bill($(this).val());
  calculateTipAmount();
});

$(".tipBtn").on("click", function () {
  var tipBtnId = $(this).attr("id");
  $(".tipBtn").removeClass("bg-strongcyan rounded-[5px]");

  $(this).addClass("bg-strongcyan rounded-[5px]");

  var tipPercentage = parseInt(tipBtnId.slice(3)) / 100;
  tipPerValue = tipPercentage;
  calculateTipAmount();
});

$("#tip-custom").on("input", function () {
  var inputCustomTip = $(this).val();
  tipPerValue = inputCustomTip / 100;
  calculateTipAmount();
});
$("#custonBtn").on("click", function () {
  $(".tipBtn").removeClass("bg-strongcyan rounded-[5px]");
});
$("#people").on("input", function () {
  var inputValue = $(this).val();
  $(this).val(inputValue.replace(/[^0-9]/g, ""));

  if (inputValue.trim() === "") {
    $("#error").addClass("hidden");
    $("#people-main-div").removeClass("border-red-500");
    $("#people-main-div").addClass("hover:border-strongcyan");
  } else {
    People(inputValue);
    calculateTipAmount();
  }
});

function calculateTipAmount() {
  var billForPerPerson = billAmount / noOfPeople;
  var tipAmount = +(billForPerPerson * tipPerValue).toFixed(2);
  var total = +(billForPerPerson + billForPerPerson * tipPerValue).toFixed(2);
  console.log(noOfPeople);
  // Check if all values are entered
  $("#resetBtn").prop("disabled", true);
  $("#resetBtn").addClass("opacity-25");
  $("#resetBtn").removeClass("hover:bg-strongcyan");
  $("#tip-amount-h").text("$0.00");
  $("#total-amount-h").text("$0.00");

  if (tipAmount.toString().length >= 9) {
    $("#tip-amount-h").addClass("text-[1.5rem]");
  } else {
    $("#tip-amount-h").removeClass("text-[1.5rem]");
  }
  if (total.toString().length >= 10) {
    $("#total-amount-h").addClass("text-[1.5rem]");
  } else {
    $("#total-amount-h").removeClass("text-[1.5rem]");
  }

  $("#bill").on("input", function () {
    var inputValue = $(this).val();
    if (inputValue.length > 10) {
      $(this).val(inputValue.slice(0, 10));
    }
  });
  $("#people").on("input", function () {
    var inputValue = $(this).val();
    if (inputValue.length > 5) {
      $(this).val(inputValue.slice(0, 5));
    }
  });

  $("#tip-custom").on("input", function () {
    var maxValue = 100;
    var inputValue = $(this).val();
    if (inputValue > maxValue) {
      $(this).val(maxValue);
    }
  });

  if (billAmount && noOfPeople && tipPerValue && noOfPeople != 0) {
    $("#tip-amount-h").text(tipAmount);
    $("#total-amount-h").text(total);
    console.log("pre");
    $("#resetBtn").prop("disabled", false);

    $("#resetBtn").removeClass("opacity-25");
    $("#resetBtn").addClass("hover:bg-strongcyan");
    $("#people-main-div").addClass("hover:border-strongcyan");
  }
}

$("#resetBtn").on("click", function () {
  $("#resetBtn").addClass("opacity-25");
  $("#resetBtn").removeClass("hover:bg-strongcyan");
  $("input").val("");
  $(".tipBtn").removeClass("bg-strongcyan rounded-[5px]");
  $("#tip-amount-h").text("$0.00");
  $("#total-amount-h").text("$0.00");
  $("#resetBtn").prop("disabled", true);
  billAmount = 0;
  noOfPeople = 0;
  tipPerValue = 0;
  tipAmount = 0;
  total = 0;
});
