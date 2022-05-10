export function getEmployees(id) {
    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(

                fetch(process.env.REACT_APP_API_URL + '/api/employeeApi/getEmployee', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({id: id})
                })
                    .then(res => res.json())
                    .then((data) => {
                        return data;
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            )
        ), 0)
}

export function getCafe() {
    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(
                fetch(process.env.REACT_APP_API_URL + '/api/cafeApi?sort=title', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'access-control-allow-origin': '*'
                    }
                })
                    .then(res => res.json())
                    .then((data) => {
                        return data;
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            )
        ), 0)
}

export function postEmployee(data) {
    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(
                fetch(process.env.REACT_APP_API_URL + '/api/employeeApi', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then((data) => {
                        return data;
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            )
        ), 0)
}

export function putEmployee(data) {
    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(
                fetch(process.env.REACT_APP_API_URL + '/api/employeeApi', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then((data) => {
                        return data;
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            )
        ), 0)
}

export function updateEmployees(data) {
    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(
                fetch(process.env.REACT_APP_API_URL + '/api/cafeApi/updateEmployees', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify(data)
                })
                    .then(res => res.json())
                    .then((data) => {
                        return data;
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    })
            )
        ), 0)
}