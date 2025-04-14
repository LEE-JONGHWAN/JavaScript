//1. 박스 2개 만들기
//2. 드랍다운 리스트 만들기 ok
//3. 환율정보 들고오기 ok
//4. 드랍다운 리스트에서 아이템 선택하면 아이템이 바뀜
//5. 금액을 입력하면 환전이 된다
//6. 드랍다운 리스트에서 아이템을 선택하면 다시 그 단위 기준으로 환전이 됨 ok
//7. 숫자를 한국어로 읽는법 표시
//8. 반대로 밑에 박스에서 숫자를 바꿔도 위에 박스에 환율이 적용이 된다~!

// let으로 변수 선언 오른쪽 이름명
let currencyRatio = {
  USD: {
    KRW: 1425.26,
    USD: 1,
    VND: 25831.5,
    unit: "달러",
  },
  KRW: {
    USD: 0.0007,
    VND: 18.12,
    KRW: 1,
    unit: "원",
  },
  VND: {
    USD: 0.000039,
    KRW: 0.055,
    VND: 1,
    unit: "동",
  },
};
// 1.금액표시 위한 설정
var unitWords = ["", "만", "억", "조", "경"];
var splitUnit = 10000;
let toButton = document.getElementById("to-button");
let fromButton = document.getElementById("from-button");
// 1.변수를 지정해준다.
let fromCurrency = "USD";
let toCurrency = "USD";

// 1.console.log(currencyRatio.VND.unit);
// 2.console.log(currencyRatio['VND'][unit])
document.querySelectorAll("#from-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    // 1.버튼을 가져온다.
    // 2.버튼에 값을 바꾼다.
    document.getElementById("from-button").textContent = this.textContent;
    // 3.선택된 currency값을 변수에 저장해준다.
    fromCurrency = this.textContent;
    //console.log("fromcurrency는", fromCurrency);
    convert();
  })
);

document.querySelectorAll("#to-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    // 1.버튼을 가져온다.
    // 2.버튼에 값을 바꾼다.
    document.getElementById("to-button").textContent = this.textContent;
    // 3.선택된 currency값을 변수에 저장해준다.
    toCurrency = this.textContent;
    //console.log("tocurrency는", toCurrency);
    convert();
  })
);

// 1.키를 입력하는 순간
// 2.환전이 되서
// 3.환전된 값이 보인다.
function convert(type) {
  //1.환전
  //2.얼마를 환전? 가지고 있는 돈이 뭔지, 바꾸고자하는 돈이 뭔지
  //3.돈 * 환율 = 환전금액
  console.log("here");
  let amount = 0;

  if (type == "from") {
    //입력값 받기
    amount = document.getElementById("from-input").value;
    //환전하기
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
    //환전한값 보여주기
    document.getElementById("to-input").value = convertedAmount;
    //환전한값 한국어로로
    renderKoreanNumber(amount, convertedAmount);
  } else {
    amount = document.getElementById("to-input").value;
    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
    document.getElementById("from-input").value = convertedAmount;
    renderKoreanNumber(convertedAmount, amount);
  }
}

function renderKoreanNumber(from, to) {
  document.getElementById("fromNumToKorea").textContent =
    readNum(from) + currencyRatio[fromCurrency].unit;
  document.getElementById("toNumToKorea").textContent =
    readNum(to) + currencyRatio[toCurrency].unit;
};

function readNum(num) {
  let resultString = "";
  let resultArray = [];
  for (let i = 0; i < unitWords.length; i++) {
    let unitResult =
      (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
    unitResult = Math.floor(unitResult);
    if (unitResult > 0) {
      resultArray[i] = unitResult;
    }
  }
  for (let i = 0; i < resultArray.length; i++) {
    if (!resultArray[i]) continue;
    resultString = String(resultArray[i]) + unitWords[i] + resultString;
  }
  return resultString;
};
