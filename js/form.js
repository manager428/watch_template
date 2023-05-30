var startDate = document.getElementById("startDate");
var endDate = document.getElementById("endDate");
var dateObject = new Date();
var endDateObject;
startDate.valueAsDate = dateObject;
startDate.onchange = function(){
    setForm();
}

var formCategory = 0;
var formCategoryList = ['Category 1', 'Category 2'];
var formPlan = 0;
var formPlanList = [
    ['Plan 1', 'Plan 2', 'Plan 3'],
    ['Plan 4', 'Plan 5', 'Plan 6']
];
var formPlanPrice = [
    [5, 10, 20],
    [10, 15, 30]
]

var formWatch = 0;
var formWatchList = [
    ['Sport 1', 'images/watch1.png', 15],  
    ['Sport 2', 'images/watch2.png', 20],  
    ['Sport 3', 'images/watch3.png', 20],
    ['Sport 4', 'images/watch4.png', 40],  
    ['Sport 5', 'images/watch5.png', 50],  
    ['Sport 6', 'images/watch3.png', 55],    
];
var formBilling = 0;
var formBillingList = ['Monthly', 'Annual'];

function setForm(){
    document.getElementById("formCategory").value = formCategoryList[formCategory];
    var categoryListView = document.getElementById("categoryList");
    categoryListView.innerText = '';
    formCategoryList.forEach(function(element, index){
        var option = document.createElement('div');
        option.innerText = element;
        option.addEventListener('click', function(){
            formCategory = index;
            setForm();
        });
        categoryListView.appendChild(option);
    });

    document.getElementById("formPlan").value = formPlanList[formCategory][formPlan];
    var planListView = document.getElementById("planList");
    planListView.innerText = '';
    formPlanList[formCategory].forEach(function(element, index){
        var option = document.createElement('div');
        option.innerText = element;
        option.addEventListener('click', function(){
            formPlan = index;
            setForm();
        });
        planListView.appendChild(option);
    });

    document.getElementById("formBilling").value = formBillingList[formBilling];
    setEndDate();
    var billingListView = document.getElementById("billingList");
    billingListView.innerText = '';
    formBillingList.forEach(function(element, index){
        var option = document.createElement('div');
        option.innerText = element;
        option.addEventListener('click', function(){
            formBilling = index;
            setForm();
        });
        billingListView.appendChild(option);
    });

    document.getElementById("watchName").innerText = formWatchList[formWatch][0];
    document.getElementById("watchImage").src = formWatchList[formWatch][1];
    var watchListView = document.getElementById("watchList");
    watchListView.innerHTML = '';
    formWatchList.forEach(function(element, index){
        var option = document.createElement('div');
        option.style.display = 'flex';
        option.style.justifyContent = 'space-between';
        option.style.alignItems = 'center';
        var optionName = document.createElement('span');
        optionName.innerText = formWatchList[index][0];
        var optionImage = document.createElement('img');
        optionImage.src = formWatchList[index][1];
        optionImage.height = '40';

        option.appendChild(optionName);
        option.appendChild(optionImage);
        option.addEventListener('click', function(){
            formWatch = index;
            setForm();
        });
        watchListView.appendChild(option);
    });
    
    var totalPrice = formPlanPrice[formCategory][formPlan];
    if(formBilling == 1){
        totalPrice = totalPrice*12;
    }
    document.getElementById("formTotal").value = totalPrice+formWatchList[formWatch][2]+"€";

    var tdone = document.getElementById("form-table-category").getElementsByTagName('td');
    tdone[1].innerText = formCategoryList[formCategory];
    tdone[2].innerText = formPlanList[formCategory][formPlan];
    tdone[5].innerText = totalPrice+"€";

    var tdtwo = document.getElementById("form-table-watch").getElementsByTagName('td');
    tdtwo[1].innerText = formWatchList[formWatch][0];
    tdtwo[2].innerText = 'Starter Plan';
    tdtwo[5].innerText = formWatchList[formWatch][2]+"€";

    closeAllLists();
}
setForm();

var isCategoryListVisible = false;
function toogleCategory(){
    var category = document.getElementById("categoryList");
    if(isCategoryListVisible){
        category.style.display = 'none';
        isCategoryListVisible = false;
    }else{
        category.style.display = 'block';
        isCategoryListVisible = true;
    }
}

var isPlanListVisible = false;
function tooglePlan(){
    var plan = document.getElementById("planList");
    if(isPlanListVisible){
        plan.style.display = 'none';
        isPlanListVisible = false
    }else{
        plan.style.display = 'block';
        isPlanListVisible = true;
    }
}

var isWatchListVisible = false;
function toogleWatch(){
    var watch = document.getElementById("watchList");
    if(isWatchListVisible){
        watch.style.display = 'none';
        isWatchListVisible = false
    }else{
        watch.style.display = 'block';
        isWatchListVisible = true;
    }
}

var isBillingListVisible = false;
function toogleBilling(){
    var billing = document.getElementById("billingList");
    if(isBillingListVisible){
        billing.style.display = 'none';
        isBillingListVisible = false
    }else{
        billing.style.display = 'block';
        isBillingListVisible = true;
    }
}

function closeAllLists(){
    isCategoryListVisible = true;
    toogleCategory();
    isPlanListVisible = true;
    tooglePlan();
    isWatchListVisible = true;
    toogleWatch();
    isBillingListVisible = true;
    toogleBilling();
}

function setEndDate(){
    dateObject = new Date(startDate.value);
    endDateObject = new Date(dateObject.getFullYear(), dateObject.getMonth(), dateObject.getDate());
    if(formBilling == 0){    
        endDateObject.setMonth(endDateObject.getMonth() + 1);
    }else{
        endDateObject.setFullYear(endDateObject.getFullYear() + 1);
    }
    endDate.valueAsDate = endDateObject;
}
