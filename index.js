// Your code here
let createEmployeeRecord = function(rec){
  return {
    firstName: rec[0],
    familyName: rec[1],
    title: rec[2],
    payPerHour: rec[3],
    timeInEvents: [],
    timeOutEvents: []
  }

}
let createEmployeeRecords = function(employeeRecs){
  return employeeRecs.map(function(rec){
    return createEmployeeRecord(rec)
  })
}

let createTimeInEvent = function(employee, dateTime){
  let date = dateTime.split(" ")[0]
  let hour = dateTime.split(" ")[1]

  employee.timeInEvents.push({
    type: "TimeIn",
    date: date,
    hour: parseInt(hour)
  })
  return employee
}

let createTimeOutEvent = function(employee, dateTime){
  let date = dateTime.split(" ")[0]
  let hour = dateTime.split(" ")[1]

  employee.timeOutEvents.push({
    type: "TimeOut",
    date: date,
    hour: parseInt(hour)
  })
  return employee
}

let hoursWorkedOnDate = function(employee, findDate){
  let inDate = employee.timeInEvents.find(function(e){
    return e.date === findDate
  })
  let outDate = employee.timeOutEvents.find(function(e){
    return e.date === findDate
  })

  return (outDate.hour - inDate.hour) / 100
}

let wagesEarnedOnDate = function(employee, findDate){
  let wage = hoursWorkedOnDate(employee, findDate) * employee.payPerHour

  return wage
}

let allWagesFor = function(employee){
  let dateWorked = employee.timeInEvents.map(function(e){
    return e.date
  })
  let pay = dateWorked.reduce(function(tot, dt){
    return tot + wagesEarnedOnDate(employee, dt)
  },0)
  return pay
}

let findEmployeeByFirstName = function(array, firstName){
  return array.find(function(em){
    return em.firstName === firstName
  })
}

let calculatePayroll = function(employees){
  return employees.reduce(function(tot, employee){
    return tot + allWagesFor(employee)
  },0)
}