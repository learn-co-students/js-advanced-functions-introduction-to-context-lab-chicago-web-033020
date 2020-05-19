function createEmployeeRecord(array){
  const employee = {
  firstName: array[0],
  familyName: array[1],
  title: array[2],
  payPerHour: array[3],
  timeInEvents: [],
  timeOutEvents: []
  }
  return employee
}

function createEmployeeRecords(array){
  return array.map(arr => createEmployeeRecord(arr))
}

function createTimeInEvent(employee, date){
  const dat = date.split(" ")
  const time = { type: "TimeIn", hour: parseInt(dat[1]), date: dat[0] }
  employee.timeInEvents.push(time)
  return employee
}

function createTimeOutEvent(employee, date){
  const dat = date.split(" ")
  const time = { type: "TimeOut", hour: parseInt(dat[1]), date: dat[0] }
  employee.timeOutEvents.push(time)
  return employee
}

function hoursWorkedOnDate(employee, date){
  const hourIn = employee.timeInEvents.find(day => day.date === date)
  const hourOut = employee.timeOutEvents.find(day => day.date === date)
  return (hourOut.hour - hourIn.hour) / 100
}

function wagesEarnedOnDate(employee, date){
  const hours = hoursWorkedOnDate(employee, date)
  return hours * employee.payPerHour
}

function allWagesFor(employee){
  const dates = employee.timeInEvents.map(date => date.date)
  const wages = dates.map(date => wagesEarnedOnDate(employee, date))
  return wages.reduce((total, current) => total + current)
}

function calculatePayroll(employees){
  return employees.map(employee => allWagesFor(employee)).reduce((total, current) => total + current)
}

function findEmployeeByFirstName(array, first){
  return array.find(employee => employee.firstName === first)
}
