// import i18next from 'i18next';
// import en from './../locales/en'
// import pt from './../locales/pt'

// i18next.init({
//   lng: 'pt',
//     debug: false,
//     load: 'languageOnly',
//     resources: {
//       en: en,
//       pt: pt
//     }
// });

(async () => {
    'use strict'

    const forms = document.forms
    const inputs = document.querySelectorAll('.form-control')
    const address = document.getElementById("userAddress")
    const longitude = document.getElementById("userLocationLong")
    const latitude = document.getElementById("userLocationLat")

    const result = await getUsers()
    await handleGetUsersResponse(result, true)

    Array.from(forms).forEach((form) => {
      form.addEventListener('submit', async (event) => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }

        form.classList.add('was-validated')
      }, false)
    })

    Array.from(inputs).forEach((input) => {

      input.addEventListener('change', () => {
        let message = ''
        if (address.value && (!longitude.value && !latitude.value)) {
          resetFields(message, longitude, 'is-invalid', 'required', false, false)
          resetFields(message, latitude, 'is-invalid', 'required', false, false)
          resetFields(message, address, 'is-invalid', 'required', false, true)
        }

        if (!address.value && (longitude.value || latitude.value)) {
          resetFields(message, address, 'is-invalid', 'required', false, false)
          resetFields(message, longitude, 'is-invalid', 'required', false, true)
          resetFields(message, latitude, 'is-invalid', 'required', false, true)
        }

        if (address.value && (longitude.value || latitude.value)) {
          message = 'You need to choose between address or location'
          resetFields(message, address, 'is-invalid', 'required', true, true)
          resetFields(message, longitude, 'is-invalid', 'required', true, true)
          resetFields(message, latitude, 'is-invalid', 'required', true, true)
        }
      })

    })

})()

var MyNamespace = {}


function resetFields (message, element, className, attrName, classVal, attrVal) {
  element.setCustomValidity(message)
  element.reportValidity()

  toggleAttr(element, attrName, attrVal)
  toggleClass(element, className, classVal)
}

function toggleClass (element, className, turnOn) {
  if (turnOn) {
    if (!element.classList.contains(className)) {
      element.classList.add(className)    
    }
  } else {
    if (element.classList.contains(className)) {
      element.classList.remove(className)
    }
  }
}

function toggleAttr (element, attrName, turnOn) {
  if (turnOn) {
    if (!element.attributes.getNamedItem(attrName)) {
      element.setAttribute(attrName, attrName)
    }
  } else {
    if (element.attributes.getNamedItem(attrName)) {
      element.attributes.removeNamedItem(attrName)
    }
  }
}

function getFormData (form) {
  const inputs = form.elements
  let isAddress = false
  isAddress = inputs.address.value ? true : false
  const longitude = inputs.longitude.value ? inputs.longitude.value : 0
  const latitude = inputs.latitude.value ? inputs.latitude.value : 0
  
  let data = {
    name: inputs.name.value,
    email: inputs.email.value
  }

  if (isAddress) {
    data.address = inputs.address.value
  } else {
    data.location = {
      type: 'Point',
      coordinates: [
        longitude,
        latitude
      ]
    }
  }

  return data
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function processUserForm () {
  const form = document.forms['userForm']
  if (form.checkValidity()) {
    const data = getFormData(form)
    const result = await postUser(data)
    if (result.ok) {
      handleResponse(result)
      form.reset()
      form.classList.remove('was-validated')
    }
  }
}

function appendAlert (id, message, type) {
  const alertPlaceholder = document.getElementById(id)

  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

async function getUsers () {
  const url = '/api/users'
  const myHeaders = new Headers()
  myHeaders.append('Accept', 'application/json')
  myHeaders.append('Content-Type', 'application/json')

  const myConfig = {
    method: 'GET',
    headers: myHeaders,
    mode: 'same-origin'
  }

  const myRequest = new Request(url, myConfig);

  return await fetch(myRequest)
    .then((response) => {     
      appendAlert('alertUsersListing', 'Users listings loaded!', 'success')
      console.log('response', response)
      return response
    })
    .catch((error) => {
      appendAlert('alertUsersListing', error, 'danger')
      console.log('error', error)
      return error
    })
}

async function postUser(data) {
  const url = '/api/users'
  const myHeaders = new Headers()
  myHeaders.append('Accept', 'application/json')
  myHeaders.append('Content-Type', 'application/json')

  const myConfig = {
    method: 'POST',
    headers: myHeaders,
    mode: 'same-origin',
    body: JSON.stringify(data)
  }

  const myRequest = new Request(url, myConfig);

  return await fetch(myRequest)
    .then((response) => {
      appendAlert('alertUserRegistration', 'User created!', 'success')
      console.log('response', response)
      return response
    })
    .catch((error) => {
      appendAlert('alertUserRegistration', error, 'danger')
      console.log('error', error)
      return error
    })
}

function resetTable () {
  const table = document.getElementById('usersTable')
  const tbody = table.querySelector('tbody')
  if (tbody.childElementCount > 0){
    tbody.replaceChildren()
  }
}

function getIndex() {
  let index = 0
  console.log('MyNamespace', MyNamespace)
  const {currentPage} = MyNamespace.pagination
  if (currentPage > 1) {
    index = (currentPage * 10) - 9
  } else {
    index = 1
  }
  MyNamespace.pagination.initialIndex = index
  console.log("index", index)
  return index
}

function buildTable (data) {
  const table = document.getElementById('usersTable')
  const tbody = table.querySelector('tbody')
  let index = 0
  let paginationIndex = getIndex()

  for (index = 0; index < data.length; index++) {
    let location = data[index]?.location
    let coordinates = data[index]?.coordinates

    if (location) {
      coordinates = data[index].location.coordinates ? data[index].location.coordinates : [0,0]
    } else if (coordinates) {
      coordinates = data[index].coordinates ? data[index].coordinates : [0,0]
    }

    const content = document.createElement('tr')
    content.innerHTML = [
      `<tr>`,
      `   <th rowspan='1' scope='row'>${paginationIndex}</th>`,
      `   <td rowspan='1'>${data[index].name} / ${data[index].email}</th>`,
      `   <td rowspan='1' colspan='3'>${data[index].address}</th>`,
      `   <td rowspan='1'>${coordinates[0]} ${coordinates[1]}</th>`,
      `</tr>`
    ].join('')

    if (MyNamespace.pagination.arrSize != paginationIndex) {
      paginationIndex += 1
    }
    tbody.append(content)
  }
}

function getPagination(data, resetNav) {
  let arr = data
  const arrSize = arr.length
  const pageLimit = 10
  let arrPerPages = []
  let position = 0
  let count = parseInt(arrSize / 10)
  let remainder = arrSize - (10 * count)
  let new_arr = []

  if (arr.length > pageLimit) {
    for (let i = 0; i < arr.length; i++) {
      if (position < 10) {
        new_arr.push(arr[i])
      }

      if (remainder > 0 && count == 0) {
        remainder -= 1 
      }

      if (remainder == 0 && count == 0) {
        arrPerPages.push(new_arr)
        break
      }

      position += 1
      if (position == 10) {
        arrPerPages.push(new_arr)
        position = 0
        new_arr = []
        count -= 1
      }
    }

  } else {
    arrPerPages.push(arr)
  }

  const pagination = {
    numPages: arrPerPages.length,
    arrPerPages: arrPerPages,
    currentPage: 1,
    initialIndex: 1,
    arrSize: data.length,
    resetNav
  }
  MyNamespace.pagination = pagination

}

function updateNavigation(currentMark) {
  const pages = document.querySelectorAll('.page-item')
  Array.from(pages).forEach((page) => {
    toggleClass(page, 'active', false)
  })

  toggleClass(pages[currentMark], 'active', true)
}

function buildNavigation() {
  const nav = document.getElementById('usersNav')
  const ul = nav.querySelector('ul')
  let index = 0

  for (index = 1; index < MyNamespace.pagination.numPages; index++) {
    const li = document.createElement('li')
    li.innerHTML = [
      `<li class='page-item'>`,
      `   <a onclick="getCurrentPage(${index+1})" class='page-link' href='#'>${index+1}</a>`,
      `</li>`
    ].join('')

    ul.append(li)
  }

  const next = document.createElement('li')
  next.innerHTML = [
    `<li class='page-item'>`,
    `   <a onclick="getCurrentPage('next')" class='page-link' href='#'>Next</a>`,
    `</li>`
  ].join('')
  ul.append(next)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCurrentPage(currentMark, recursive) {
  const pagination = MyNamespace.pagination
  const pages = document.getElementsByClassName('page-item')
  let arr = []
  const prev = pages[0]
  const next = pages[pages.length-1]

  resetTable()
  if ((currentMark == MyNamespace.pagination.currentPage) && !recursive) return false

  if (currentMark == 1) {
    toggleClass(prev, 'disabled', true)
    toggleClass(next, 'disabled', false)
    pagination.currentPage = 1
    arr = pagination.arrPerPages[pagination.currentPage-1]
    buildTable(arr)
    updateNavigation(pagination.currentPage)
  } else if (currentMark == pagination.arrPerPages.length) {
    toggleClass(prev, 'disabled', false)
    toggleClass(next, 'disabled', true)
    pagination.currentPage = pagination.arrPerPages.length
    arr = pagination.arrPerPages[pagination.arrPerPages.length-1]
    buildTable(arr)
    updateNavigation(pagination.currentPage)
  } else if (currentMark == 'prev') {
    MyNamespace.pagination.currentPage -= 1
    getCurrentPage(MyNamespace.pagination.currentPage, true)
  } else if (currentMark == 'next') {
    MyNamespace.pagination.currentPage += 1 
    getCurrentPage(MyNamespace.pagination.currentPage, true)
  } else {
    pagination.currentPage = currentMark
    arr = pagination.arrPerPages[currentMark-1]
    toggleClass(prev, 'disabled', false)
    toggleClass(next, 'disabled', false)
    buildTable(arr)
    updateNavigation(pagination.currentPage)
  }
}

async function handleGetUsersResponse (response, resetNav) {
  const data = await response.json()
  getPagination(data.rows, resetNav)
  if (MyNamespace.pagination.resetNav) {
    console.log("MyNamespace", MyNamespace)
    buildNavigation()
  } else {
    resetTable()
    updateNavigation(1)
  }
  const arr = MyNamespace.pagination.arrPerPages[0]
  buildTable(arr)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function handleResponse (response) {
  const result = await getUsers()
  console.log("result", result)
  await handleGetUsersResponse(result, false)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleEdit (event) {
  console.log("handleEdit")
  event.preventDefault()
  event.stopPropagation()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function handleDelete (event) {
  console.log("handleDelete")
  event.preventDefault()
  event.stopPropagation()
}