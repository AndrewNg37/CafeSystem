export function getEmployees(cafe) {
    var isCafe = cafe ? `?cafe=${cafe}` : '';
    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(

                fetch(process.env.REACT_APP_API_URL + '/api/employeeApi' + isCafe, {
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

export function deleteEmployees(data) {
    return new Promise((resolve) =>
        setTimeout(() =>
            resolve(
                fetch(process.env.REACT_APP_API_URL + '/api/employeeApi', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'access-control-allow-origin': '*'
                    },
                    body: JSON.stringify({id: data.id})
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
