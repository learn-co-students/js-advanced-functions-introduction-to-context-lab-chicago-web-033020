// Your code here
let createEmployeeRecord= function(array) {
  return {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

let createEmployeeRecords = function(employeeData) {
  return employeeData.map(function(employee) {
    return createEmployeeRecord(employee)
  })
}

let createTimeInEvent = function(employee, timeIn) {
  let [date, hour] = timeIn.split(" ")
  employee.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour, 10)
  })
  return employee
}


let createTimeOutEvent = function(employee, timeOut) {
  let [date, hour] = timeOut.split(" ")
  employee.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour, 10)
  })
  return employee
}

let hoursWorkedOnDate = function(employee, wantedDate) {
  let inEvent = employee.timeInEvents.find(date => date.date === wantedDate)
  let outEvent = employee.timeOutEvents.find(date => date.date === wantedDate)
  
  return (outEvent.hour- inEvent.hour)/100
}

let wagesEarnedOnDate = function(employee, wantedDate) {
  return parseInt(hoursWorkedOnDate(employee, wantedDate) * employee.payPerHour)
}

let allWagesFor = function(employee) {
  let eligibleDates = employee.timeInEvents.map(dates => dates.date)

  let payableDates = eligibleDates.reduce(function(total, date) {
    return total + wagesEarnedOnDate(employee, date)
  }, 0)

  return payableDates
} 

let findEmployeeByFirstName = function(array, firstName) {
  return array.find(employee => employee.firstName === firstName)
}

let calculatePayroll = function(array) {
  return array.reduce(function(total, record){
    return total + allWagesFor(record)
  },0)
}