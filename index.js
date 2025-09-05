const init=()=>{
  const pathname=window?.location?.pathname || "index.html";
  if(pathname.includes('login')){
    let isLoggedIn=localStorage.getItem('loggedIn');
    console.log(pathname,isLoggedIn);
    if(isLoggedIn=='true'){
      window.location.href='/index.html';
    }
  }else if(pathname.includes('index') || pathname.includes('products') || pathname.includes('users')){
    let isLoggedIn=localStorage.getItem('loggedIn');
    if(isLoggedIn=='false'){
      window.location.href='/login.html';
    }
    if(pathname.includes('index')){
      fetchOrderList();
    }else if(pathname.includes('products')){
      fetchProductList();
    }else if(pathname.includes('users')){
      fetchUserList();
    }
  }
};

const handleLogin=()=>{
  const username=document.getElementById('username')?.value || "";
  const password=document.getElementById('password')?.value || "";
  console.log(password);
  if(username !== password){
    alert('Please enter valid credentials!');
  }else{
    alert('Login Successful');
    localStorage.setItem('loggedIn',true);
    window.location.href='/index.html';
  }
}

const handleLogout=()=>{
  localStorage.setItem('loggedIn',false);
  setTimeout(()=>{
    window.location.href='/login.html';
  },[1000]);
}

const fetchOrderList=async(filterType="")=>{
  if(filterType){
    let filterItems=document.querySelectorAll('.filter-item');
    filterItems.forEach(item=>{
      if(item?.innerText===filterType){
        item.classList.toggle('active');
      }
    });
  }
  let activeList=[];
  let newFilterItems=document.querySelectorAll('.filter-item.active');
  newFilterItems.forEach(item=>{
    activeList.push(item?.innerText);
  });
  let res= await fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/orders');
  if(res.ok){
    const resJson = await res.json();
    let list=resJson || [];
    list=list.filter(item=>activeList.includes(item.orderStatus));
    let table=document.getElementById('orders-table');
    let tableBody=table.getElementsByTagName('tbody')[0];
    tableBody.innerHTML="";
    list.forEach(item=>{
      var row = tableBody.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      cell1.innerHTML = item.id;
      cell2.innerHTML = item.customerName;
      cell3.innerHTML = item.orderDate+"\n"+item.orderTime;
      cell4.innerHTML = "$"+item.amount;
      cell5.innerHTML = item.orderStatus;
    });
    let count=document.getElementById('list-count');
    count.innerHTML=list?.length || 0;
  }
}

const fetchProductList=async(filterType="")=>{
  if(filterType){
    let filterItems=document.querySelectorAll('.filter-item');
    filterItems.forEach(item=>{
      if(item?.innerText===filterType){
        item.classList.toggle('active');
      }
    });
  }
  let activeList=[];
  let newFilterItems=document.querySelectorAll('.filter-item.active');
  newFilterItems.forEach(item=>{
    activeList.push(item?.innerText);
  });
  let res= await fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/products');
  if(res.ok){
    const resJson = await res.json();
    let list=resJson || [];
    if(!activeList.includes('Low Stock')){
      list=list.filter(item=>item?.stock>100);
    }
    if(!activeList.includes('Expired')){
      list=list.filter(item=>new Date(item.expiryDate)>new Date());
    }
    let table=document.getElementById('products-table');
    let tableBody=table.getElementsByTagName('tbody')[0];
    tableBody.innerHTML="";
    list.forEach(item=>{
      var row = tableBody.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      cell1.innerHTML = item.id;
      cell2.innerHTML = item.medicineName;
      cell3.innerHTML = item.medicineBrand;
      cell4.innerHTML = item.expiryDate;
      cell5.innerHTML = "$"+item.unitPrice;
      cell6.innerHTML = item?.stock || 0;
    });
    let count=document.getElementById('list-count');
    count.innerHTML=list?.length || 0;
  }
}

const fetchUserList=async()=>{
  let sT=document.getElementById('search-text');
  sT.value="";
  let res= await fetch('https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users');
  if(res.ok){
    const resJson = await res.json();
    let list=resJson || [];
    let table=document.getElementById('users-table');
    let tableBody=table.getElementsByTagName('tbody')[0];
    tableBody.innerHTML="";
    list.forEach(item=>{
      var row = tableBody.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);
      var cell6 = row.insertCell(5);
      cell1.innerHTML = item.id;
      cell2.innerHTML = `<img class='profile-pic' src="${item.profilePic}" />`;
      cell3.innerHTML = item.fullName;
      cell4.innerHTML = item.dob;
      cell5.innerHTML = item.gender;
      cell6.innerHTML = item.currentCity+', '+item.currentCountry;
    });
    let count=document.getElementById('list-count');
    count.innerHTML=list?.length || 0;
  }
}

const SearchUser=async(searchText="")=>{
  if(searchText?.length>=2){
    let res= await fetch(`https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1/users?fullName=${searchText}`);
    if(res.ok){
      const resJson = await res.json();
      let list=resJson || [];
      let table=document.getElementById('users-table');
      let tableBody=table.getElementsByTagName('tbody')[0];
      tableBody.innerHTML="";
      list.forEach(item=>{
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        cell1.innerHTML = item.id;
        cell2.innerHTML = `<img class='profile-pic' src="${item.profilePic}" />`;
        cell3.innerHTML = item.fullName;
        cell4.innerHTML = item.dob;
        cell5.innerHTML = item.gender;
        cell6.innerHTML = item.currentCity+', '+item.currentCountry;
      });
      let count=document.getElementById('list-count');
      count.innerHTML=list?.length || 0;
    }
  } else{
    alert('Please enter atleast 2 characters!');
  }
}